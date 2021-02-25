// Calling the api

import axios from "axios"

let config = {
    headers: {
        "Content-type": "application/json"
    }
}

export const getEmployeeapi = () => {
    return axios.get("http://localhost:8000/api/v1/employee", config)
}