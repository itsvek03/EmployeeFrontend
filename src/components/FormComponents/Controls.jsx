import React from 'react'
import Input from './Input'
import TextArea from './TextArea'
import Select from './Select'
import FormInput from './FormInput'
export default function Controls(props) {
    const { control, ...rest } = props;
    switch (control) {
        case 'input':
            return <Input {...rest} />

        case 'textarea':
            return <TextArea {...rest} />

        case 'select':
            return <Select {...rest} />

        case "fileInput":
            return <FormInput {...rest} />

        default:
            return null
    }
}
