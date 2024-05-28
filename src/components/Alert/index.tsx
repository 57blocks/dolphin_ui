import { AlertDialog, Button, Flex, Separator } from "@radix-ui/themes";
import { ReactElement, useEffect, useState } from "react";

interface IProps {
    title: string
    desc: ReactElement
    visible?: boolean
    onClose?: () => void
}

export default function Alert({
    title,
    desc,
    visible,
    onClose
}: IProps) {
    return <AlertDialog.Root open={visible}>
        <AlertDialog.Content>
            <AlertDialog.Title color="red">{title}</AlertDialog.Title>
            <Separator my="3" size="4" />
            <AlertDialog.Description size="2">
                {desc}
            </AlertDialog.Description>
            <Separator my="3" size="4" />
            <Flex gap="3" mt="4" justify="end">
                <Button onClick={() => {
                    onClose && onClose()
                }}>
                    Close
                </Button>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
}