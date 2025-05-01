import React from "react";
import { TfiSearch } from "react-icons/tfi";

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedDate: string;
  onDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedKYC: string;
  onKYCChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedMembership: string;
  onMembershipChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const OrderFilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedDate,
  onDateChange,
}) => {
  return (
    <div className="flex justify-between p-3 rounded-lg w-full bg-white">
      {/* Right-aligned section for search and date */}
      <div className="flex justify-end items-end gap-2 w-full">
        {/* Search Input */}
        <div className="flex items-center border gap-4 border-gray-300 rounded-lg px-3 py-2 w-[250px]">
          <TfiSearch className="text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search..."
            className="outline-none text-gray-700 w-full"
          />
        </div>

        {/* Date Picker */}
        <input
          type="date"
          value={selectedDate}
          onChange={onDateChange}
          className="border border-gray-300 text-[#262626] font-medium rounded-lg px-4 py-2 cursor-pointer w-[180px]"
        />
      </div>
    </div>
  );
};

export default OrderFilterBar;
