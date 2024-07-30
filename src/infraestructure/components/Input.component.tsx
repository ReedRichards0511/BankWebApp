import { ChangeEvent, forwardRef } from "react"

interface InputProps {
    label?: string
    placeholder?: string
    type?: string
    error?: string
    disabled?: boolean
}

export const InputComponent = forwardRef<HTMLInputElement, InputProps>(
    ({ label, disabled = false,  placeholder, type, error, ...rest }, ref) => {
        return (
            <div className="flex flex-col">
                {label && <label className="mb-2">{label}</label>}
                <input
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 ${error ? 'border-red-500' : ''
                        }`}
                    placeholder={placeholder}
                    type={type}
                    ref={ref}
                    disabled= {disabled}
                    {...rest}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
        )
    }
)