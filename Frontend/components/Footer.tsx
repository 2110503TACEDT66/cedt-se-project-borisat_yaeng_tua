// import Link from "next/link";
// import Image from "next/image";
// import { footerLinks } from "@/constants";
// import { link } from "fs";
// export default function Footer() {
//     return (
//         <footer className="flex flex-col text-black-100 mt-5 bordor-t bordor-gray-100">
//             <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
//                 <div className="flex flex-col justify-start items-start gap-6">
//                     <Image src="/new-logo-gearup.png" alt="logo" width={118} height={18} className="object-contain"/>
//                     <p className="text-base text-gray-700">
//                         GearUp 2024 <br />
//                         All rights reserved &copy;

//                     </p>
//                 </div>
               
//                 </div>
                
//                 <div className="flex justify-between items-center flex-wrap mt-10 bordor-t bordor-gray-100 sm:px-16 px-6 py-10">
//                 <p>@2024 GearUp. All Rights Reserved</p>
//                     <div className="footer__copyrights-link">
//                         <Link href="/privacyPolicy" className="text-gray-500 transition-transform duration-500 ease-in-out hover:scale-110">Privacy Policy</Link>
//                         <Link href="/termOfUse" className="text-gray-500 transition-transform duration-500 ease-in-out hover:scale-110">Terms of Use</Link>
//                     </div>
//                 </div>
//         </footer>
//     );
// };

import Link from "next/link";
import Image from "next/image";
import { footerLinks } from "@/constants";

const Footer = () => {
  return (
    <footer className="py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="flex flex-col items-center md:items-start">
          <Image src="/new-logo-gearup.png" alt="logo" width={118} height={18} className="object-contain" />
          <p className="text-base text-gray-700 mt-4">
            GearUp 2024 <br />
            All rights reserved &copy;
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center mt-6 md:mt-0">
          <div className="flex flex-col md:flex-row gap-6">
            <Link href="/privacyPolicy" className=" font-semibold text-primary-blue transition-transform duration-500 ease-in-out hover:scale-110">Privacy Policy</Link>
            <Link href="/termOfUse" className="font-semibold text-primary-blue transition-transform duration-500 ease-in-out hover:scale-110">Terms of Use</Link>
          </div>
          {/* <p className="text-gray-500 mt-4 md:mt-0 pl-7">@2024 GearUp. All Rights Reserved</p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;


