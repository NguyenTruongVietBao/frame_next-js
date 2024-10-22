import {CheckCircledIcon} from "@radix-ui/react-icons";

interface FormSuccessProps {
    message?: string;
}

export const SuccessForm = ({message}:FormSuccessProps) => {
    if(!message) {
        return null;
    }
    return (
        <p className={'flex items-center gap-5 text-green-500 w-full p-2 bg-green-200 rounded-sm'}>
            <CheckCircledIcon className={'h-4 w-4'}/>
            {message}
        </p>
    )
}