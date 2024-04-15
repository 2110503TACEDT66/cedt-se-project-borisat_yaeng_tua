"use client";
import { Link } from "@mui/material";
import { useState, ChangeEvent, FormEvent } from "react";
import registerUser from "@/libs/registerUser";
import CustomButton from "@/components/CustomButton";
import Swal from "sweetalert2";
import registerProvider from "@/libs/registerProvider";
import AddCar from "@/components/AddCar";

interface FormData {
  name: string;
  address: string;
  contact: string;
  picture: string;
  citizenCard: string;
  citizenCertificate: string;
}

export default function ProviderRegistrationPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    contact: "",
    picture: "",
    citizenCard: "",
    citizenCertificate: "",
  });
  console.log(formData)

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [animateClass, setAnimateClass] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value} = e.target;
    const newValue = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formSubmitted) {
      console.log(formData);
      setFormSubmitted(true);
      registerProvider(formData);
    }
    
  };

  const handleClick = () => {
    if (!formSubmitted) {
      setAnimateClass("animate-jump animate-once");
      setTimeout(() => setAnimateClass(""), 500);
    }
  };
  let PictureURL;
  let CitizenCardURL;
  let CitizenCertificateURL;
  const handlePicture = (result: any) => {
    // Handle the result here, such as displaying a message or updating state
    console.log("Result from Picture:", result);
    //PictureURL = result.url
    setFormData((prevFormData) => ({
        ...prevFormData,
        picture: result.url,
      }));
  };
  const handleCitizenCard = (result: any) => {
    // Handle the result here, such as displaying a message or updating state
    console.log("Result from CitizenCard:", result);
    //CitizenCardURL = result.url
    setFormData((prevFormData) => ({
        ...prevFormData,
        citizenCard: result.url,
      }));
  };
  const handleCitizenCertificate = (result: any) => {
    // Handle the result here, such as displaying a message or updating state
    console.log("Result from CitizenCertificate:", result);
    //CitizenCertificateURL = result.url
    setFormData((prevFormData) => ({
        ...prevFormData,
        citizenCertificate: result.url,
      }));
  };

  return (

    <div className=" flex justify-center flex-col mt-48 h-[100%] animate-fade-up bg-primary-blue-100 p-8 hover:shadow-md rounded-3xl text-medium">
        <div className=" flex justify-center pb-9">
        <h1 className="text-4xl font-extrabold ">Provider Registration</h1>
        </div>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              placeholder="Your Name"
              name="name"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Address
            </label>
          </div>
          <div className="md:w-2/3">
            <textarea
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              placeholder="Your Address"
              name="address"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Contact
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="tel"
              placeholder="Your Contact Number"
              name="contact"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Picture
            </label>
          </div>
          <div className="md:w-2/3">
            {/* <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="file"
              name="picture"
              onChange={handleChange}
              accept="image/*"
              required
            /> */}
            <AddCar handleResult={handlePicture}/>
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Citizen Card
            </label>
          </div>
          <div className="md:w-2/3">
            {/* <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="file"
              name="citizenCard"
              onChange={handleChange}
              required
            /> */}
            <AddCar handleResult={handleCitizenCard}/>
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Citizen Certificate
            </label>
          </div>
          <div className="md:w-2/3">
            {/* <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="file"
              name="citizenCertificate"
              onChange={handleChange}
              required
            /> */}
            <AddCar handleResult={handleCitizenCertificate}/>
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/4 lg:w-1/4"></div>
          <div className=" flex justify-center">
            <CustomButton
              title="Sign Up as Provider"
              containerStyles="bg-primary-blue rounded-full"
              btnType="submit"
              handleClick={handleClick}
            />
          </div>
        </div>
      </form>
      
    </div>
  
  );
}
