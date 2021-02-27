import {
    EMPLOYEE_SUCCESS,
    EMPLOYEE_FAIL,
    EMPLOYEE_REQUEST,

    POST_COMPANY,
    POST_FAIL,
    POST_REQUEST,

    GET_COMPANYID,
    COMPANY_FAIL,
    COMPANY_REQUEST,
    UPDATE_COMPANYID,
    UPDATE_FAIL,
    UPDATE_REQUEST

} from './EmployeeConstant'
import { getEmployeeapi, postEmployeeapi, getEmployeeByidapi, UpdateEmployeeapi } from '../api/employeeapi'
import Swal from 'sweetalert2';


// GET
export const getEmployeeAction = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: EMPLOYEE_REQUEST
            })

            const response = await getEmployeeapi();
            //console.log(response.data.data)

            dispatch({
                type: EMPLOYEE_SUCCESS,
                payload: response.data.data
            })
        }
        catch (err) {
            console.log(err)
            dispatch({
                type: EMPLOYEE_FAIL,
                payload: err
            })
        }
    }
}

// GET EMPLOYEEBYID
export const getEmployeeActionId = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: COMPANY_REQUEST
            })

            const response = await getEmployeeByidapi(id);
            console.log(response.data.data)

            dispatch({
                type: GET_COMPANYID,
                payload: response.data.data
            })
        }
        catch (err) {
            dispatch({
                type: COMPANY_FAIL,
                payload: err
            })
        }
    }
}



//UPDATE
export const updateActionByid = (id, data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_REQUEST
            })

            const response = await UpdateEmployeeapi(id, data)
            console.log(response.data.data)

            dispatch({
                type: UPDATE_COMPANYID,
                payload: response.data.data
            })
            Swal.fire({
                title: "Done!",
                html: '<strong>UPDATED SUCCESSFULLY</strong> ',
                icon: "success",
                timer: 2000,

            })
            dispatch(getEmployeeAction())
        }
        catch (err) {
            dispatch({
                type: UPDATE_FAIL,
                payload: err
            })
        }
    }
}

//POST
export const postEmployeeAction = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: POST_REQUEST
            })

            const response = await postEmployeeapi(data);
            console.log(response.data.data)

            dispatch({
                type: POST_COMPANY,
                payload: response.data.data
            })
            Swal.fire({
                title: "Done!",
                html: '<strong>ADDED SUCCESSFULLY</strong> ',
                icon: "success",
                timer: 2000,

            })
            dispatch(getEmployeeAction())
        }
        catch (err) {
            dispatch({
                type: POST_FAIL,
                payload: err
            })
        }
    }
}