import { useState } from "react"
import { useEffectUpdate } from "./useEffectUpdate"

export function useForm(initialState, cb) {
    const [fields, setFields] = useState(initialState)
    
    useEffectUpdate(() => {
        cb?.(fields)
    }, [fields])

    function handleChange({ target }) {
        let { name: field, value, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break
            case 'checkbox':
                value = target.checked
        }
        setFields((prevFields) => ({ ...prevFields, [field]: value }))
    }

    return [fields, handleChange]
}