import axios from "axios"

export const httpGet = async (path) => {
    try {
        let response = await axios.get(path)
        if(response && response.data && response.data.success) {
            return response.data
        }

        return {data:null}
    } catch(err) {
        console.log(err)
        return {data:null}
    }
}

export const httpPost = async (path, payload={}) => {
    try {
        let response = await axios.post(path, payload)
        return response
    } catch(err) {
        console.log(err)
        let msg = (err.response && err.response.data && err.response.data.msg) || "error"
        return {success:false, msg}
    }
}

export const httpPut= async (path, payload={}) => {
    try {
        let response = await axios.put(path, payload)
        return response
    } catch(err) {
        console.log(err)
        let msg = (err.response && err.response.data && err.response.data.msg) || "error"
        return {success:false, msg}
    }
}

export const httpDelete= async (path, payload={}) => {
    try {
        let response = await axios.delete(path, payload)
        return response
    } catch(err) {
        console.log(err)
        let msg = (err.response && err.response.data && err.response.data.msg) || "error"
        return {success:false, msg}
    }
}