'use client'

import { useState,useEffect } from "react";
import { ProviderData } from "@/types"
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function page({params} : {params: {id: string}}) {

    const [information, setInformation] = useState<ProviderData>()

    const { data: session } = useSession();
    if (!session) return null
    const token = session.user.token

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5050/api/v1/providers?_id=${params.id}`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setInformation(data.data[0]);
            } catch(err) {
                console.log("Failed to fetch the data");
            }
        }
        fetchData()
    }, [])

    if(!information) return null

    return (
        <div className="w-1/2 mt-24 bg-slate-100 m-5 p-5 rounded-lg flex flex-col justify-center">
            <div className="text-xl text-center font-bold capitalize m-5">
                {information?.name}
            </div>
            <div className="flex flex-col text-lg table-auto border-separate border-spacing-2">
                
                <div className="flex justify-center mb-2">
                    <Image src={information?.picture} alt="provider picture" width={100} height={100} className="rounded-lg"/>
                </div>
                <div className="flex flex-row">
                    <p>Address : </p>
                    <p className="text-right">{information?.address}</p>
                </div>
                <div className="flex flex-row">
                    <p>Contact : </p>
                    <p className="text-right">{information?.contact}</p>
                </div>
                <div className="flex flex-col justify-center mb-2">
                    <p>Citizen card : </p>
                    <Image src={information?.citizenCard} alt="provider picture" width={300} height={300} className="rounded-lg"/>
                </div>
                <div className="flex flex-col justify-center mb-2">
                    <p>Citizen certificate : </p>
                    <Image src={information?.citizenCertificate} alt="provider picture" width={500} height={500} className="rounded-lg"/>
                </div>
               
            </div>
        </div>
    );
}