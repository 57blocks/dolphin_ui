import { NftWithAsset } from "@/app/hooks/useIPAssetNfts";
import { buyAbi, getBuyPriceAfterFeeAbi } from "@/dolphin/abis";
import { function_names } from "@/dolphin/constants";
import { useDolphinReadContract } from "@/dolphin/readContract";
import { useDolphinWriteContract } from "@/dolphin/writeContract";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Button, Dialog, TextField } from "@radix-ui/themes";
import { FocusEventHandler, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import clx from 'classnames'
import Link from "next/link";

interface IProps {
    open: boolean
    asset?: NftWithAsset | null
    onClose?: () => void
}

export default function BuyModal({
    open,
    asset,
    onClose
}: IProps) {
    const { address } = useAccount()
    const { data: balance } = useBalance({
        address
    })

    const [amount, setAmount] = useState(0)

    const {
        result,
        isLoading,
        read
    } = useDolphinReadContract(
        getBuyPriceAfterFeeAbi,
        function_names.getBuyPriceAfterFee
    )
    const {
        hash,
        error,
        isPending,
        isConfirming,
        isConfirmed,
        writeDolphinContract
    } = useDolphinWriteContract(
        buyAbi,
        function_names.buy,
        [asset?.ipAsset.id, BigInt(Number(amount) * 1e18)],
        result
    )

    const handleGetPrice: FocusEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        if (value) {
            read([asset?.ipAsset.id, BigInt(Number(value) * 1e18)])
            setAmount(Number(value));
        }
    }

    return <Dialog.Root open={open}>
        <Dialog.Content maxWidth="450px">
            <Dialog.Title className="relative">
                Buy shares
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
                    <p>Set Custom Amount</p>
                    <TextField.Root type="number"
                        onBlur={handleGetPrice}
                    >
                        <TextField.Slot side="right">
                            Share(s)
                        </TextField.Slot>
                    </TextField.Root>
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
                    >{isConfirming || isPending ? 'Waiting for Transaction...' : 'Confirm'}</Button>
                    <p>Share price will go up when more people buy. And you can sell it anytime.</p>
                </div>
            </Dialog.Description>
        </Dialog.Content>
    </Dialog.Root>
}