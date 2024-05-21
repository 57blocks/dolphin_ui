import { function_names } from "./constants"

export const buyAbi = [
    {
        inputs: [{
            internalType: "address",
            name: "ipId",
            type: "address"
        }, {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
        }],
        name: function_names.buy,
        outputs: [],
        stateMutability: "payable",
        type: "function"
    }
] as const

export const sellAbi = [
    {
        inputs: [{
            internalType: "address",
            name: "ipId",
            type: "address"
        }, {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
        }],
        name: function_names.sell,
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
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
    { "inputs": [{ "internalType": "address", "name": "ipId", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "getBuyPriceAfterFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }
] as const

export const getSellPriceAfterFeeAbi = [
    { "inputs": [{ "internalType": "address", "name": "ipId", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "getSellPriceAfterFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }
] as const