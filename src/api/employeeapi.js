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

export const postEmployeeapi = (data) => {
    console.log("API DATA", data)
    return axios.post("http://localhost:8000/api/v1/employee", data, config)
}

export const getEmployeeByidapi = (id) => {
    if (id === 0) {
        return null
    }
    else {
        return axios.get(`http://localhost:8000/api/v1/employee/${id}`, config)
    }

}

export const UpdateEmployeeapi = (id, data) => {
    console.log("UPDATE DATA", data)
    return axios.patch(`http://localhost:8000/api/v1/employee/${id}`, data, config)
}