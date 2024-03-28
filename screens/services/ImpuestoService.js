import apiClient from "../apiss/AxiosConfig";

const createImpuesto = async (newImpuesto) => {
    try {
       const {data, status} = await apiClient.post(`'/impuesto/crear'`, newImpuesto);
       return {
           data,
           status
        }
    } catch (error) {
            console.log(error);
     }
}

export {
    createImpuesto,
}