import { Address } from 'viem'
import {
    NFTMetadata,
    CollectionMetadata,
    NFTWalletResponse,
} from './types'

export const simplehashNetworks = {
    sepolia: 'ethereum-sepolia',
}

const createRequestOptions = (): RequestInit => ({
    method: 'GET',
    headers: {
        accept: 'application/json',
        'X-API-KEY':
            process.env.NEXT_PUBLIC_SIMPLE_HASH_API_KEY ||
            process.env.SIMPLE_HASH_API_KEY ||
            '',
    },
})

export const getNFTByTokenId = async (
    contractAddress: Address,
    tokenId: string
): Promise<NFTMetadata> => {
    const options = createRequestOptions()
    const url = `https://api.simplehash.com/api/v0/nfts/${simplehashNetworks.sepolia}/${contractAddress}/${tokenId}`
    const response = await fetch(url, options)
    const data = await response.json()
    return data
}

export const getCollectionByAddress = async (
    contractAddress: Address
): Promise<CollectionMetadata> => {
    const options = createRequestOptions()
    const url = `https://api.simplehash.com/api/v0/nfts/collections/${simplehashNetworks.sepolia}/${contractAddress}`
    const response = await fetch(url, options)
    const data = await response.json()
    return data.collections[0]
}

export const getNFTByWallet = async (
    walletAddress: Address | undefined
): Promise<NFTWalletResponse | null> => {
    if (!walletAddress) return null

    const options = createRequestOptions()
    const url = `https://api.simplehash.com/api/v0/nfts/owners?chains=${simplehashNetworks.sepolia}&wallet_addresses=${walletAddress}&limit=1000`
    const response = await fetch(url, options)
    const data = await response.json()
    return data
}
