import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import { ArrowBigLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
  const Statics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getBookStats = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/admin/getdonationstatistics", {
        withCredentials: true,
      });
      const res1 = await axios.get("http://localhost:3000/api/admin/getusersatics", {
        withCredentials: true,
      });
      const res2 = await axios.get("http://localhost:3000/api/admin/getbookstatics", {
        withCredentials: true,
      });

      setData([
        {
          name: "Donations",
          total: res.data.statistics.totalDonations,
          approved: res.data.statistics.approvedDonations,
          rejected: res.data.statistics.rejectedDonations,
        },
        {
          name: "Users",
          total: res1.data.statistics.totalUsers,
          donors: res1.data.statistics.totalDonors,
          verified: res1.data.statistics.verifiedUsers,
          nonVerified: res1.data.statistics.nonVerifiedUsers,
        },
        {
          name: "Books",
          total: res2.data.statistics.totalbooks,
          available: res2.data.statistics.availablebooks,
          rejected: res2.data.statistics.rejectedbooks,
          pending: res2.data.statistics.pendingbooks,
        },
      ]);
    } catch (error) {
      console.error("Error fetching statistics", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookStats();
  }, []);

  return (
            <>
            {
              loading ? (
                <div className="flex justify-center items-center h-screen">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900">
                    
                  </div>
                </div>
              ) : (
                <div className="p-4 shadow-lg rounded-lg">
                  <div className="flex  items-center mb-4">
                    <ArrowBigLeft className="cursor-pointer w-10 h-10" onClick={() => navigate(-1)} />
                  <h2 className="text-2xl font-bold ">Statistics Overview</h2>
                  </div>
                <ResponsiveContainer  height={600}>
                  <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }} barGap={20}>
                    <XAxis dataKey="name" stroke="#333" />
                    <YAxis stroke="#333" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#8884d8" barSize={40} radius={[10, 10, 0, 0]} />
                    <Bar dataKey="donors" fill="#82ca9d" barSize={40} radius={[10, 10, 0, 0]} />
                    <Bar dataKey="approved" fill="#ffc658" barSize={40} radius={[10, 10, 0, 0]} />
                    <Bar dataKey="available" fill="#ff7300" barSize={40} radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              )
            }
            </>
  );
};

export default Statics;
