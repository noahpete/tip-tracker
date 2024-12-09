"use client";

import NewShift from "@/components/NewShift";
import { Shift } from "@/components/Shift";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function TipsPage() {
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
			console.log(json);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [user]);

	const handleDelete = async (id: number) => {
		try {
			const response = await fetch(`http://localhost:8080/api/shifts/${id}`, {
				method: "DELETE",
			});
			if (!response.ok) {
				throw new Error(`Failed to delete shift with id: ${id}`);
			}
			setData((prevData) => prevData?.filter((shift) => shift.id !== id) || null);
		} catch (err) {
			console.error("Error deleting shift:", err);
		}
	};

	const refreshData = () => {
		fetchData();
	};

	return (
		<div className="p-8 space-y-2 w-full">
			<div className="mx-auto w-fit">
				<NewShift onShiftCreated={refreshData} />
			</div>
			{loading && <p>Loading...</p>}
			{error && <p className="text-red-500">Error: {error}</p>}
			{data?.map((shift) => (
				<Shift key={shift.id} shift={shift} onDelete={handleDelete} onShiftSave={refreshData} />
			))}
		</div>
	);
}
