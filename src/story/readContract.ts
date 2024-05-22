import { Abi, Address } from "viem"
import { useDolphinReadContract } from "@/dolphin/readContract"

export const useStoryReadContract = (
    abi: Abi,
    functionName: string,
) => useDolphinReadContract(
    abi,
    functionName,
    process.env.NEXT_PUBLIC_story_CONTRACT as Address
)