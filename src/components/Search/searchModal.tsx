import { getResource } from "@/story/storyApi";
import { Asset, RESOURCE_TYPE } from "@/story/types";
import { CrossCircledIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { ChangeEventHandler, useState } from "react";
import { Dialog, Spinner, TextField } from "@radix-ui/themes";
import Link from "next/link";

export default function SearchModal({
    visible,
    onClose
}: {
    visible: boolean
    onClose?: () => void
}) {
    const [word, setWord] = useState('');
    const doSearch = async () => {
        const { data } = await getResource(RESOURCE_TYPE.ASSET, word);
        if (data) return data as Asset;
        return null;
    }
    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value.trim();
        setWord(value);
    }

    const {
        data,
        isLoading
    } = useQuery({
        queryKey: ['search asset', word],
        queryFn: () => doSearch(),
        enabled: !!word,
    })

    const renderSearchContent = () => {
        if (isLoading) return <Spinner />
        if (data) return <Link onClick={() => {
            onClose && onClose()
        }} href={`/assets/${data.id}`} className="block rounded-md p-2 hover:bg-indigo-500 hover:text-white">
            Asset: {data.id}
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