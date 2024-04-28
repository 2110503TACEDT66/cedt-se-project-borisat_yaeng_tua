"use client"
import getCar from "@/libs/getCar";
import getPaymentByUser from "@/libs/getPaymentsByUser";
import formatDate from "@/utils/formatDate";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Payment() {
    const [paymentHistory, setPaymentHistory] = useState<any[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [carData, setCarData] = useState<any>()
    const [id, setId] = useState<string>('test')

    const { data: session } = useSession();
    if (!session) return null
    const token = session.user.token
    const userID = session.user._id

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getPaymentByUser(userID, token)
                console.log("Response:", response);
                setPaymentHistory(response.data)
            } catch (err) {
                console.log("Failed to fetch the data");
            }
        }
        fetchData()
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCar(id);
                console.log("ResponseCar:", response.data);
                setCarData(response.data)
            } catch (err) {
                console.log("Failed to fetch the data");
            }
        }
        fetchData()
    }, [isModalOpen])

    const toggleModal = (_id : string) => {
        setId(_id);
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="w-11/12 mt-24 relative overflow-x-auto shadow-md rounded-lg text-gray-800">
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
                    {
                        paymentHistory.map((paymentHistory : any) => (
                            <tr key={paymentHistory._id} className="odd:bg-white even:bg-gray-50 border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {formatDate(paymentHistory.createdAt)}
                                </th>
                                <td className="px-6 py-4 max-w-lg truncate">
                                    {paymentHistory.payment_intent}
                                </td>
                                <td className="px-6 py-4">
                                    {paymentHistory.total}
                                </td>
                                <td className="px-6 py-4">
                                    {paymentHistory.payment_status === 'paid' ? (
                                        <button className="bg-emerald-500 text-white font-bold py-2 px-4 rounded-full ring-2 ring-transparent cursor-default">
                                            Paid
                                        </button>
                                    ) : (
                                        <button className="bg-orange-400 text-white font-bold py-2 px-4 rounded-full ring-2 ring-transparent cursor-default">
                                            Refunded
                                        </button>
                                    )}
                                </td>
                                <td className="flex justify-end items-center pr-6 py-4">
                                    <Link href={``} className="transition-transform duration-500 ease-in-out hover:scale-105">
                                        <button onClick={() => toggleModal(paymentHistory.car._id)} className="bg-primary-blue hover:bg-white text-white  hover:text-primary-blue font-bold py-2 px-4 border-primary-blue rounded-full ring-2 ring-transparent hover:ring-primary-blue mr-3">
                                            Detail
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    {isModalOpen && (
                                        <div className="z-10 fixed inset-0 flex justify-end bg-black bg-opacity-50">
                                            <div className="w-1/3 flex flex-col bg-white rounded-xl p-8 m-3">
                                                <div className="flex flex-row justify-between items-center">
                                                    <div className="font-bold text-xl">
                                                        Payment Details
                                                    </div>
                                                    <button onClick={() => toggleModal('')} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="mt-7 p-8 flex flex-row justify-between bg-gray-100 rounded-xl">
                                                    <div>
                                                        {paymentHistory.information.name}
                                                    </div>
                                                    <div>
                                                        {formatDate(paymentHistory.createdAt)}
                                                    </div>
                                                </div>
                                                <div className="mt-7 p-6 flex flex-row w-full border-solid border border-gray-200 rounded-xl">
                                                    <table className=" w-full table-auto border-separate border-spacing-2">
                                                        <tbody>
                                                        <tr>
                                                            <td>Email</td>
                                                            <td className="text-right">ehainot</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Phone</td>
                                                            <td className="text-right">telme whu</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Member Since</td>
                                                            <td className="text-right">mt</td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="mt-7 px-6 py-3 flex flex-row w-full bg-gray-100 rounded-xl">
                                                    <table className=" w-full table-auto border-separate border-spacing-2">
                                                        <tbody>
                                                        <tr>
                                                            <td>Total</td>
                                                            <td className="text-right font-bold">65000</td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};
