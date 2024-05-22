import { useState } from "react"
import { Abi, Address } from "viem"
import { readContract } from '@wagmi/core'
import { config } from "@/components/WalletConnector/wagmi.config"

export const useDolphinReadContract = (
    abi: Abi,
    functionName: string,
    address?: Address
) => {
    const [result, setResult] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>()
    const contract = {
        address: address || process.env.NEXT_PUBLIC_dolphin_CONTRACT as Address,
        abi,
        functionName,
    }

    const read = async (args: unknown[]) => {
        setIsLoading(true)
        try {
            const result = await readContract(config, {
                ...contract,
                args
            });
            setResult(result);
        } catch (err) {
            setError(err)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        result,
        error,
        isLoading,
        read
    }
}