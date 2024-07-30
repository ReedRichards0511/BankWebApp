import { CheckCircledIcon } from '@radix-ui/react-icons'
import { FC } from 'react';

interface SuccessModalProps {
    title: string;
}

export const SucessModalComponent:FC<SuccessModalProps> = ({title}) => {
    return (
        <div className="h-full w-full flex justify-center items-center flex-col">
            <CheckCircledIcon className="text-green-500 h-20 w-20" />
            <div className='h-full w-full'>
                <h1 className='text-2xl'>{title}</h1>
            </div>
        </div>
    )
}