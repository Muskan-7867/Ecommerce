import React from "react";
import { circle, circle1, circle2, Down, graphone, graph2, graph3, UP } from "../../../constants/imagePath"

interface InsightCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  information: string;
  comparison: string;
  isPositive: boolean;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  value,
  subtitle,
  comparison,
  isPositive,
  information,
}) => {
  // Dynamically set the value text size based on the title
  const valueTextSize = title === "Total Users" ? "text-sm" : "text-2xl";
  const infoTextSize = title === "Total Users" ? "text-sm" : "text-2xl";
  const valueordertext = title === "Total Orders" ? "text-3xl" : "text-2xl";

  // Artist-specific images
  const completedImage = circle;
  const pendingImage = circle1;
  const newImage = circle2;

  return (
    <div
      className=" shadow-md  border border-gray-300 rounded-lg p-4 "
      style={{
        width: "410px",
        height: "227px",
        borderRadius: "12px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h3 className="text-lg font-medium text-[#1F4062] mb-4">{title}</h3>

        {/* Content for "Total Artists" */}
        {title === "Total Artist's" ? (
          <>
            <div className="flex items-center mb-2">
              <img
                src={completedImage}
                alt="Completed Icon"
                className="h-5 w-5 mr-2"
              />
              <p className="text-lg text-[#2c5B8C] font-bold">{subtitle}</p>
            </div>

            <div className="flex items-center mb-2">
              <img
                src={pendingImage}
                alt="Pending Icon"
                className="h-5 w-5 mr-2"
              />
              <p className={` ${valueordertext} text-lg text-[#2c5B8C] font-bold`}>{value}</p>
            </div>

            <div className="flex items-center mb-4">
              <img src={newImage} alt="New Icon" className="h-5 w-5 mr-2" />
              <p className="text-lg text-[#2c5B8C] font-bold">{information}</p>
            </div>
          </>
        ) : (
          // Default layout for other cards
          <>
            <p className="text-lg text-[#2c5B8C] font-bold mb-2">{subtitle}</p>
            <div className="flex items-center font-bold mb-2">
              <span className={`${valueTextSize} font-bold text-[#2c5B8C]`}>
                {value}
              </span>
            </div>
            <div className="flex items-center font-bold mb-2">
              <span className={`${infoTextSize} text-2xl font-bold text-[#2c5B8C]`}>
                {information}
              </span>
            </div>
          </>
        )}

        {/*  icon, value, and comparison text */}
        <div className="flex items-center justify-start space-x-1">
          <img
            src={isPositive ? UP : Down}
            alt="Arrow Icon"
            className="h-4 w-4"
          />
          <span
            className={`text-base font-bold ${isPositive ? "text-[#5AB987]" : "text-red-500"
              }`}
          >
            {comparison}
          </span>
          <span className="text-sm text-[#83ACDB] font-normal">
            Compared to January
          </span>
        </div>
      </div>

      {/* Graph Image */}
      <div className="flex justify-center items-center mb-8 mr-4">
        <img
          src={
            title === "Total Orders"
              ? graphone
              : title === "Total Amount (In Rupees)"
                ? graph2
                : graph3
          }
          alt="Graph"
          className="h-[93px] w-[137px]"
        />
      </div>
    </div>
  );
}

export default InsightCard;
