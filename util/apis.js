import Axios from axios
const BASE_URL = "http://localhost:1337"

function getPublicStartupFiles() {
    const url = `${BASE_URL}/api/startup/public`
    return Axios.get(url).then((response) => {
        response.data
    })
}

function getPrivateStartupFiles() {
    const url = `${BASE_URL}/api/startup/private`
    return Axios.get(url).then((response) => {
        response.data
    })
}
export {
    getPrivateStartupFiles,
    getPublicStartupFiles
}