
import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from '../EmployeeList/TextError'


const FileInput = (props) => {
    const { name, ...rest } = props;
    return (
        <div className="form-group">
            <label>Company's Logo</label>
            <Field name={name}>
                {({ form }) => {
                    const { setFieldValue } = form;
                    return (

                        <input
                            name={name}
                            type="file"
                            onChange={(e) => setFieldValue(name, e.target.files[0])}
                            accept="image/*"
                            {...rest}
                        />

                    );
                }}
            </Field>
            <ErrorMessage name={name} component={TextError} className="mb-3" />
        </div>



    );
};

export default FileInput;