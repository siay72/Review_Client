/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import CardMetric from "@/components/admin/CardMetric";
import { useEffect, useState, } from "react";
import Link from "next/link";
import {
    MessageSquare,
  Package,
  Star,
  Users,

} from "lucide-react";
import toast from "react-hot-toast";


export default function DashboardPage() {


  
const [dashboardData, setDashboardData] = useState({
  totalProducts: 0,
  totalReviews: 0,
  totalUsers: 0,
  averageRating: 0,
  recentReviews: [],
});


// Fetch dashboard data on mount

useEffect(() => {
  async function loadDashboard() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://review-project-backend.onrender.com/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("Dashboard API:", data);
      setDashboardData(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard");
    }
  }

  loadDashboard();
}, []);

  return (

    <div className="p-6">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl text-black font-bold">
          Dashboard Overview
        </h1>

        
      </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <CardMetric
        title="Products"
        value={dashboardData.totalProducts}
        icon={<Package />}
        color="blue"
        />

        <CardMetric
        title="Reviews"
        value={dashboardData.totalReviews}
        icon={<MessageSquare/>}
        color="amber"
        />

        <CardMetric
        title="Users"
        value={dashboardData.totalUsers}
        icon={<Users />}
        color="green"
        />

        <CardMetric
        title="Average Rating"
        value={dashboardData.averageRating}
        icon={<Star/>}
        color="purple"
        />

        </div>

       <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-6">

        {/* Recent Reviews */}
          <div
            className="
            xl:col-span-8
            bg-white
            rounded-xl
            shadow
            p-4
            md:p-6
            "
          >

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-xl md:text-2xl font-bold text-[#002253]">
              Recent Reviews
            </h2>

            <Link
              href="/admin/reviews"
              className="
              text-sm
              font-medium
              text-blue-600
              hover:text-blue-800
              "
            >
              View All
            </Link>

          </div>

          <div className="space-y-4">
            <div
              className="
              hidden lg:grid
              lg:grid-cols-[2fr_1fr_1fr_140px]
              gap-6
              px-4
              pb-3
              text-xs
              font-semibold
              text-gray-500
              uppercase
              "
            >
              <div>Reviewer</div>
              <div>Product</div>
              <div>Rating</div>
              <div>Date</div>
            </div>

            {dashboardData.recentReviews?.map(
              (item: any) => (

                <div
                  key={item._id}
                  className="
                  grid
                  grid-cols-1
                  lg:grid-cols-[2fr_1fr_1fr_140px]
                  gap-4
                  items-center
                  p-4
                  rounded-xl
                  border
                  border-slate-200
                  hover:bg-slate-50
                  transition-all
                  "
                >

                  {/* User */}
                  <div
                    className="
                    flex
                    items-center
                    gap-4
                    min-w-0
                    "
                  >

                    <div
                      className="
                      w-12
                      h-12
                      rounded-full
                      bg-[#002253]
                      text-white
                      flex
                      items-center
                      justify-center
                      font-bold
                      shrink-0
                      "
                    >
                      {item.user?.charAt(0)}
                    </div>

                    <div className="min-w-0">

                      <h3 className="font-semibold text-base text-[#002253] truncate">
                        {item.user}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {item.email}
                      </p>

                    </div>

                  </div>

                  {/* Product */}
                  <div className="min-w-0 text-black">
                    <p className="font-sm text-base truncate">
                      {item.product}
                    </p>

                    <p className="font-medium truncate text-[#002253]">
                      {item.productCategory}
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="min-w-0">
                    <p className=" text-black text-sm">
                      {"⭐".repeat(item.rating)}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="justify-self-start lg:justify-self-end">
                    <span className="text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>

                </div>

              )
            )}

          </div>

        </div>

        {/* Analytics */}
        <div
          className="
          xl:col-span-4
          bg-white
          rounded-xl
          shadow
          p-4
          "
        >

        </div>

      </div>

    </div>

    

  );
}