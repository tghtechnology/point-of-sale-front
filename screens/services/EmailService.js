import apiClient from "../apiss/AxiosConfig";

const sendemail = async (credentialsrecovery)  => {
    try {
        const {data, status} = await apiClient.post(`/enviarTokenCambioPassword`, credentialsrecovery);
        return {
            data,
            status
        }
    } catch (error) {
        console.log(error)
    }
}
export {
    sendemail
}