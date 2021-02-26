import { EmployeeReducer, PostEmployeeReducer, EmployeeIdReducer, updateEmployeeReducer, SelectCity } from '../reducers/EmployeeReducer'
import { combineReducers } from "redux";


const reducer = combineReducers({
    EmployeeReducer: EmployeeReducer,
    PostEmployeeReducer: PostEmployeeReducer,
    EmployeeIdReducer: EmployeeIdReducer,
    updateEmployeeReducer: updateEmployeeReducer,
    SelectCity: SelectCity
})




export default reducer;