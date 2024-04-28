import config from "../config"

export default async function getPaymentByUser(token: string) {
    const response = await fetch(`${config.backendUrl}/api/v1/payments/`, {
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
