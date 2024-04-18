'use client'
import Image from "next/image"
import { CarProps } from "@/types"
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import PictureParser from "./PictureParser"
import deleteCar from "@/libs/deleteCar"
import { useSession } from "next-auth/react";
import { useState } from "react"
import Swal from "sweetalert2"

export default function ProviderCarCard({ car }: { car: CarProps }) {
    const { Brand, Model, Year, Color, FeePerDay, LicensePlate, PictureCover, _id } = car;
    const [isClick, setIsClick] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setIsLoading(true);
                    const token = session?.user?.token;
                    if (!token) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Failed to delete: User not authenticated",
                        });
                        return;
                    }
                    await deleteCar(_id, token);
                        // deleteCar(car._id, session.data.user.token)
                    setIsClick(prevData => !prevData)
                }
                catch (err) {
                    console.log(err)
                } finally {
                    setIsLoading(false);
                }
            }
        });
    }

    const handleEdit = () => {
        alert("Edit the car")
    }

    return (
        isClick?null:
        <div className="w-full mt-5 flex flex-col p-6 justify-center items-start text-black-100 bg-white hover:shadow-lg rounded-3xl group">
            <div className="w-full flex flex-row justify-between">
                <div className="w-full flex justify-between items-start gap-2">
                    <h2 className="text-[22px] leading-[26px] font-bold capitalize">
                    {Brand} {Model}
                    </h2>
                </div>
                <div className="flex flex-row gap-5">
                    <div className="top-2 left-2" onClick={handleEdit}>
                        <PencilSquareIcon className="w-6 h-6 hover:text-primary-blue"/>
                    </div>
                    <div className="top-2 left-2" onClick={handleDelete}>
                        <TrashIcon className="w-6 h-6 hover:text-red-500"/>
                    </div>
                </div>
            </div>
            <div className="relative w-full h-60 my-3 object-contain">
                <Image
                src={PictureParser(car.PictureCover)}
                alt={car.Model}
                fill
                priority
                className="object-contain"
                />
            </div>
            <div className="w-full">
                <table className="text-lg w-full border-separate border-spacing-2 mt-5">
                    <tbody>
                    <tr>
                        <td>Brand</td>
                        <td className="text-right">{Brand}</td>
                    </tr>
                    <tr>
                        <td>Model</td>
                        <td className="text-right">{Model}</td>
                    </tr>
                    <tr>
                        <td>Year</td>
                        <td className="text-right">{Year}</td>
                    </tr>
                    <tr>
                        <td>Color</td>
                        <td className="text-right">{Color}</td>
                    </tr>
                    <tr>
                        <td>FeePerDay</td>
                        <td className="text-right">{FeePerDay}</td>
                    </tr>
                    <tr>
                        <td>LicensePlate</td>
                        <td className="text-right">{LicensePlate}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};
