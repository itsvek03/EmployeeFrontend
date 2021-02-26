import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Control from "./Controls";
import { getEmployeeAction, updateActionByid, postEmployeeAction } from '../../actions/EmployeeActions'
import { POST_REQUEST, UPDATE_REQUEST } from '../../actions/EmployeeConstant'
import PropagateLoader from 'react-spinners/PropagateLoader'

const Container = ({ closeFun, isEdit, initVals, compId }) => {
    const StateList = [
        {
            key: "Maharashtra",
            value: "Maharashtra",
        },
        {
            key: "Delhi",
            value: "Delhi",
        },
        {
            key: "Uttar Pradesh",
            value: "Uttar Pradesh",
        },
        {
            key: "Gujrat",
            value: "Gujrat",
        },
        {
            key: "Punjab",
            value: "Punjab",
        },
    ]

    let initialValues = {};

    //if isEdit set to true then set initialValues to provided data
    if (isEdit) {
        initialValues = initVals;
    } else {
        initialValues = {
            CompanyName: '',
            Description: '',
            Contact: '',
            Email: '',
            State: '',
            City: '',
            LogoImage: ''
        };
    }


    const validationSchema = Yup.object({
        Contact: Yup.string()
            .matches(/\d{10}/, "Contact No. Can Be Of 10 Digits Only")
            .required("Required!"),
        CompanyName: Yup.string()
            .min(5, "It must contain 5 characters")
            .required('This field is required'),
        Description: Yup.string()
            .min(30, "It must contain 30 characters")
            .required('This field is required'),
        Email: Yup.string()
            .email("Invalid Email format")
            .required('This field is required'),
        State: Yup.string(),
        City: Yup.string(),
        LogoImage: Yup.mixed()
            .required('This field is required'),
    });

    const { loading, error } = useSelector(
        (state) => state.PostEmployeeReducer
    );
    const ccity = useSelector(state => state.SelectCity)


    const {
        loading: putLoading,
        //success: putSuccess,
        error: putError,
    } = useSelector((state) => state.updateEmployeeReducer);


    const dispatch = useDispatch();

    const onSubmit = (values) => {
        let d = new FormData();
        d.append('CompanyName', values.CompanyName)
        d.append('Description', values.Description)
        d.append('Contact', values.Contact)
        d.append('Email', values.Email)
        d.append('State', values.State)
        d.append('City', values.City)
        d.append('LogoImage', values.LogoImage)

        //if update request
        if (isEdit) {
            dispatch(updateActionByid(compId, d));
        } else {
            dispatch(postEmployeeAction(d));
        }
        dispatch(getEmployeeAction());
    };

    //clear previous data
    useEffect(() => {
        dispatch({ type: POST_REQUEST });
        dispatch({ type: UPDATE_REQUEST });
    }, [dispatch]);

    //in Edit Mode get State & set the city accordingly
    useEffect(() => {
        if (initVals) {
            if (initVals.State) {
                dispatch({ type: initVals.State });
            }
        }
    }, [initVals, dispatch]);

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik, isSubmitting, touched, errors, values) => (
                <Form>
                    {(loading || putLoading) &&
                        <div className="m-2 d-flex justify-content-center">
                            <PropagateLoader size={10} color={'#9013FE'} />
                        </div>

                    }
                    {(error || putError) && <h1>WRONG</h1>}
                    {/* {(success || putSuccess) && closeFun()} */}
                    <div className="form-group">


                        <Control
                            control='input'
                            type="text"
                            label="Company Name"
                            name="CompanyName"
                            className={`form-control mt-2 mb-3`}

                        />


                    </div>

                    <div className="form-group">
                        <Control
                            control='textarea'
                            type="text"
                            label="Description"
                            name="Description"
                            className={`form-control mt-2 mb-3`}

                        />
                    </div>


                    <div className="form-group">
                        <Control
                            control='input'
                            type="number"
                            label="Contact"
                            name="Contact"
                            className={`form-control mt-2 mb-3`}
                        />
                    </div>



                    <div className="form-group">
                        <Control
                            control='input'
                            type="email"
                            label="Email"
                            name="Email"
                            className={`form-control mt-2 mb-3`}

                        />
                    </div>
                    <div className="form-group">
                        <Control
                            control="select"
                            name="State"
                            options={StateList}
                            onChange={(val) => {
                                dispatch({ type: val });
                            }}
                            className={`form-control mt-2 mb-3`}
                        />
                    </div>

                    <div className="form-group">
                        <Control
                            control="select"
                            name="City"
                            label="Select City"
                            options={ccity}
                            className={`form-control mt-2 mb-3`}
                        />
                    </div>
                    <div className="form-group">
                        <Control control="fileInput" name="LogoImage" className={`form-control mt-2 mb-3`} />
                    </div>

                    <div className="d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg col-6"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Please Wait" : "Submit"}
                        </button >
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Container;