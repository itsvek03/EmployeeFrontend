import { EMPLOYEE_SUCCESS, EMPLOYEE_FAIL, EMPLOYEE_REQUEST } from '../actions/EmployeeConstant'

const initialState = {
    loading: false,
    employee: [],
    error: ''
}

export const EmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case EMPLOYEE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case EMPLOYEE_SUCCESS:
            return {
                loading: false,
                employee: action.payload,
                error: ''
            }

        case EMPLOYEE_FAIL:
            return {
                loading: false,
                employee: [],
                error: true
            }
        default:
            return state
    }
}