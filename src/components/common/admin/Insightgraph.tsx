import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'January', users: 5 },
  { name: 'February', users: 12 },
  { name: 'March', users: 17 },
  { name: 'April', users: 22 },
  { name: 'May', users: 26 },
  { name: 'June', users: 28 },
];

const Insightgraph: React.FC = () => {
  return (
    <div className="p-8 bg-[#ffffff] border border-gray-100 rounded-2xl">
      <h2 className="text-lg font-semibold mb-4 text-custom-red">User Registration Trend</h2>
      <ResponsiveContainer width="100%" height={380} >
        <BarChart data={data}>

          {/* Months (name) on the X-axis */}
          <XAxis dataKey="name" axisLine={{ stroke: '#ffffff' }} />
          {/* Users count on the Y-axis */}
          <YAxis
            domain={[0, 30]}
            ticks={[0, 5, 10, 15, 20, 25, 30]}
            axisLine={{ stroke: "#ffffff" }}
          />
          <Tooltip />
          <Legend />
          {/* Bar with red color */}
          <Bar dataKey="users" fill="#A31F3E" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Insightgraph;
