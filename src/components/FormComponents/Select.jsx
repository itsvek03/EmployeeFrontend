import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from '../EmployeeList/TextError'

const Select = (props) => {
    const { label, name, options, onChange, ...rest } = props;
    return (
        <div className="form-group">
            <label htmlFor={name} className="mt-2">{label}</label>
            <Field name={name} className="form-control">
                {({ form, field }) => {
                    const { setFieldValue } = form;
                    const { value } = field;
                    return (
                        <select
                            className="form-control"
                            name={name}
                            id={name}
                            {...rest}
                            onChange={(e) => {
                                if (name === "State") {
                                    onChange(e.target.value);
                                }
                                setFieldValue(name, e.target.value);
                            }}
                            value={value}
                        >
                            <option key={"Select An Option"} value={""}>
                                Select An Option
							</option>
                            {options.map((option) => {
                                return (
                                    <option key={option.value} value={option.value}>
                                        {option.key}
                                    </option>
                                );
                            })}
                        </select>
                    );
                }}
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    );
};

export default Select;