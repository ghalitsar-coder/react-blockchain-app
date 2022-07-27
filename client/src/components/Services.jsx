import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCard = ({ title, subtitle, icon, color }) => (
  <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer shadow-xl ">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color} `}
    >
      {icon}
    </div>
    <div className="flex ml-5 flex-col flex-1">
      <h1 className="mt-2 text-white text-lg"> {title} </h1>
      <p className="mt-2 text-white text-sm md:w-9/12 ">{subtitle}</p>
    </div>
  </div>
);

const Services = () => {
  return (
    <div className="flex w-full flex-col md:flex-row justify-center items-center gradient-bg-services">
      <div className="flex flex-col md:flex-row container items-center justify-between       ">
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
            Services that we provide
            <br />
            continue to improve
          </h1>
        </div>
        <div className=" flex flex-col justify-start items-center ">
          <ServiceCard
            color="bg-[#2952e3]"
            title="Security Guaranted"
            icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
            subtitle="Security is Guaranted. We always maintain privacy and mainting of our product. "
          />
          <ServiceCard
            color="bg-[#8945f8]"
            title="Best Exchange rates"
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle="Security is Guaranted. We always maintain privacy and mainting of our product. "
          />
          <ServiceCard
            color="bg-[#f84550]"
            title="Fastest transaction"
            icon={<RiHeart2Fill fontSize={21} className="text-white" />}
            subtitle="Security is Guaranted. We always maintain privacy and mainting of our product. "
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
