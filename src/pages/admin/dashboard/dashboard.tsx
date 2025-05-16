import React, { useRef } from "react";

import InsightsHeader from "./Insights/components/insightHeader";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import InsightCard from "../../../components/common/admin/InsightCard";
import { insights } from "./Insights/components/insightData";
import Insightgraph from "../../../components/common/admin/Insightgraph";

const Dashboard: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (  
    <div className="min-h-screen mt-16 border border-gray-100 py-2 pl-8">
      <InsightsHeader
        title="Insights"
        yearOptions={["2025", "2024", "2023", "2022"]}
        monthOptions={["May", "April", "March" ]}
      />

      {/* Insights Section */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide mt-2 "
        >
          {insights.map((insight, index) => (
            <InsightCard
              key={index}
              title={insight.title}
              value={insight.value}
              subtitle={insight.subtitle}
              comparison={insight.comparison}
              isPositive={insight.isPositive}
              information={insight.information}
            />
          ))}
        </div>

        <div className="absolute right-4 flex gap-4">
          <button className="rounded-full mt-4" onClick={scrollLeft}>
            <span className="text-2xl font-bold text-gray-700 ">
              <CircleChevronLeft />
            </span>
          </button>
          <button className="rounded-full mt-4" onClick={scrollRight}>
            <span className="text-2xl font-bold text-gray-700">
              <CircleChevronRight />
            </span>
          </button>
        </div>
      </div>

      {/* Orders Section */}
      <h2 className="text-xl font-medium text-[#122539] mt-10 mb-8">Orders</h2>

      {/* Insight Graph Section */}
      <div className="mb-8 mr-8 ">
        <Insightgraph />
      </div>
    </div>
  );
};

export default Dashboard;
