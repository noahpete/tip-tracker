"use client";

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

type Shift = {
	tips: number;
	date: string;
	start: string;
	end: string;
};

const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("en-US", {
		weekday: "long",
		month: "short",
		day: "numeric",
	}).format(date);
};

const formatTime = (dateString: string): string => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	}).format(date);
};

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
			{data?.map((shift: Shift) => (
				<Card className="p-2 py-3 flex">
					<div className="w-24 flex items-center justify-end text-2xl font-medium mr-2">
						{shift.tips.toFixed(2)}
					</div>
					<div>
						<p>{formatDate(shift.date)}</p>
						<p className="text-xs">
							{formatTime(shift.start)} - {formatTime(shift.end)}
						</p>
					</div>
				</Card>
			))}
		</div>
	);
}
