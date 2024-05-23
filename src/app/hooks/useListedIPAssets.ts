import GraphQLClient from '@/graphQL/client';
import { getResource } from '@/story/storyApi';
import { Asset, GraphDetial, RESOURCE_TYPE } from '@/story/types';
import { useQuery, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import { getAddress } from 'viem'
const GET_POSTS = gql`
    query GetPosts {
        ips(first: 1000) {
            id,
            ipId,
            price,
            holder,
            remixs {
                childIpId 
            }
        }
    }
`;
export default function useListedIPAssets() {
    const [ipAssets, setIpAssets] = useState<Asset[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<unknown>()

    const { data, loading: graphQLLoaing } = useQuery<{ ips: GraphDetial[] }>(GET_POSTS, { client: GraphQLClient });
    useEffect(() => {
        fetchIpAssets()
    }, [data])
    const fetchIpAssets = async () => {
        setLoading(true);
        try {
            const remixedIpIds = data?.ips
                .reduce((prev: any, next: any) => prev.concat(...next.remixs), [])
                .map((r: any) => r.childIpId)
            const queryIps = data?.ips.filter((ip: any) => !remixedIpIds.includes(ip.ipId))
            const promises = queryIps ? queryIps.map(async (ip: any) => {
                const data = await getResource(
                    RESOURCE_TYPE.ASSET,
                    getAddress(ip.ipId)
                )
                return data.data;
            }) : []

            const ipAssets = await Promise.allSettled(promises).then((res) => {
                const result = res.map(({ value }: any) => {
                    return value
                })
                return result
            })

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
        ipAssets,
        ips: data?.ips
    }
}