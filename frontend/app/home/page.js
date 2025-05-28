"use client";

import LayoutDashboard from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function DashBoardPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const metrics = [
    {
      title: "Total Notes",
      value: 245,
      icon: "📝",
      color: "bg-gradient-to-r from-teal-500 to-teal-700",
      delay: "delay-100",
    },
    {
      title: "Pinned Notes",
      value: 32,
      icon: "📌",
      color: "bg-gradient-to-r from-teal-600 to-teal-800",
      delay: "delay-200",
    },
    {
      title: "Last 7 Days Activity",
      value: 85,
      icon: "📊",
      color: "bg-gradient-to-r from-teal-700 to-teal-900",
      delay: "delay-300",
    },
  ];

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Notes Created",
        data: [10, 15, 20, 18, 25, 22, 30],
        borderColor: "#2dd4bf", // Teal-based color from your theme
        backgroundColor: "rgba(45, 212, 191, 0.2)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#374151",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#6B7280",
        },
      },
      x: {
        ticks: {
          color: "#6B7280",
        },
      },
    },
  };

  return (
    <LayoutDashboard>
      <div className="p-6">
        {/* Header */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-500 to-blue-600 text-transparent bg-clip-text mb-8">
          Dashboard Overview
        </h1>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className={`bg-teal-600 rounded-lg shadow-lg p-6 text-white transform transition duration-500 hover:scale-105 opacity-0 ${
                loaded ? `animate-fade-in-up ${metric.delay}` : ""
              }`}
            >
              <div className="text-4xl mb-2">{metric.icon}</div>
              <h3 className="text-lg font-medium">{metric.title}</h3>
              <p className="text-3xl font-extrabold mt-1">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Weekly Activity</h2>
          <div className="relative h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-teal-600 rounded-lg shadow-lg text-white p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">Create New Note</h3>
            <p className="mb-4">Start writing your next idea or task.</p>
            <a
              href="/new"
              className="inline-block bg-white text-teal-600 px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Get Started
            </a>
          </div>
          <div className="bg-teal-700 rounded-lg shadow-lg text-white p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">View All Notes</h3>
            <p className="mb-4">Check out your saved notes.</p>
            <a
              href="/notes"
              className="inline-block bg-white text-teal-700 px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Explore Now
            </a>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
}