import { CrossCircledIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, Dialog, TextField } from "@radix-ui/themes";

interface IProps {
    open: boolean
    onClose?: () => void
}

export default function SellModal({
    open,
    onClose
}: IProps) {
    return <Dialog.Root open={open}>
        <Dialog.Content maxWidth="450px">
            <Dialog.Title className="relative">
                Sell shares(#14789)
                <CrossCircledIcon
                    onClick={() => {
                        onClose && onClose()
                    }}
                    className="absolute w-5 h-5 cursor-pointer right-0 top-0"
                />
            </Dialog.Title>
            <Dialog.Description size="2" mb="4">
                <div className="border-t pt-4 space-y-2">
                    <p>
                        <strong>$0.06</strong> for <strong>1 share</strong>
                    </p>
                    <p>Set Custom Amount</p>
                    <TextField.Root type="number">
                        <TextField.Slot side="right">
                            Share(s)
                        </TextField.Slot>
                    </TextField.Root>
                    <div className="text-right space-y-2">
                        <p>Insufficient Balance</p>
                        <p>Balance: 0 ETH</p>
                        <p>Fee: 0.000001 ETH</p>
                        <p>Total: 0.000021 ETH</p>
                    </div>
                    <div className="border-b border-dashed"></div>
                    <Button className="w-full cursor-pointer">Confirm</Button>
                    <p>Share price will go up when more people buy. And you can sell it anytime.</p>
                </div>
            </Dialog.Description>
        </Dialog.Content>
    </Dialog.Root>
}