"use client";

import { Shift } from "@/components/Shift";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const EXAMPLE_DATA = [
	{
		id: 1,
		tips: 18.2,
		date: "2024-12-08",
		start: "2024-12-08T15:30:00.000Z",
		end: "2024-12-08T19:45:00.000Z",
		createdAt: "2024-12-06T21:02:39.899275",
		updatedAt: "2024-12-06T21:02:39.899275",
	},
	{
		id: 2,
		tips: 75.4,
		date: "2024-12-10",
		start: "2024-12-10T20:15:00.000Z",
		end: "2024-12-10T23:30:00.000Z",
		createdAt: "2024-12-06T21:02:39.899275",
		updatedAt: "2024-12-06T21:02:39.899275",
	},
	{
		id: 3,
		tips: 115.7,
		date: "2024-12-11",
		start: "2024-12-11T16:00:00.000Z",
		end: "2024-12-11T21:00:00.000Z",
		createdAt: "2024-12-06T21:02:39.899275",
		updatedAt: "2024-12-06T21:02:39.899275",
	},
	{
		id: 4,
		tips: 78.6,
		date: "2024-12-12",
		start: "2024-12-12T18:45:00.000Z",
		end: "2024-12-12T23:59:00.000Z",
		createdAt: "2024-12-06T21:02:39.899275",
		updatedAt: "2024-12-06T21:02:39.899275",
	},
];

export default function TipsPage() {
	const [data, setData] = useState<any | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:8080");
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const json = await response.json();
				setData(json);
				console.log(json);
			} catch (err) {
				setError((err as Error).message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="p-8 space-y-2">
			{EXAMPLE_DATA?.map((shift) => (
				<Shift shift={shift} />
			))}
		</div>
	);
}
