import { Abi, Address } from "viem"
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi"

export const useDolphinWriteContract = (
    abi: Abi,
    functionName: string,
    args: any[]
) => {
    const {
        data: hash,
        error,
        isPending,
        writeContract
    } = useWriteContract()
    function writeDolphinContract() {
        writeContract({
            address: process.env.NEXT_PUBLIC_dolphin_CONTRACT as Address,
            abi,
            functionName,
            args,
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