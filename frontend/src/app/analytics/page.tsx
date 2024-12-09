"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Card } from "@/components/ui/card";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = {};

const AnalyticsPage = (props: Props) => {
	const { user } = useUser();
	const [data, setData] = useState<any[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchData = async () => {
		if (!user) return;

		try {
			const response = await fetch(`http://localhost:8080/api/shifts/owner/${user.id}`);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const json = await response.json();
			setData(json);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [user]);

	const getAverageShiftLength = () => {
		if (!data) return 0;
		const totalLength = data.reduce((total, shift) => {
			return total + calculateShiftLength(shift.startTime, shift.endTime);
		}, 0);
		return totalLength / data.length;
	};

	const getAverageShiftWage = () => {
		if (!data) return 0;
		const totalWage = data.reduce((total, shift) => {
			return total + shift.cashTips + shift.creditTips;
		}, 0);
		return totalWage / data.length;
	};

	const calculateShiftLength = (startTime: string, endTime: string): number => {
		const start = new Date(startTime);
		const end = new Date(endTime);
		const diffInMillis = end.getTime() - start.getTime();
		return diffInMillis / (1000 * 60 * 60);
	};

	const getAverageShiftWageByDay = () => {
		if (!data) return {};

		const dayWages: { [key: string]: number[] } = {};
		data.forEach((shift) => {
			let dayOfWeekIndex = new Date(shift.date).getDay();

			if (dayOfWeekIndex === 0) {
				dayOfWeekIndex = 6;
			} else {
				dayOfWeekIndex -= 1;
			}

			const dayNames = [
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
				"Sunday",
				"Monday",
			];
			const dayOfWeek = dayNames[dayOfWeekIndex];

			if (!dayWages[dayOfWeek]) {
				dayWages[dayOfWeek] = [];
			}
			dayWages[dayOfWeek].push(shift.cashTips + shift.creditTips);
		});

		const averageByDay: { [key: string]: number } = {};
		for (const day in dayWages) {
			const totalWage = dayWages[day].reduce((total, wage) => total + wage, 0);
			averageByDay[day] = totalWage / dayWages[day].length;
		}

		return averageByDay;
	};

	const chartData = getAverageShiftWageByDay();
	const chartLabels = Object.keys(chartData);
	const chartValues = Object.values(chartData);

	const chartDataset = {
		labels: chartLabels,
		datasets: [
			{
				label: "Average Wage ($)",
				data: chartValues,
				backgroundColor: "#05CF1C",
				borderColor: "#05CF1C",
				borderWidth: 1,
			},
		],
	};

	return (
		<div className="p-8">
			{loading && <p>Loading...</p>}
			{error && <p className="text-red-500">Error: {error}</p>}
			<Card className="w-full max-w-[800px] text-lg space-y-2">
				<h2 className="text-lg font-bold mx-auto w-fit pt-4">Shift Analytics</h2>
				<p className="text-lg mx-auto w-fit">
					Avg shift length: {data ? getAverageShiftLength().toFixed(2) : "0"} hours
				</p>
				<p className="mx-auto w-fit">
					Average Shift Wage: ${data ? getAverageShiftWage().toFixed(2) : "0"}
				</p>

				<div className="mt-8" style={{ height: "400px", width: "100%" }}>
					<Chart
						type="bar"
						data={chartDataset}
						options={{
							responsive: true,
							plugins: {
								legend: {
									display: false,
								},
								title: {
									display: true,
									text: "Wage by Day of the Week",
								},
							},
							scales: {
								x: {
									grid: {
										display: false,
									},
								},
								y: {
									grid: {
										display: false,
									},
								},
							},
						}}
					/>
				</div>
			</Card>
		</div>
	);
};

export default AnalyticsPage;
