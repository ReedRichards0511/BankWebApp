import { FC } from "react"

interface ButtonProps {
    onClick?: () => void
    title: string
    type: "submit" | "reset" | "button" | undefined
    color: 'primary' | 'secondary'
    disabled?: boolean

}

export const ButtonComponent: FC<ButtonProps> = ({ onClick, title, type, color, disabled = false }) => {
    return (
        <>
            <button
                className={`text-blue-900 text-base ${color === 'primary' ? 'bg-yellow-300 hover:bg-yellow-200' : 'bg-gray-200 hover:bg-gray-100'}  font-medium rounded-lg  px-5 py-2.5 text-center`}
                type={type}
                onClick={onClick}
                disabled={disabled}
            >
                {title}
            </button>
        </>
    )
}