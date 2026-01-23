import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"


const FormField = ({ id, label, type = 'text', value, onChange, placeholder, as = 'input', options = [] }: FormFieldProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handlePasswordToggle = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    const renderField = () => {
        switch (as) {
            case 'textarea':
                return <textarea id={id} value={value} onChange={onChange} placeholder={placeholder} />
            case 'select':
                return <select id={id} />
            default:
                return (
                    <span className="relative w-full">
                        <input id={id} value={value} onChange={onChange} placeholder={placeholder} type={type === 'password' && !isPasswordVisible ? 'password' : 'text'} className={type === 'password' ? 'pr-10' : ''} />
                        <div onClick={handlePasswordToggle}>
                            {type === 'password' ?
                                isPasswordVisible ?
                                    <EyeOffIcon className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" />
                                    : <EyeIcon className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" />
                                : null}
                        </div>
                    </span>
                )
        }
    }
    return (
        <div className='form-field'>
            <label htmlFor={id}>{label}</label>
            {renderField()}

        </div>
    )
}

export default FormField