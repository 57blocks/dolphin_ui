export const getRoyaltyPolicyAbi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "licenseTermsId",
                "type": "uint256"
            }
        ],
        "name": "getRoyaltyPolicy",
        "outputs": [
            {
                "internalType": "address",
                "name": "royaltyPolicy",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "royaltyData",
                "type": "bytes"
            },
            {
                "internalType": "uint256",
                "name": "mintingFee",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "currency",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
] as const

export const approveAbi = [
    {
        "inputs": [{
            "internalType": "address",
            "name": "spender",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }],
        "name": "approve",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const

export const allowanceAbi = [
    {
        "inputs": [{
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "spender",
            "type": "address"
        }],
        "name": "allowance",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }
] as const