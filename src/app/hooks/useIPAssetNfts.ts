import { listResource } from '@/story/storyApi'
import { getNFTByTokenId } from '@/simplehash'
import { NFTMetadata } from '@/simplehash/types'
import { Asset, RESOURCE_TYPE } from '@/story/types'
import { useQuery } from '@tanstack/react-query'

export const PAGE_SIZE = 20

export interface NftWithAsset extends NFTMetadata {
    ipAsset: Asset
}

export async function fetchNftByIpAssets(ipAssets: Asset[]) {
    const promises = ipAssets.map(async (ipAsset: Asset) => {
        const simpleHashData = await getNFTByTokenId(
            ipAsset.nftMetadata.tokenContract,
            ipAsset.nftMetadata.tokenId
        )
        return simpleHashData
    })

    const nfts = await Promise.allSettled(promises).then((res) => {
        const result = res.map(({ value }: any) => {
            return value
        })
        return result
    })

    const nftWithAsset: NftWithAsset[] = nfts.map((nft) => {
        const ipAsset = ipAssets.find(
            (asset: Asset) => asset.nftMetadata.tokenId === nft.token_id
        )
        if (ipAsset) {
            return {
                ...nft,
                ipAsset,
            }
        }
        return nft
    })
    return { nfts: nftWithAsset }
}

export default function useIPAssetNfts(
    listReq = {
        pagination: {
            limit: PAGE_SIZE,
            offset: 0,
        },
    }
) {
    const fetchIpAssets = async (listReq: any) => {
        const { data: ipAssets } = await listResource(
            RESOURCE_TYPE.ASSET,
            listReq
        )
        return fetchNftByIpAssets(ipAssets);
    }
    const { isLoading, data } = useQuery({
        queryKey: ['nfts', listReq],
        queryFn: () => fetchIpAssets(listReq),
    })
    const nfts = data?.nfts
    return {
        isLoading,
        nfts,
    }
}
