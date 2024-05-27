import GraphQLClient from '@/graphQL/client';
import { getNFTByTokenId } from '@/simplehash';
import { DLExtendedNFTMetadata } from '@/simplehash/types';
import { Asset, GraphDetial } from '@/story/types';
import { useQuery, gql } from '@apollo/client';
import { useEffect, useState } from 'react';

const GET_POSTS = gql`
    {
        ips(first: 1000) {
                id,
                ipId,
                price,
                holder,
                tokenContract,
                tokenId,
                floorPrice,
                supply,
                remixs {
                childIpId
            }
        }
    }
`;
export default function useIPSWithNft() {
    const [ipsWithNft, setIpAssets] = useState<DLExtendedNFTMetadata[]>([])
    const [rootIps, setrootIps] = useState<GraphDetial[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<unknown>()

    const { data, loading: graphQLLoaing } = useQuery<{ ips: GraphDetial[] }>(GET_POSTS, { client: GraphQLClient });
    useEffect(() => {
        if (data && data.ips.length) {
            fetchIpNft()
        }
    }, [data])
    const fetchIpNft = async () => {
        setLoading(true);
        try {
            const promises = data?.ips.map(async (ip: GraphDetial) => {
                const data = await getNFTByTokenId(
                    ip.tokenContract,
                    ip.tokenId,
                )
                return {
                    ...ip,
                    ...data,
                };
            })

            const ipAssets = await Promise.allSettled(promises as any).then((res) => {
                const result = res.map(({ value }: any) => {
                    return value
                })
                return result
            })
            const remixedIpIds = data?.ips
                .reduce((prev: any, next: any) => prev.concat(...next.remixs), [])
                .map((r: any) => r.childIpId)
            const rootIpss = data?.ips.filter((ip: any) => !remixedIpIds.includes(ip.ipId)) as GraphDetial[]
            setrootIps(rootIpss);
            setIpAssets(ipAssets);
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return {
        isLoading: graphQLLoaing || loading,
        error,
        ipsWithNft,
        ips: data?.ips,
        rootIps
    }
}