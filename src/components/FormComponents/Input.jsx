import React from 'react';
import TextError from '../EmployeeList/TextError'

import { Field, ErrorMessage } from 'formik'

function Input(props) {
    const { label, name, ...rest } = props
    return (
        <>
            <div className="form-group">
                <label htmlFor={name} className="mt-2">{label}</label>
                <Field
                    id={name}
                    name={name}
                    {...rest}
                />
                <ErrorMessage name={name} component={TextError} className="mb-3" />
            </div>
        </>
    );
}

export default Input
