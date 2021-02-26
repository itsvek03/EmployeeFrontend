import React from 'react'
import TextError from '../EmployeeList/TextError'

import { Field, ErrorMessage } from 'formik'

export default function TextArea(props) {
    const { label, name, ...rest } = props
    return (
        <>
            <div className="form-group">
                <label htmlFor={name} className="mt-2">{label}</label>
                <Field
                    as='textarea'
                    id={name}
                    name={name}
                    rows={4}
                    {...rest}

                />
                <ErrorMessage name={name} component={TextError} className="mb-3" />
            </div>
        </>
    );
}
