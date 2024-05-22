import { useState } from "react"
import { Abi, Address } from "viem"
import { readContract } from '@wagmi/core'
import { config } from "@/components/WalletConnector/wagmi.config"

export const useStoryReadContract = (
    abi: Abi,
    functionName: string,
) => {

    const [result, setResult] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>()
    const contract = {
        address: process.env.NEXT_PUBLIC_story_CONTRACT as Address,
        abi,
        functionName,
    }

    const read = async (args: any) => {
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