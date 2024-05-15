import { getResource } from '@/story/storyApi'
import { getNFTByTokenId } from '@/simplehash'
import { Asset, RESOURCE_TYPE } from '@/story/types'
import { useQuery } from '@tanstack/react-query'

export default function useAssetWithNft(ipid: string) {
    const fetchIpAssets = async (ipid: string) => {
        const { data }: { data: Asset } = await getResource(RESOURCE_TYPE.ASSET, ipid);
        if (data) {
            const nft = await getNFTByTokenId(data.nftMetadata.tokenContract, data.nftMetadata.tokenId);

            return {
                ...nft,
                ipAsset: data
            };
        }
        return null;
    }
    const { isLoading, data } = useQuery({
        queryKey: ['assetWithNft', ipid],
        queryFn: () => fetchIpAssets(ipid),
    })
    return {
        isLoading, data
    }
}
