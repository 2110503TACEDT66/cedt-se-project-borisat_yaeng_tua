import config from "../config"

export default async function updateUser(userID: string, token: string) {
    const response = await fetch(`http://localhost:5050/api/v1/user/${userID}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            role: "provider"
        })
    })

    if (!response.ok) {
        throw new Error(`Failed to update user`)
    }

    return await response.json()
};
