import { checkLicenseType } from "@/app/assets/[ipId]/components/LicenseType";
import { NftWithAsset } from "@/app/hooks/useIPAssetNfts";
import { remixAbi } from "@/dolphin/abis";
import { function_names } from "@/dolphin/constants";
import { useDolphinWriteContract } from "@/dolphin/writeContract";
import { getRoyaltyPolicyAbi } from "@/story/abi";
import { useStoryReadContract } from "@/story/readContract";
import { LicenseWithTerms } from "@/story/types";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Select } from "@radix-ui/themes";
import clx from 'classnames'
import Link from "next/link";
import { useEffect, useState } from "react";

interface IProps {
    open: boolean
    licenses: LicenseWithTerms[]
    asset: NftWithAsset
    onClose?: () => void
}

export default function RemixModal({
    open,
    licenses,
    asset,
    onClose
}: IProps) {
    if (!licenses || !licenses.length) return (
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
                        <p>No Any License</p>
                    </div>
                </Dialog.Description>
            </Dialog.Content>
        </Dialog.Root>
    )
    const [selectedLicense, setSelectedLicense] = useState<LicenseWithTerms>();

    const {
        result,
        error: royaltyPolicyErr,
        isLoading: royaltyPolicyLoading,
        read
    } = useStoryReadContract(
        getRoyaltyPolicyAbi,
        getRoyaltyPolicyAbi[0].name
    );
    useEffect(() => {
        if (licenses.length) {
            setSelectedLicense(licenses[0])
            read([21])
        }
    }, [])
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
            selectedLicense?.licenseTemplate,
            selectedLicense?.id
        ]
    })

    const handleChangeSelectLicense = (id: string) => {
        const selected = licenses.find(l => l.id === id);
        if (selected) {
            setSelectedLicense(selected);
            read([id]);
        }
    }
    const licenseOptions = licenses.map((l) => {
        const licenseType = checkLicenseType(l.licenseTerms);
        return {
            ...l,
            licenseType
        }
    })
    const mintingFee = result ? Number(result[2]) / 1e18 : 0
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
                            <p>IP ID: {asset?.ipAsset.id}</p>
                            <h4 className="text-lg font-bold text-green-600">$10-$20</h4>
                        </div>
                    </div>
                    <p>Pick a License</p>
                    <Select.Root
                        value={selectedLicense?.id}
                        onValueChange={handleChangeSelectLicense}
                    >
                        <Select.Trigger
                            className="w-full"
                            placeholder="Pick a License"
                        />
                        <Select.Content>
                            {
                                licenseOptions.map(l => <Select.Item
                                    value={l.id}
                                    key={l.id}
                                >
                                    {l.licenseType}
                                </Select.Item>)
                            }
                        </Select.Content>
                    </Select.Root>
                    {
                        result && <div className="space-y-2">
                            <p>Royalty Policy: <Link
                                className="hover:text-indigo-500"
                                target="_blank"
                                href={`https://sepolia.etherscan.io/address/${result[0]}`}
                            >
                                {result[0]}
                            </Link></p>
                            <p>Royalty Data: {result[1]}</p>
                            <p>Minting Fee: {royaltyPolicyLoading ? 'Loading...' : <span className="font-bold text-green-600">{mintingFee} ETH</span>} </p>
                            <p>
                                Currency: <Link
                                    className="hover:text-indigo-500"
                                    target="_blank"
                                    href={`https://sepolia.etherscan.io/address/${result[3]}`}
                                >
                                    {result[3]}
                                </Link>
                            </p>
                            <Button
                                className={
                                    clx("w-full cursor-pointer", {
                                        'animate-pulse': isConfirming || isPending
                                    })
                                }
                                onClick={writeDolphinContract}
                                disabled={isConfirming || isPending || mintingFee !== 0}
                            >{isConfirming || isPending
                                ? 'Waiting for Transaction...'
                                : 'Approve'}
                            </Button>
                        </div>
                    }
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
                        disabled={isConfirming || isPending || mintingFee !== 0}
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