import Alert from "@/components/Alert";
import { listAbi } from "@/dolphin/abis";
import { function_names } from "@/dolphin/constants";
import { useDolphinWriteContract } from "@/dolphin/writeContract";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { Address } from "viem";

interface IProps {
    ipId: Address
    className?: string
}

export default function PublishButton({
    ipId,
    className
}: IProps) {
    const {
        error,
        isPending,
        isConfirming,
        isConfirmed,
        writeDolphinContract
    } = useDolphinWriteContract(
        listAbi,
        function_names.list,
        [ipId]
    )
    const btnText = () => {
        if (isPending) return 'Confirming...';
        if (isConfirming) return 'Waiting for confirmation...';
        if (isConfirmed) return 'Transaction confirmed'
        return 'Racking to The Market';
    }
    return <>
        <Alert
            title='Racking Error'
            visible={!!error}
            desc={<pre>{error?.message}</pre>}
        />
        <Button
            onClick={writeDolphinContract}
            className={className || ''}
            disabled={isPending || isConfirming}
        >
            {btnText()}
        </Button>
    </>
}