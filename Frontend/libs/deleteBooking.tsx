import config from "../config"

export default async function deleteBooking(bookingID: string, token: string) {
    const response = await fetch(`${config.backendUrl}/api/v1/bookings/${bookingID}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    if(!response.ok){
        throw new Error("Failed to delete bookings")
    }

    return await response.json()
};
