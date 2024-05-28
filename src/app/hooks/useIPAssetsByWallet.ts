import { Address } from "viem";
import { useQuery, gql } from '@apollo/client';
import GraphQLClient from '@/graphQL/client';
import { GraphDetial } from "@/story/types";
import useFetchNftsByTokenIdAndContract, { DecodeFunction, GetNFTAsyncFunction } from "./useFetchNftsByTokenIdAndContract";
import { DLExtendedNFTMetadata, NFTMetadata } from "@/simplehash/types";

interface userIPs {
    id: string
    user: Address,
    ip: GraphDetial
}

interface DataType {
    userIPs: userIPs[]
}

interface NFTWithIPA extends NFTMetadata {
    ipa: userIPs
}

export default function useIPAssetsByWallet(walletAddress?: Address) {
    const query = gql`
        query ips($user: String!){
            userIPs(where: {
                user: $user
              }) {
                id,
                user
                ip {
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
        }
    `
    const { data, loading } = useQuery<DataType>(query, {
        client: GraphQLClient,
        variables: {
            user: walletAddress
        }
    });

    const decodeFunction = async (item: userIPs, fetchNftFuncion: GetNFTAsyncFunction) => {
        const data = await fetchNftFuncion(
            item.ip.tokenContract,
            item.ip.tokenId
        )
        return {
            ...data,
            ...item.ip
        } as DLExtendedNFTMetadata;
    }


    const {
        data: dd,
        loading: nftLoading
    } = useFetchNftsByTokenIdAndContract<userIPs, DLExtendedNFTMetadata>(
        data!?.userIPs,
        decodeFunction
    )


    return {
        data: dd,
        loading: loading || nftLoading
    }
}