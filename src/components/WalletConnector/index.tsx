'use client'

import { useAccount } from 'wagmi'
import { WalletMenus } from './walletMenus'
import { Account } from './account'
import './style.css'

export default function WalletConnector() {
    const { isConnected } = useAccount()
    if (isConnected) return <Account />
    return <WalletMenus />
}