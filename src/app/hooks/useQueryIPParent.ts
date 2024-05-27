import GraphQLClient from "@/graphQL/client";
import { GraphDetial } from "@/story/types";
import { gql, useQuery } from "@apollo/client";
import { Address } from "viem";

interface QueryIPParentData {
  parents: GraphDetial[]
}

export default function useQueryIPParent(ipId: Address) {
  const query = gql`
    query ipWithLineage($id: String!){
        parents: ips(where: {
            remixs_: {
              childIpId: $id
            }
          }) {
            id,
            ipId,
            tokenContract,
            tokenId,
            supply,
            floorPrice,
            holder,
            children: remixs {
              ipId: childIpId
            }
          }
    }
    `
  const { data, loading } = useQuery<QueryIPParentData>(query, {
    client: GraphQLClient,
    variables: {
      id: ipId
    }
  });

  return {
    data: data?.parents,
    loading
  }
}