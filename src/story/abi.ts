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