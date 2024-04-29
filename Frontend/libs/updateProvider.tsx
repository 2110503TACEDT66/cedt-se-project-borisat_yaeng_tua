import config from "../config"

export default async function updateProvider(providerID: string, action: string, token: string) {
    const response = await fetch(`http://localhost:5050/api/v1/providers/${providerID}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            status: action
        })
    })
    console.log(await response.json)
    if (!response.ok) {
        throw new Error(`Failed to ${action}`)
    }

    return await response.json()
};
