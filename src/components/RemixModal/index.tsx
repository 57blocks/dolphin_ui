import { NftWithAsset } from "@/app/hooks/useIPAssetNfts";
import { CrossCircledIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, Dialog, TextField } from "@radix-ui/themes";

interface IProps {
    open: boolean
    asset?: NftWithAsset
    onClose?: () => void
}

export default function RemixModal({
    open,
    asset,
    onClose
}: IProps) {
    return <Dialog.Root open={open}>
        <Dialog.Content maxWidth="450px">
            <Dialog.Title className="relative">
                Remix
                <CrossCircledIcon
                    onClick={() => {
                        onClose && onClose()
                    }}
                    className="absolute w-5 h-5 cursor-pointer right-0 top-0"
                />
            </Dialog.Title>
            <Dialog.Description size="2" mb="4">
                <div className="border-t pt-4 space-y-2">
                    <p>Asset via Key traded</p>
                    <div className="p-2 grid grid-cols-5">
                        <img
                            className="col-span-1 object-cover aspect-square rounded-lg "
                            src={asset?.image_url}
                            alt=""
                        />
                        <div className="ml-4 col-span-4">
                            <h4 className="text-lg font-medium hover:text-indigo-600">
                                {asset?.name || 'Untitled'}
                            </h4>
                            <p>Token ID: {asset?.token_id}</p>
                            <h4 className="text-lg font-bold text-green-600">$10-$20</h4>
                        </div>
                    </div>
                    <div className="text-right space-y-2">
                        <p>Conversion Price: 0.000021 ETH</p>
                    </div>
                    <div className="border-b border-dashed"></div>
                    <Button className="w-full cursor-pointer">Mint & Convert</Button>
                    <p>IP Asset Derivative Keep the Same As Parent</p>
                </div>
            </Dialog.Description>
        </Dialog.Content>
    </Dialog.Root>
}