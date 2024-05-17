import { AlertDialog, Button, Flex, Separator } from "@radix-ui/themes";
import { ReactElement, useEffect, useState } from "react";

interface IProps {
    title: string
    desc: ReactElement
    visible?: boolean
}

export default function Alert({
    title,
    desc,
    visible
}: IProps) {
    const [open, setOpen] = useState(visible);

    useEffect(() => {
        setOpen(visible)
    }, [visible])
    return <AlertDialog.Root open={open}>
        <AlertDialog.Content>
            <AlertDialog.Title color="red">{title}</AlertDialog.Title>
            <Separator my="3" size="4" />
            <AlertDialog.Description size="2">
                {desc}
            </AlertDialog.Description>
            <Separator my="3" size="4" />
            <Flex gap="3" mt="4" justify="end">
                <Button onClick={() => setOpen(false)}>
                    Close
                </Button>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
}