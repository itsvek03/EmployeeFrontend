import { EmployeeReducer } from '../reducers/EmployeeReducer'
import { combineReducers } from "redux";


const reducer = combineReducers({
    EmployeeReducer: EmployeeReducer
})




export default reducer;