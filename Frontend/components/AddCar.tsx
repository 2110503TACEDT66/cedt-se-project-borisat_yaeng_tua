'use client'

import React, { useState } from "react";
import { useSession } from "next-auth/react";

export default function AddCar() {
    const {data: session} = useSession();

    const [selectedFile, setSelectedFile] = useState(null);
    const [resultMessage, setResultMessage] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("image", selectedFile)

            const response = await fetch("http://localhost:5050/api/v1/cars/upload", {
                method: "POST",
                headers: {
                    authorization: `Bearer ${session?.user.token}`,
                },
                body: formData
            });

            const result = await response.json();
            setResultMessage({type: "success", message: result });
            setTimeout(() => setResultMessage(Object), 5000);
        } catch (error) {
            console.error("Error uploading image:", error);
            setResultMessage({type: "error", message: error});
        }
    };

    return (
        <div className="bg-black p-2 m-2 rounded-lg">
            {
                resultMessage && (
                    <div className="text-white">
                        {
                            resultMessage.message.success === true
                            ? `Success: ${resultMessage.message.message}`
                            : `Error ${resultMessage.message.message}`
                        }
                    </div>
                )
            }
            {/* {
                <form action={handleUpload} className="flex flex-col items-center bg-white w-fit py-5 px-10 rounded-2xl">
                    <h1>Add Car</h1>
                    <div className="mt-3">
                        <div className="flex flex-row items-center my-2">
                            <label className="w-auto block text-gray-700 pr-4 font-serif" htmlFor="brand">Brand</label>
                            <input type="text" required id="brand" name="brand" placeholder="Brand" className="bg-white border-2 bordergrayy-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2 font-serif">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="model">Model</label>
                            <input type="text" required id="model" name="model" placeholder="Model" className="bg-white border-2 bordergrayy-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2 font-serif">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="year">Year</label>
                            <input type="text" required id="year" name="year" placeholder="Year" className="bg-white border-2 bordergrayy-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2 font-serif">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="color">Color</label>
                            <input type="text" required id="color" name="color" placeholder="Color" className="bg-white border-2 bordergrayy-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2 font-serif">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="feePerDay">FeePerDay</label>
                            <input type="text" required id="feePerDay" name="feePerDay" placeholder="FeePerDay" className="bg-white border-2 bordergrayy-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2 font-serif">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="licensePlate">LicensePlate</label>
                            <input type="text" required id="licensePlate" name="licensePlate" placeholder="LicensePlate" className="bg-white border-2 bordergrayy-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2 font-serif">
                            <input type="file" accept="image/*" onChange={handleFileChange}/>
                            <button disabled={!selectedFile}>Upload Image</button>
                        </div>
                    </div>
                    <button type="submit" className="bg-cyan-600 hover:bg-cyan-800 text-white p-2 rounded-xl mt-3 font-serif">Add New Company</button>
                </form>
            } */}
            <input type="file" accept="image/*" onChange={handleFileChange} className="text-white"/>
            <button onClick={handleUpload} disabled={!selectedFile} className="text-white">Upload Image</button>
                
        </div>
    )
}