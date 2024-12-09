"use client";

import { ChevronDown, EllipsisIcon } from "lucide-react";
import { Card } from "./ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

type Shift = {
	id: number;
	cashTips: number;
	creditTips: number;
	date: string;
	startTime: string;
	endTime: string;
};

type Props = {
	shift: Shift;
	onDelete: (id: number) => void;
	onShiftSave: () => void;
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
	// Try to create a Date object and check if it's valid
	const date = new Date(dateString + "Z"); // Assumes the time string is in a valid ISO format or with Z for UTC
	if (isNaN(date.getTime())) {
		console.log(`Invalid date string: [${dateString}]`);
		return ""; // Return an empty string if invalid date
	}

	try {
		return new Intl.DateTimeFormat("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		}).format(date);
	} catch (error) {
		console.log(`Failed to format time for [${dateString}]`, error);
		return ""; // Return an empty string if formatting fails
	}
};

const calculateHoursWorked = (start: string, end: string): number => {
	// Add a default date to the time strings to ensure they are recognized properly
	const startTime = new Date(`1970-01-01T${start}:00Z`).getTime(); // Appending 'Z' for UTC
	const endTime = new Date(`1970-01-01T${end}:00Z`).getTime(); // Same for end time

	// Check if the times are valid
	if (isNaN(startTime) || isNaN(endTime)) {
		console.log(`Invalid start or end time: ${start} - ${end}`);
		return 0; // Return 0 if time is invalid
	}

	// Calculate hours worked
	const hoursWorked = (endTime - startTime) / (1000 * 60 * 60); // Convert milliseconds to hours

	// Ensure hours worked is non-negative
	return hoursWorked >= 0 ? hoursWorked : 0;
};

const calculateHourlyWage = (tips: number, start: string, end: string): string => {
	const hoursWorked = calculateHoursWorked(start, end);
	return hoursWorked > 0 ? "$" + (tips / hoursWorked).toFixed(2) : ">$1000";
};

export const Shift = ({ shift, onDelete, onShiftSave }: Props) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editableShift, setEditableShift] = useState<Shift>(shift);

	const handleInputChange = (field: keyof Shift, value: string | number) => {
		setEditableShift((prev) => ({
			...prev,
			[field]: typeof value === "number" ? value : String(value),
		}));
	};

	const handleSave = async (shiftId: number, newShift: Shift) => {
		const startDate = new Date(`${newShift.date.split("T")[0]}T${newShift.startTime}:00`);
		const endDate = new Date(`${newShift.date.split("T")[0]}T${newShift.endTime}:00`);

		if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
			alert("Invalid start or end time.");
			return;
		}

		const formattedStartTime = startDate.toISOString();
		const formattedEndTime = endDate.toISOString();

		const formData = {
			cashTips: newShift.cashTips,
			creditTips: newShift.creditTips,
			date: newShift.date,
			startTime: formattedStartTime,
			endTime: formattedEndTime,
			updated: new Date().toISOString(),
		};

		try {
			const response = await fetch(`http://localhost:8080/api/shifts/${shiftId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				alert("Shift saved successfully!");
				onShiftSave();
			} else {
				alert("Failed to edit shift.");
			}
		} catch (error) {
			console.error("Error submitting the form:", error);
			alert("An error occurred while editing the shift.");
		}
	};

	const handleDelete = async (shiftId: number) => {
		try {
			const response = await fetch(`http://localhost:8080/api/shifts/${shiftId}`, {
				method: "DELETE",
			});

			if (response.ok) {
				alert("Shift deleted successfully!");
			} else {
				alert("Failed to delete shift.");
			}
		} catch (error) {
			console.error("Error submitting the form:", error);
			alert("An error occurred while deleting the shift.");
		}
	};

	return (
		<Card
			className={cn(
				"p-2 py-3 transition-all duration-500 overflow-hidden",
				isExpanded ? "max-h-60" : "max-h-16"
			)}
		>
			<div className="flex">
				<div className="w-24 flex items-center justify-end text-2xl font-medium mr-2">
					{(editableShift.cashTips + editableShift.creditTips).toFixed(2)}
				</div>
				<div>
					{!isEditing ? (
						<>
							<p>{formatDate(editableShift.date)}</p>
							<p className="text-xs">
								{formatTime(shift.startTime)} - {formatTime(shift.endTime)}
							</p>
						</>
					) : (
						<>
							<input
								type="date"
								value={editableShift.date}
								onChange={(e) => handleInputChange("date", e.target.value)}
								className="border rounded px-2 py-1 text-xs"
							/>
							<div className="flex space-x-2 mt-1">
								<input
									type="time"
									value={editableShift.startTime}
									onChange={(e) => handleInputChange("startTime", e.target.value)}
									className="border rounded px-2 py-1 text-xs"
								/>
								<input
									type="time"
									value={editableShift.endTime}
									onChange={(e) => handleInputChange("endTime", e.target.value)}
									className="border rounded px-2 py-1 text-xs"
								/>
							</div>
						</>
					)}
				</div>
				<div className="ml-auto items-center flex cursor-pointer">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<EllipsisIcon className="scale-75 mr-2" />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								onClick={() => {
									setIsEditing(!isEditing);
									setIsExpanded(true);
								}}
							>
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									setIsEditing(false);
									onDelete(shift.id);
								}}
							>
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<ChevronDown
						className={cn("transition-all duration-500", isExpanded ? "-scale-y-100" : "")}
						onClick={() => setIsExpanded(!isExpanded)}
					/>
				</div>
			</div>
			<div className="mt-2 px-4 text-xs flex items-center w-fit ml-auto mr-auto space-x-4">
				{!isEditing ? (
					<>
						<div>
							<p>Cash tips: {editableShift.cashTips.toFixed(2)}</p>
							<p>Credit tips: {editableShift.creditTips.toFixed(2)}</p>
						</div>
						<div>
							<p>
								Hours worked:{" "}
								{calculateHoursWorked(editableShift.startTime, editableShift.endTime).toFixed(2)}
							</p>
							<p>
								Hourly:{" "}
								{calculateHourlyWage(
									editableShift.cashTips + editableShift.creditTips,
									editableShift.startTime,
									editableShift.endTime
								)}{" "}
								/hr
							</p>
						</div>
					</>
				) : (
					<>
						<div>
							<label>Cash Tips</label>
							<input
								type="number"
								value={editableShift.cashTips}
								onChange={(e) => handleInputChange("cashTips", Number(e.target.value))}
								className="border rounded px-2 py-1"
							/>
						</div>
						<div>
							<label>Credit Tips</label>
							<input
								type="number"
								value={editableShift.creditTips}
								onChange={(e) => handleInputChange("creditTips", Number(e.target.value))}
								className="border rounded px-2 py-1"
							/>
						</div>
					</>
				)}
			</div>
			{isEditing && (
				<div className="mt-2 flex justify-center space-x-2">
					<Button
						onClick={() => {
							handleSave(shift.id, editableShift);
							setIsEditing(false);
						}}
					>
						Save
					</Button>
					<Button variant="outline" onClick={() => setIsEditing(false)}>
						Cancel
					</Button>
				</div>
			)}
		</Card>
	);
};
