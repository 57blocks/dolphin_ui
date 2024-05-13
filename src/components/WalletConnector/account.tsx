'use client'

import formatAddress from '@/utils/formatAddress'
import { useAccount, useDisconnect } from 'wagmi'
import { AlertDialog, Button, DropdownMenu, Flex } from '@radix-ui/themes'
import { useState } from 'react'
import { sepolia } from 'viem/chains'

export function Account() {
    const [open, setOpen] = useState(false);
    const { address } = useAccount()
    const { disconnect } = useDisconnect()

    return (<>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button
                    className='nav-btn'
                >
                    {sepolia.name}&nbsp;&nbsp;
                    {formatAddress(address) || 'Not Connected'}
                    <DropdownMenu.TriggerIcon />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Item
                    className='nav-menu_btn'
                    onClick={() => {
                        setOpen(true)
                    }}
                >Disconnect</DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>

        <AlertDialog.Root open={open}>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Confirm</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    Are you sure to disconnect?
                </AlertDialog.Description>
                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button
                            variant="soft"
                            color="gray"
                            className='cursor-pointer'
                            onClick={() => {
                                setOpen(false)
                            }}
                        >
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button
                            variant="solid"
                            color="red"
                            className='cursor-pointer'
                            onClick={() => disconnect()}
                        >
                            Confirm
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    </>
    )
}