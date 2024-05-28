import { getNFTByTokenId } from "@/simplehash"
import { NFTMetadata } from "@/simplehash/types"
import { useEffect, useState } from "react"
import { Address } from "viem"

export type GetNFTAsyncFunction = (
    contractAddress: Address,
    tokenId: string
) => Promise<NFTMetadata>

export type DecodeFunction<T, D> = (
    item: T,
    getNFTAsyncFunction: GetNFTAsyncFunction
) => Promise<D>

export default function useFetchNftsByTokenIdAndContract<T, D>(
    list: T[],
    decodeFunction: DecodeFunction<T, D>
) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<unknown>()
    const [data, setData] = useState<D[]>([])
    const fetchIpNft = async () => {
        setLoading(true);
        try {
            const promises = list.map(async (item) => {
                const data = await decodeFunction(item, getNFTByTokenId)
                return data;
            })

            const promiseData = await Promise.allSettled(promises as any).then((res) => {
                const result = res.map(({ value }: any) => {
                    return value
                })
                return result
            })
            setData(promiseData)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (list && list.length) {
            fetchIpNft()
        }
    }, [list])

    return {
        data,
        loading,
        error
    }
}