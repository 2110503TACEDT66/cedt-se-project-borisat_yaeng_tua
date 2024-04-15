'use client'

import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import { getPendingProviders } from "@/libs/getPendingProviders"
import Image from "next/image"
import Link from "next/link"
import { ProviderData } from "@/types"
import updateProvider from "@/libs/updateProvider"
import updateUser from "@/libs/updateUser"


export default function provider() {
    

    const [request, setRequest] = useState<any[]>([])
    const [isClick, setIsClick] = useState(false)

    const { data: session } = useSession();
    if (!session) return null
    const token = session.user.token

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await getPendingProviders(token);
                setRequest(response.data)
            }catch(err){
                console.log("Failed to fetch the data");
            }
        }
        fetchData()
    }, [isClick])

    async function handleApprove(provider : ProviderData) {

        try{
            const approved = await updateProvider(provider._id, "approved", token);
            const updated = await updateUser(provider.user, token)
        }catch(err){
            console.log("ERROR can't approve");
        }

        setIsClick(prevData => !prevData)

    }

    async function handleReject(provider : ProviderData) {

        try{
            const rejected = await updateProvider(provider._id, "rejected", token);
        }catch(err){
            console.log("ERROR can't Reject");
        }

        setIsClick(prevData => !prevData)

    }

    return(
        <div className="w-full mt-24 flex flex-col items-center">
            {
                request.map((providerRequest : ProviderData) => (
                    <div key={providerRequest._id} className="block w-[50%] h-[200px] bg-slate-100 my-3 p-5 rounded-lg flex flex-row">
                        <div className="w-1/4 h-fit">
                            <Image src={providerRequest.picture} width={100} height={100} alt="Provider Picture" className="rounded-lg" />
                        </div>
                        <div className="flex flex-col justify-between ml-3 font-medium">
                            <p>Name: {providerRequest.name}</p>
                            <p>Address: {providerRequest.address}</p>
                            <p>Contact: {providerRequest.contact}</p>
                            <div className="flex flex-row">
                                <Link href={`/admin/information/${providerRequest._id}`}>
                                    <button className="bg-primary-blue rounded-full custom-btn hover:bg-white text-white  hover:text-primary-blue ring-offset-1 ring-transparent ring-2 hover:ring-primary-blue">
                                        view full information
                                    </button>
                                </Link>
                                <button className="bg-transparent hover:bg-emerald-500 text-emerald-700 font-semibold hover:text-white py-2 px-3 mx-2 border border-emerald-500 hover:border-transparent rounded"
                                onClick={() => handleApprove(providerRequest)}>
                                        approve
                                </button>
                                <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                                onClick={() => handleReject(providerRequest)}>
                                        reject
                                </button>
                            </div>
                                                 
                        </div>
                    </div>
                ))
            }
        </div>
    )
}