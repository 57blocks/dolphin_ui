import { NftWithAsset } from "@/app/hooks/useIPAssetNfts";
import { buyAbi, getBuyPriceAfterFeeAbi, getSellPriceAfterFeeAbi, sellAbi } from "@/dolphin/abis";
import { function_names } from "@/dolphin/constants";
import { useDolphinReadContract } from "@/dolphin/readContract";
import { DolphinWriteContractProps, useDolphinWriteContract } from "@/dolphin/writeContract";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Button, Dialog } from "@radix-ui/themes";
import { useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import clx from 'classnames'
import Link from "next/link";
import { DLExtendedNFTMetadata } from "@/simplehash/types";
import { getAddress } from "viem";

interface IProps {
    open: boolean,
    method?: 'buy' | 'sell'
    asset?: DLExtendedNFTMetadata | null
    onClose?: () => void
}

export default function TradeModal({
    open,
    method = 'buy',
    asset,
    onClose
}: IProps) {
    if (!asset) return null;
    const { address } = useAccount()
    const { data: balance } = useBalance({
        address
    })

    const tradeMethod = {
        buy: {
            modalTitle: 'Buy FIN',
            abi: buyAbi,
            functionName: function_names.buy,
            getPriceAfterFeeFunctionAbi: getBuyPriceAfterFeeAbi,
            getPriceAfterFeeFunctionName: function_names.getBuyPriceAfterFee
        },
        sell: {
            modalTitle: 'Sell FIN',
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

    let writeContractArgs: DolphinWriteContractProps = {
        abi: trade.abi,
        functionName: trade.functionName,
        args: [getAddress(asset?.ipId)],
    }

    if (method === 'buy') {
        writeContractArgs.value = result
    }

    const {
        hash,
        error,
        isPending,
        isConfirming,
        isConfirmed,
        writeDolphinContract
    } = useDolphinWriteContract(writeContractArgs)

    useEffect(() => {
        read([getAddress(asset?.ipId)])
    }, [])

    return <Dialog.Root open={open} key={method}>
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
                    <p>IP ID: {getAddress(asset?.ipId)}</p>
                    <p><strong className="uppercase">{method}</strong> 1 FIN</p>
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
                    <p>The price will go up when more people buy. And you can sell it anytime.</p>
                </div>
            </Dialog.Description>
        </Dialog.Content>
    </Dialog.Root>
}