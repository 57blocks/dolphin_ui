import { NftWithAsset } from "@/app/hooks/useIPAssetNfts";
import { remixAbi } from "@/dolphin/abis";
import { function_names } from "@/dolphin/constants";
import { useDolphinWriteContract } from "@/dolphin/writeContract";
import { LicenseWithTerms } from "@/story/types";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Button, Dialog } from "@radix-ui/themes";
import clx from 'classnames'
import Link from "next/link";

interface IProps {
    open: boolean
    license: LicenseWithTerms
    asset: NftWithAsset
    onClose?: () => void
}

export default function RemixModal({
    open,
    license,
    asset,
    onClose
}: IProps) {
    if (!license) return (
        <Dialog.Root open={open}>
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
                        <p>No License</p>
                    </div>
                </Dialog.Description>
            </Dialog.Content>
        </Dialog.Root>
    )
    const {
        hash,
        error,
        isPending,
        isConfirming,
        isConfirmed,
        writeDolphinContract
    } = useDolphinWriteContract({
        abi: remixAbi,
        functionName: function_names.remix,
        args: [
            asset.ipAsset.id,
            license.licenseTemplate,
            license.id
        ]
    })
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
                    {
                        hash && <p>Transaction Hash: <Link className=" text-indigo-500" target="_blank" href={`https://sepolia.etherscan.io/tx/${hash}`}>{hash}</Link></p>
                    }
                    {
                        isConfirmed && <h4 className="text-green-500 font-bold">Transaction Succeed</h4>
                    }
                    {
                        error && (<div>
                            <h4 className="text-red-500 font-bold">Transaction Failed</h4>
                            <pre className="w-full overflow-auto border p-2 rounded-lg">{error.message}</pre>
                        </div>)
                    }
                    <div className="border-b border-dashed"></div>
                    <Button
                        className={
                            clx("w-full cursor-pointer", {
                                'animate-pulse': isConfirming || isPending
                            })
                        }
                        onClick={writeDolphinContract}
                        disabled={isConfirming || isPending}
                    >{isConfirming || isPending
                        ? 'Waiting for Transaction...'
                        : 'Mint & Convert'}
                    </Button>
                    <p>IP Asset Derivative Keep the Same As Parent</p>
                </div>
            </Dialog.Description>
        </Dialog.Content>
    </Dialog.Root>
}