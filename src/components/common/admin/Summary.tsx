import React from "react";

interface Item {
    title: string;
    amount: string;
    icon: string | React.ElementType;
}

interface SummaryProps {
    data: Item[];
}

const Summary: React.FC<SummaryProps> = ({ data }) => {
    return (
        <div className="grid grid-cols-4 gap-6 mb-6"> 
            {data.map(({ title, amount, icon }, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-[#ECECEC] rounded-lg shadow-sm w-[250px]"
                >
                    <div className="w-2/3">
                        <p className="text-[14px] text-[#000000] font-medium">{title}</p>
                        <h3 className="text-[20px] text-[#000000] font-semibold">{amount}</h3> 
                    </div>
                    {typeof icon === "string" ? (
                        <img src={icon} alt={title} className="h-12 w-12 mt-2" /> 
                    ) : (
                        React.createElement(icon, { className: "text-white mt-2 p-2 rounded-lg h-12 w-12" })
                    )}
                </div>
            ))}
        </div>
    );
};

export default Summary;
