'use client'
import { CarProps } from "@/types";
import ProviderCarCard from "./ProviderCarCard";
import { PlusCircleIcon } from '@heroicons/react/24/solid'

export default function CarManager() {
    const handleAdd = () => {
        alert("Add the car")
    }

    //  Mock car data
    const benz: CarProps = {
        _id: "1",
        Brand: "Mercedes-Benz",
        Model: "S-Class",
        Year: "2022",
        Color: "Black",
        FeePerDay: "10000",
        LicensePlate: "จก 69",
        PictureCover: "benz-cover.jpg",
        Picture1: "benz-image1.jpg",
        Picture2: "benz-image2.jpg",
        Picture3: "benz-image3.jpg",
        Picture4: "benz-image4.jpg",
    };
    const BMW: CarProps = {
        _id: "2",
        Brand: "BMW",
        Model: "5 Series",
        Year: "2023",
        Color: "Silver",
        FeePerDay: "5000",
        LicensePlate: "สวย 555",
        PictureCover: "bmw-cover.jpg",
        Picture1: "bmw-image1.jpg",
        Picture2: "bmw-image2.jpg",
        Picture3: "bmw-image3.jpg",
        Picture4: "bmw-image4.jpg",
    };

    return (
        <div className="m-5">
            <div className="text-[22px] font-bold">Your Car</div>
            <ProviderCarCard car={benz}/>
            <ProviderCarCard car={BMW}/>
            <div className="w-full mt-5 flex p-6 justify-center border-dashed border-2 border-emerald-500 hover:border-emerald-600 rounded-3xl group" onClick={handleAdd}>
                <PlusCircleIcon className="w-6 h-6 text-emerald-500 group-hover:text-emerald-600"/> 
            </div>
        </div>
    )
};
