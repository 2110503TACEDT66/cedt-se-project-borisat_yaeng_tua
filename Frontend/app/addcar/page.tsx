"use client";
import { Link } from "@mui/material";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import registerUser from "@/libs/registerUser";
import CustomButton from "@/components/CustomButton";
import Swal from "sweetalert2";
import registerProvider from "@/libs/registerProvider";
import AddCar from "@/components/AddCar";
import { useSession } from "next-auth/react";
import { CarProps } from "@/types";
import createCar from "@/libs/createCar";

export default function ProviderRegistrationPage() {
    
  const [formData, setFormData] = useState<CarProps>({
    _id: "",
    Brand: "",
    Model: "",
    Year: "",
    Color: "",
    FeePerDay: 0,
    LicensePlate: "",
    PictureCover: "",
    Picture1: "",
    Picture2: "",
    Picture3: "",
    Picture4: "",
    provider: ""
  });
  // Inside the useEffect hook, you can access setFormData
  const { data: session } = useSession();
  
  if (!session) return; // Return early if session is not available
  
  const token = session.user.token;

  useEffect(() => {
  

  // Update the formData state with the token
  setFormData((prevFormData) => ({
    ...prevFormData,
    token: token,
  }));
}, []);
  

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [animateClass, setAnimateClass] = useState("");
  const [isCoverClick, setIsCoverClick]  = useState(false);
  const [isPicture1Click, setPicture1Click]  = useState(false);
  const [isPicture2Click, setPicture2Click]  = useState(false);
  const [isPicture3Click, setPicture3Click]  = useState(false);
  const [isPicture4Click, setPicture4Click]  = useState(false);
  

   

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value} = e.target;
    const newValue = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (
      formData.Brand.trim() === "" ||
      formData.Model.trim() === "" ||
      formData.Year.trim() === "" ||
      formData.Color.trim() === "" ||
      formData.FeePerDay.toString() === "" ||
      formData.LicensePlate.trim() === ""
    ) {
      Swal.fire({
        title: "Some fields are missing",
        text: "Please fill out all fields",
        icon: "error",
      });
    } else if (!isCoverClick) {
      Swal.fire({
        title: "Cover Picture is missing",
        text: "Please upload Car Cover Picture",
        icon: "error",
      });
    }

    if (!formSubmitted && isCoverClick) {
      setFormSubmitted(true);
      const token = session?.user?.token
      try {
        await createCar(
          formData.Brand,
          formData.Model,
          formData.Year,
          formData.Color,
          formData.FeePerDay.toString(),
          formData.LicensePlate,
          formData.PictureCover,
          formData.Picture1,
          formData.Picture2,
          formData.Picture3,
          formData.Picture4,
          token
        );
        Swal.fire({
          title: "Good job!",
          text: "Add Car Successful.",
          icon: "success",
        }).then(()=>{
          window.location.href = "/info";
        })
      } catch (err) {
        Swal.fire({
          title: "Failed!",
          text: "Some fields are not valid.",
          icon: "error"
        });
      } 
      // registerProvider(formData); 
    }
    
  };

  const handleClick = () => {
    if (!formSubmitted) {
      setAnimateClass("animate-jump animate-once");
      setTimeout(() => setAnimateClass(""), 500);
    }
  };
//   let PictureURL;
//   let CitizenCardURL;
//   let CitizenCertificateURL;
  const handleCover = (result: any) => {
    // Handle the result here, such as displaying a message or updating state
    console.log("Result from Cover:", result);
    //PictureURL = result.url
    setFormData((prevFormData) => ({
        ...prevFormData,
        PictureCover: result.url,
      }));
    setIsCoverClick(true)
  };
  const handlePicture1 = (result: any) => {
    
    // Handle the result here, such as displaying a message or updating state
    console.log("Result from Picture 1:", result);
    //CitizenCardURL = result.url
    setFormData((prevFormData) => ({
        ...prevFormData,
        Picture1: result.url,
      }));
    setPicture1Click(true)
  };
  const handlePicture2 = (result: any) => {
    // Handle the result here, such as displaying a message or updating state
    console.log("Result from Picture 2:", result);
    //CitizenCertificateURL = result.url
    setFormData((prevFormData) => ({
        ...prevFormData,
        Picture2: result.url,
      }));
      setPicture2Click(true)
  };

  const handlePicture3 = (result: any) => {
    // Handle the result here, such as displaying a message or updating state
    console.log("Result from Picture 3:", result);
    //CitizenCertificateURL = result.url
    setFormData((prevFormData) => ({
        ...prevFormData,
        Picture3: result.url,
      }));
      setPicture3Click(true)
  };

  const handlePicture4 = (result: any) => {
    // Handle the result here, such as displaying a message or updating state
    console.log("Result from Picture 4:", result);
    //CitizenCertificateURL = result.url
    setFormData((prevFormData) => ({
        ...prevFormData,
        Picture4: result.url,
      }));
      setPicture4Click(true)
  };

  return (
    
    <div className=" flex justify-center items-center flex-col mt-48 h-[100%] animate-fade-up bg-primary-blue-100 p-8 hover:shadow-md rounded-3xl text-medium">
        <div className=" flex justify-center pb-9">
        <h1 className="text-4xl font-extrabold ">Add Car</h1>
        </div>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="md:flex  md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Brand
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              placeholder="Car brand"
              name="Brand"
              onChange={handleChange}
              
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Model
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              placeholder="Model"
              name="Model"
              onChange={handleChange}
              
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Year
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              placeholder="Year"
              name="Year"
              onChange={handleChange}
              
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Color
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              placeholder="Color"
              name="Color"
              onChange={handleChange}
              
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              FeePerDay
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="number"
              placeholder="FeePerDay"
              name="FeePerDay"
              onChange={handleChange}
              
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              LicensePlate
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              placeholder="LicensePlate"
              name="LicensePlate"
              onChange={handleChange}
              
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              PictureCover
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
            <AddCar handleResult={handleCover}/>
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Picture 1
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
            <AddCar handleResult={handlePicture1}/>
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Picture 2
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
            <AddCar handleResult={handlePicture2}/>
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Picture 3
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
            <AddCar handleResult={handlePicture3}/>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Picture 4
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
            <AddCar handleResult={handlePicture4}/>
          </div>
        </div>

        <div className="flex justify-center">
          <div className=" flex justify-center">
            <CustomButton
              title="Add Car"
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
