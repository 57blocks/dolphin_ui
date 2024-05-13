import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount } from 'wagmi'
import { config } from './wagmi.config'
import { WalletMenus } from './walletMenus'
import { Account } from './account'
import './style.css'

const queryClient = new QueryClient()

function ConnectWallet() {
    const { isConnected } = useAccount()
    if (isConnected) return <Account />
    return <WalletMenus />
}

export default function WalletConnector() {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ConnectWallet />
            </QueryClientProvider>
        </WagmiProvider>
    )
}