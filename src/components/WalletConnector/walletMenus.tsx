'use client';

import { useChainId, useConnect } from 'wagmi'
import { Button, DropdownMenu } from '@radix-ui/themes';

export function WalletMenus() {
    const { connectors, connect } = useConnect()
    const chainId = useChainId()
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button
                    className='nav-btn'
                >
                    Connect Wallet
                    <DropdownMenu.TriggerIcon />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                {
                    connectors.map((connector) =>
                        <DropdownMenu.Item
                            key={connector.uid}
                            className='nav-menu_btn'
                            onClick={() => connect({
                                connector,
                                chainId
                            })}
                        >{connector.name}</DropdownMenu.Item>)
                }
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}