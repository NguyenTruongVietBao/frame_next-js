import {ExclamationTriangleIcon} from "@radix-ui/react-icons";

interface FormErrorProps {
    message?: string;
}

export const ErrorForm = ({message}:FormErrorProps) => {
    if(!message) {
        return null;
    }
    return (
        <p className={'flex items-center gap-5 text-red-500 w-full p-2 bg-red-200 rounded-sm'}>
            <ExclamationTriangleIcon className={'h4 w-4'}/> {message}
        </p>
    )
}