import { Abi, Address } from "viem"
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi"

export interface DolphinWriteContractProps {
    abi: Abi,
    functionName: string,
    args: any[],
    value?: bigint
}

export const useDolphinWriteContract = ({
    abi,
    functionName,
    args,
    value
}: DolphinWriteContractProps) => {
    const {
        data: hash,
        error,
        isPending,
        writeContract
    } = useWriteContract()
    function writeDolphinContract() {
        console.log(args)
        writeContract({
            address: process.env.NEXT_PUBLIC_dolphin_CONTRACT as Address,
            abi,
            functionName,
            args,
            value,
        })
    }
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })
    return {
        hash,
        error,
        isPending,
        isConfirming,
        isConfirmed,
        writeDolphinContract
    }
}