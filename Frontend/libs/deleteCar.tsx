import config from "../config"

export default async function deleteBooking(carID: string, token: string) {
    const response = await fetch(`${config.backendUrl}/api/v1/cars/${carID}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    console.log(response)
    if(!response.ok){
        throw new Error("Failed to delete car")
    }

    return await response.json()
};
