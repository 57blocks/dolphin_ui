import { CrossCircledIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ChangeEventHandler, useState } from "react";
import { Dialog, Spinner, TextField } from "@radix-ui/themes";
import Link from "next/link";
import { Address } from "viem";
import useQueryIPbyIpId from "@/app/hooks/useQueryIPByIpId";

export default function SearchModal({
    visible,
    onClose
}: {
    visible: boolean
    onClose?: () => void
}) {
    const [word, setWord] = useState('');
    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value.trim();
        setWord(value);
    }

    const { data, loading } = useQueryIPbyIpId(word as Address)

    const renderSearchContent = () => {
        if (loading) return <Spinner />
        if (data) return <Link onClick={() => {
            onClose && onClose()
        }} href={`/assets/${data.ipId}`} className="block rounded-md p-2 hover:bg-indigo-500 hover:text-white">
            Asset: {data.ipId}
        </Link>
        if (data === null) return <p>Can not find asset with IP ID {word}</p>
        return <p>
            Please input IP ID for searching
        </p>
    }

    return <Dialog.Root open={visible}>
        <Dialog.Content maxWidth="700px">
            <Dialog.Title className="relative flex items-center">
                <TextField.Root
                    variant="soft"
                    className="flex-1"
                    placeholder="Search the ip asset..."
                    onChange={handleChange}
                >
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>
                <CrossCircledIcon
                    onClick={() => {
                        onClose && onClose()
                    }}
                    className="ml-2 shrink-0 cursor-pointer"
                />
            </Dialog.Title>
            <Dialog.Description size="2" mb="4">
                {renderSearchContent()}
            </Dialog.Description>
        </Dialog.Content>
    </Dialog.Root>
}