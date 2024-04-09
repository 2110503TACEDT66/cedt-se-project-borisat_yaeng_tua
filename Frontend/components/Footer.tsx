import Link from "next/link";
import Image from "next/image";
import { footerLinks } from "@/constants";
import { link } from "fs";
export default function Footer() {
    return (
        <footer className="flex flex-col text-black-100 mt-5 bordor-t bordor-gray-100">
            <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
                <div className="flex flex-col justify-start items-start gap-6">
                    <Image src="./logo.svg" alt="logo" width={118} height={18} className="object-contain"/>
                    <p className="text-base text-gray-700">
                        HarCub 2024 <br />
                        All rights reserved &copy;

                    </p>
                </div>
               
                </div>
                
                <div className="flex justify-between items-center flex-wrap mt-10 bordor-t bordor-gray-100 sm:px-16 px-6 py-10">
                <p>@2024 HarCub. All Rights Reserved</p>
                    <div className="footer__copyrights-link">
                        <Link href="/" className="text-gray-500">Privacy Policy</Link>
                        <Link href="/" className="text-gray-500">Terms of Use</Link>
                    </div>
                </div>
        </footer>
    );
};

