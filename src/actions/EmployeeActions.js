import { EMPLOYEE_SUCCESS, EMPLOYEE_FAIL, EMPLOYEE_REQUEST } from './EmployeeConstant'
import { getEmployeeapi } from '../api/employeeapi'

export const getEmployeeAction = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: EMPLOYEE_REQUEST
            })

            const response = await getEmployeeapi();
            console.log(response.data.data)

            dispatch({
                type: EMPLOYEE_SUCCESS,
                payload: response.data.data
            })
        }
        catch (err) {
            dispatch({
                type: EMPLOYEE_FAIL,
                payload: err
            })
        }
    }
}