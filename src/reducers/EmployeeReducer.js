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
} from '../actions/EmployeeConstant'

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

export const PostEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_REQUEST:
            return {
                ...state,
                loading: true
            }

        case POST_COMPANY:
            return {
                loading: false,
                employee: action.payload,
                error: '',
                success: true
            }

        case POST_FAIL:
            return {
                loading: false,
                employee: [],
                error: true
            }
        default:
            return state
    }
}


export const EmployeeIdReducer = (state = initialState, action) => {
    switch (action.type) {
        case COMPANY_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_COMPANYID:
            return {
                loading: false,
                employee: action.payload,
                error: '',
                success: true
            }

        case COMPANY_FAIL:
            return {
                loading: false,
                employee: [],
                error: true
            }
        default:
            return state
    }
}



export const updateEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case UPDATE_COMPANYID:
            return {
                loading: false,
                employee: action.payload,
                error: '',
                success: true
            }

        case UPDATE_FAIL:
            return {
                loading: false,
                employee: [],
                error: true
            }
        default:
            return state
    }
}


export const SelectCity = (state = [], action) => {
    switch (action.type) {
        case "Maharashtra":
            return [
                { key: 'Navi Mumbai', value: 'Navi Mumbai' },
                { key: 'Thane', value: 'Thane' },
                { key: 'Nashik', value: 'Nashik' },
                { key: 'Panvel', value: 'Panvel' },
                { key: 'Solapur', value: 'Solapur' },
            ];

        case "Delhi":
            return [
                { key: 'Dwarka', value: 'Dwarka' },
                { key: 'Agra', value: 'Agra' },
                { key: 'Ghaziabad', value: 'Ghaziabad' },
                { key: 'Gurugram', value: 'Gurugram' }
            ];

        case "Uttar Pradesh":
            return [
                { key: 'Prayagraj', value: 'Prayagraj' },
                { key: 'Lucknow', value: 'Lucknow' },
                { key: 'Varanasi', value: 'Varanasi' },
                { key: 'Noida', value: 'Noida' }
            ];

        case "Gujrat":
            return [
                { key: 'Surat', value: 'Surat' },
                { key: 'Rajkot', value: 'Rajkot' },
                { key: 'Ahmedabad', value: 'Ahmedabad' },
                { key: 'Vadodara', value: 'Vadodara' }
            ]

        case "Punjab":
            return [
                { key: 'Amritsar', value: 'Amritsar' },
                { key: 'Patiala', value: 'Patiala' },
                { key: 'Firozpur', value: 'Firozpur' },
                { key: 'Batala', value: 'Batala' },
            ]
        default:
            return state;
    }
};