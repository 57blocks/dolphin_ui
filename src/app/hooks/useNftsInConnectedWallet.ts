import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'
import { getNFTByWallet } from '@/simplehash'
import { Address } from 'viem'
import { listResource } from '@/story/storyApi'
import { RESOURCE_TYPE } from '@/story/types'
import { SPExtendedNFTMetadata } from '@/simplehash/types'

export function useNftsInConnectedWallet() {
    const { address } = useAccount()
    const isRegisteredNfts = async (tokenId: string, tokenContract: string) => {
        const { data: asset } = await listResource(RESOURCE_TYPE.ASSET, {
            pagination: {
                limit: 0,
                offset: 0,
            },
            where: {
                tokenId,
                tokenContract,
            },
        })
        return !!asset.length
    }
    const { isLoading, data, isError } = useQuery({
        queryKey: ['nfts-in-connected-wallet', address],
        queryFn: () => getNftsByWallet(address as Address),
    })
    const getNftsByWallet = async (address: Address) => {
        const walletNfts = await getNFTByWallet(address as Address)
        if (walletNfts) {
            const promises = walletNfts.nfts.map(async (nft) => {
                const isRegistered = await isRegisteredNfts(
                    nft.token_id,
                    nft.contract_address
                )
                return {
                    ...nft,
                    isRegistered,
                }
            })
            const results: SPExtendedNFTMetadata[] = await Promise.allSettled(
                promises
            ).then((values) =>
                values.map(({ value }: any) => ({
                    ...value,
                }))
            )
            return results.filter(r => r.isRegistered);
        }
        return null
    }
    return {
        isLoading,
        isError,
        nfts: data,
    }
}
