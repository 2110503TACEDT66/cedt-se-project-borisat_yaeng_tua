import config from "../config"

export default async function getPayment(invoiceID: string, token: string) {
    const response = await fetch(`${config.backendUrl}/api/v1/payments/${invoiceID}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    if(!response.ok){
        throw new Error("Failed to fetch booking")
    }

    return await response.json()
};
