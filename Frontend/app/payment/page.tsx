"use client"
import getPaymentByUser from "@/libs/getPaymentsByUser";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Payment() {
    const [paymentHistory, setPaymentHistory] = useState<any[]>([])

    const { data: session } = useSession();
    if (!session) return null
    const token = session.user.token
    const userID = session.user._id

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getPaymentByUser(userID, token)
                console.log("Response:", response);
                setPaymentHistory(response)
            } catch (err) {
                console.log("Failed to fetch the data");
            }
        }
        fetchData()
    }, [])


    return (
        <div className="w-11/12 mt-24 relative overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500"> 
                <caption className="p-6 text-lg text-zinc-800 text-left rtl:text-right bg-zinc-300">
                    Payment History
                </caption>
                <thead className="text-xs text-white uppercase bg-zinc-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-3 py-3 flex justify-end"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="odd:bg-white even:bg-gray-50 border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            28 Apr 24
                        </th>
                        <td className="px-6 py-4 max-w-lg truncate">
                            CSJIFJAON198584
                        </td>
                        <td className="px-6 py-4">
                            65000
                        </td>
                        <td className="px-6 py-4">
                            <button className="bg-emerald-500 text-white font-bold py-2 px-4 rounded-full ring-2 ring-transparent cursor-default">
                                Paid
                            </button>
                        </td>
                        <td className="flex justify-end items-center pr-6 py-4">
                            <Link href={``} className="transition-transform duration-500 ease-in-out hover:scale-105">
                                <button className="bg-primary-blue hover:bg-white text-white  hover:text-primary-blue font-bold py-2 px-4 border-primary-blue rounded-full ring-2 ring-transparent hover:ring-primary-blue mr-3">
                                    Detail
                                </button>
                            </Link>
                        </td>
                    </tr>
                    <tr className="odd:bg-white even:bg-gray-50 border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            29 Feb 24
                        </th>
                        <td className="px-6 py-4 max-w-lg truncate">
                            BSJIHJAXN198584
                        </td>
                        <td className="px-6 py-4">
                            65000
                        </td>
                        <td className="px-6 py-4">
                            <button className="bg-orange-400 text-white font-bold py-2 px-4 rounded-full ring-2 ring-transparent cursor-default">
                                Pending
                            </button>
                        </td>
                        <td className="flex justify-end items-center pr-6 py-4">
                            <Link href={``} className="transition-transform duration-500 ease-in-out hover:scale-105">
                                <button className="bg-primary-blue hover:bg-white text-white  hover:text-primary-blue font-bold py-2 px-4 border-primary-blue rounded-full ring-2 ring-transparent hover:ring-primary-blue mr-3">
                                    Detail
                                </button>
                            </Link>
                        </td>
                    </tr>
                    <tr className="odd:bg-white even:bg-gray-50 border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            2 Jan 24
                        </th>
                        <td className="px-6 py-4 max-w-lg truncate">
                            APOIFJAON198684
                        </td>
                        <td className="px-6 py-4">
                            65000
                        </td>
                        <td className="px-6 py-4">
                            <button className="bg-red-400 text-white font-bold py-2 px-4 rounded-full ring-2 ring-transparent cursor-default">
                                Decline
                            </button>
                        </td>
                        <td className="flex justify-end items-center pr-6 py-4">
                            <Link href={``} className="transition-transform duration-500 ease-in-out hover:scale-105">
                                <button className="bg-primary-blue hover:bg-white text-white  hover:text-primary-blue font-bold py-2 px-4 border-primary-blue rounded-full ring-2 ring-transparent hover:ring-primary-blue mr-3">
                                    Detail
                                </button>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
