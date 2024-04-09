import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";
import getUser from "@/libs/getUser";

export default async function UserPage() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const userProfile = await getUser(session.user.token)
    var createdAt = new Date(userProfile.data.createdAt)
    var monthYear = createdAt.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

    return (
        <div className="w-1/2 mt-24 bg-slate-100 m-5 p-5 rounded-lg flex flex-col justify-center">
            <div className="text-xl text-center font-bold capitalize m-5">{userProfile.data.name}</div>
            <table className="text-lg table-auto border-separate border-spacing-2 mt-5">
                <tbody>
                    <tr><td>Email</td><td className="text-right">{userProfile.data.email}</td></tr>
                    <tr><td>Phone</td><td className="text-right">{userProfile.data.tel}</td></tr>
                    <tr><td>Member Since</td><td className="text-right">{monthYear}</td></tr>
                </tbody>
            </table>
        </div>
    )
};
