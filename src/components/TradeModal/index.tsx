import { NftWithAsset } from "@/app/hooks/useIPAssetNfts";
import { buyAbi, getBuyPriceAfterFeeAbi, getSellPriceAfterFeeAbi, sellAbi } from "@/dolphin/abis";
import { function_names } from "@/dolphin/constants";
import { useDolphinReadContract } from "@/dolphin/readContract";
import { useDolphinWriteContract } from "@/dolphin/writeContract";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Button, Dialog } from "@radix-ui/themes";
import { useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import clx from 'classnames'
import Link from "next/link";

interface IProps {
    open: boolean,
    method?: 'buy' | 'sell'
    asset?: NftWithAsset | null
    onClose?: () => void
}

export default function TradeModal({
    open,
    method = 'buy',
    asset,
    onClose
}: IProps) {
    const { address } = useAccount()
    const { data: balance } = useBalance({
        address
    })

    const tradeMethod = {
        buy: {
            modalTitle: 'Buy shares',
            abi: buyAbi,
            functionName: function_names.buy,
            getPriceAfterFeeFunctionAbi: getBuyPriceAfterFeeAbi,
            getPriceAfterFeeFunctionName: function_names.getBuyPriceAfterFee
        },
        sell: {
            modalTitle: 'Sell shares',
            abi: sellAbi,
            functionName: function_names.sell,
            getPriceAfterFeeFunctionAbi: getSellPriceAfterFeeAbi,
            getPriceAfterFeeFunctionName: function_names.getSellPriceAfterFee
        }
    }
    const trade = tradeMethod[method];
    const {
        result,
        isLoading,
        read
    } = useDolphinReadContract(
        trade.getPriceAfterFeeFunctionAbi,
        trade.getPriceAfterFeeFunctionName
    )
    const {
        hash,
        error,
        isPending,
        isConfirming,
        isConfirmed,
        writeDolphinContract
    } = useDolphinWriteContract(
        trade.abi,
        trade.functionName,
        [asset?.ipAsset.id, BigInt(1 * 1e18)],
        result
    )

    useEffect(() => {
        read([asset?.ipAsset.id, BigInt(1 * 1e18)])
    }, [])

    return <Dialog.Root open={open}>
        <Dialog.Content maxWidth="450px">
            <Dialog.Title className="relative">
                {trade.modalTitle}
                <CrossCircledIcon
                    onClick={() => {
                        onClose && onClose()
                    }}
                    className="absolute w-5 h-5 cursor-pointer right-0 top-0"
                />
            </Dialog.Title>
            <Dialog.Description size="2" mb="4">
                <div className="border-t pt-4 space-y-2">
                    <p>IP ID: {asset?.ipAsset.id}</p>
                    <p><strong className="uppercase">{method}</strong> 1 share</p>
                    <div className="text-right space-y-2">
                        {/* <p>Insufficient Balance</p> */}
                        <p>Balance: {balance?.formatted.slice(0, 6)} ETH</p>
                        <p>Total: {isLoading ? 'Culculating' : result ? (Number(result) / 1e18).toString() : 0} ETH</p>
                    </div>
                    {
                        hash && <p>Transaction Hash: <Link className=" text-indigo-500" target="_blank" href={`https://sepolia.etherscan.io/tx/${hash}`}>{hash}</Link></p>
                    }
                    {
                        isConfirmed && <h4 className="text-green-500 font-bold">Transaction Succeed</h4>
                    }
                    {
                        error && (<div>
                            <h4 className="text-red-500 font-bold">Transaction Failed</h4>
                            <pre className="w-full overflow-auto border p-2 rounded-lg">{error.message}</pre>
                        </div>)
                    }
                    <div className="border-b border-dashed"></div>
                    <Button
                        className={
                            clx("w-full cursor-pointer", {
                                'animate-pulse': isConfirming || isPending || isLoading
                            })
                        }
                        onClick={writeDolphinContract}
                        disabled={!result || isLoading || isConfirming || isPending}
                    >{isConfirming || isPending
                        ? 'Waiting for Transaction...'
                        : <strong className="uppercase">{method}</strong>}
                    </Button>
                    <p>Share price will go up when more people buy. And you can sell it anytime.</p>
                </div>
            </Dialog.Description>
        </Dialog.Content>
    </Dialog.Root>
}