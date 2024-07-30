import { ChangeEvent, forwardRef } from "react"

interface InputProps {
    label?: string
    placeholder?: string
    type?: string
    error?: string
    disabled?: boolean
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const SearchInputComponent = ({ label, disabled = false, placeholder, type, error, value, onChange }: InputProps) => {
    return (
        <div className="flex flex-col">
            {label && <label className="mb-2">{label}</label>}
            <input
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 ${error ? 'border-red-500' : ''}`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}
