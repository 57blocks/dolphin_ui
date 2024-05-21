import { function_names } from "./constants"

export const buyAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "ipId",
                "type": "address"
            }
        ],
        "name": "buy",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
] as const

export const sellAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "ipId",
                "type": "address"
            }
        ],
        "name": "sell",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const

export const listAbi = [
    {
        inputs: [{
            internalType: "address",
            name: "ipId",
            type: "address"
        }],
        name: function_names.list,
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }
] as const


export const getBuyPriceAfterFeeAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "ipId",
                "type": "address"
            }
        ],
        "name": "getBuyPriceAfterFee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
] as const

export const getSellPriceAfterFeeAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "ipId",
                "type": "address"
            }
        ],
        "name": "getSellPriceAfterFee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
] as const

export const remixAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "parentIpId",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "licenseTemplate",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "licenseTermsId",
                "type": "uint256"
            }
        ],
        "name": "remix",
        "outputs": [{
            "internalType": "address",
            "name": "childIpId", "type": "address"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const