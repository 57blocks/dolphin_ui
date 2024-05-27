import { Address } from "viem";
import { useQuery, gql } from '@apollo/client';
import GraphQLClient from '@/graphQL/client';
import { GraphDetial } from "@/story/types";

export default function useQueryIPbyIpId(ipId: Address) {
    const query = gql`
        query ip($id: String!){
            ip(id: $id) {
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
    `

    const { data, loading } = useQuery<{ ip: GraphDetial }>(query, {
        client: GraphQLClient,
        variables: {
            id: ipId
        }
    });

    return {
        data: data?.ip,
        loading
    }
}