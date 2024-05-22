import { Abi, Address } from "viem"
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi"

export interface DolphinWriteContractProps {
    abi: Abi,
    functionName: string,
    args: unknown[],
    value?: bigint,
    address?: Address
}

export const useDolphinWriteContract = ({
    abi,
    functionName,
    args,
    value,
    address
}: DolphinWriteContractProps) => {
    const {
        data: hash,
        error,
        isPending,
        writeContract
    } = useWriteContract()
    function writeDolphinContract() {
        writeContract({
            address: address || process.env.NEXT_PUBLIC_dolphin_CONTRACT as Address,
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