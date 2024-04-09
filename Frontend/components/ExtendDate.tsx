"use client"
import { BookingItem } from "@/types";
import { useEffect,useState } from "react";
import getBooking from "@/libs/getBooking";
import Link from "next/link";
import DateAdder from "@/utils/DateAdder";
import updateBooking from "@/libs/updateBooking";
import Swal from 'sweetalert2'

export default function ExtendDate({ bookingID, token }: { bookingID: string, token: string }) {
    const [booking, setBooking] = useState<BookingItem | null>(null);
    const [extensionDays, setExtensionDays] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
        const singleBooking = await getBooking(bookingID, token);
        setBooking(singleBooking.data);
        } catch (error) {
        console.error("Failed to fetch cars:", error);
        }
    };

    const handleIncrease = () => {
        setExtensionDays(prevDays => prevDays + 1);
    };

    const handleDecrease = () => {
        if (extensionDays > 0) {
            setExtensionDays(prevDays => prevDays - 1);
        }
    };

    const handleConfirm = async () => {
        if (booking && !isSubmitting) {
            setIsSubmitting(true); 
            const date = DateAdder(booking.bookingDateTo, extensionDays)
            try {
                //console.log(DateAdder(booking.bookingDateFrom, extensionDays));
                await updateBooking(booking._id, date, token);
                Swal.fire({
                    title: "Good job!",
                    text: "Edit booking successful",
                    icon: "success"
                  });
            } catch (error) {
                console.error('Failed to update booking:', error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Edit booking failed"
                  });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="mt-48 h-full w-1/3">
            {
            booking ? 
            <div>
                <div className="flex text-[24px] font-bold justify-between">
                    <div className="flex flex-col">
                        <div className="text-base text-zinc-500">From</div>
                        {new Date(booking.bookingDateFrom).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </div>
                    <div className="flex flex-col">
                            <div className="text-base text-zinc-500">To</div>
                            {new Date(booking.bookingDateTo).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            })}
                    </div>
                </div>
                <div className="m-6 flex justify-center">
                    <p className="flex m-6 text-[32px] font-extrabold">
                        <span className="self-start text-[14px] font-semibold">฿</span>
                        {booking.car.FeePerDay}
                        <span className="self-end text-[14px] font-medium">/day</span>
                    </p>
                </div>
                <div className="flex mt-6 text-[24px] font-semibold justify-center">How many days would you like to extend?</div>
                <div className="flex mt-6 justify-center">
                    <button className="-translate-y-3 px-4 py-2 mr-2 text-gray-600 text-[48px]" onClick={handleDecrease}>
                        &lt;
                    </button>
                    <div className="text-[48px] font-bold">{extensionDays}</div>
                    <button className="-translate-y-3 px-4 py-2 ml-2 text-gray-600 text-[48px]" onClick={handleIncrease}>
                        &gt;
                    </button>
                </div>
                <div className="mt-6 flex justify-between items-center">
                    <div className="">
                        <p className="flex text-[32px] font-extrabold">
                            <span className="self-start text-[14px] font-semibold">฿</span>
                            {`${(parseInt(booking.car.FeePerDay) * extensionDays * 1000).toLocaleString()}`}
                        </p>
                    </div>
                    <div className="">
                        <Link href="/booking">
                            <button
                                disabled={isSubmitting}
                                className={`shadow bg-emerald-500 hover:bg-emerald-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded `}
                                type="submit"
                                onClick={handleConfirm}
                            >
                                Confirm
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            : null
            }   
        </div>
    )
};
