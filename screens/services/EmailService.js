import apiClient from "../apiss/AxiosConfig";
/**
 * Envía un correo electrónico para recuperación de credenciales.
 *
 * @param {Object} credentialsRecovery - Los datos necesarios para la recuperación de credenciales.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 */
const sendemail = async (credentialsrecovery)  => {
    try {
        const {data, status} = await apiClient.post(`/envioCorreo`, credentialsrecovery);
        return {
            data,
            status
        }
    } catch (error) {
        console.log(error)
    }
}
/**
 * Envía una nueva contraseña para restablecer la contraseña del usuario.
 *
 * @param {Object} credentialsNewPassword - Los datos necesarios para la creación de una nueva contraseña.
 * @returns {Promise<{data: Object, status: number}>} - Una promesa que resuelve con los datos y el estado de la respuesta.
 */
const sendnewpassword = async (credentialsnewpassword)  => {
    try {
        const {data, status} = await apiClient.post(`/cambiarPassword`, credentialsnewpassword);
        return {
            data,
            status
        }
    } catch (error) {
        console.log(error)
    }
}

export {
    sendemail,
    sendnewpassword
}