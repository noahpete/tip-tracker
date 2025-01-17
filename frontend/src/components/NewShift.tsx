import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import TimePicker from "react-time-picker";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { useUser } from "@clerk/nextjs";

type Props = {
	onShiftCreated: () => void;
};

const NewShift = ({ onShiftCreated }: Props) => {
	const { user } = useUser();
	const [cash, setCash] = useState<number>(0);
	const [credit, setCredit] = useState<number>(0);
	const [startTime, setStartTime] = useState<string>("");
	const [endTime, setEndTime] = useState<string>("");
	const [date, setDate] = useState<Date>();
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);

	useEffect(() => {
		const now = new Date();
		const formattedTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
		setStartTime(formattedTime);
		setEndTime(formattedTime);
	}, []);

	const handleSubmit = async () => {
		if (!user) {
			alert("User not authenticated!");
			return;
		}

		if (!date || !startTime || !endTime) {
			alert("Please provide date, start time, and end time.");
			return;
		}

		const startDate = new Date(`${date.toISOString().split("T")[0]}T${startTime}:00`);
		const endDate = new Date(`${date.toISOString().split("T")[0]}T${endTime}:00`);

		if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
			alert("Invalid start or end time.");
			return;
		}

		const formattedDate = date.toISOString().split("T")[0];
		const formattedStartTime = startDate.toISOString();
		const formattedEndTime = endDate.toISOString();

		const formData = {
			owner: user.id,
			cashTips: cash,
			creditTips: credit,
			date: formattedDate,
			startTime: formattedStartTime,
			endTime: formattedEndTime,
			created: new Date().toISOString(),
			updated: new Date().toISOString(),
		};

		try {
			const response = await fetch("http://localhost:8080/api/shifts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				alert("Shift created successfully!");
				onShiftCreated();
				setDialogOpen(false);
			} else {
				alert("Failed to create shift.");
			}
		} catch (error) {
			console.error("Error submitting the form:", error);
			alert("An error occurred while creating the shift.");
		}
	};

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			{" "}
			<DialogTrigger asChild>
				<Button className="bg-[#05CF1C] font-bold text-xl" onClick={() => setDialogOpen(true)}>
					+
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[320px]">
				<DialogHeader>
					<DialogTitle>Add shift</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					{/* Form content */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="cash" className="text-right whitespace-nowrap">
							Cash
						</Label>
						<Input
							id="cash"
							type="number"
							className="col-span-3"
							onChange={(e) => setCash(parseFloat(e.target.value) || 0)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="credit" className="text-right whitespace-nowrap">
							Credit
						</Label>
						<Input
							id="credit"
							type="number"
							className="col-span-3"
							onChange={(e) => setCredit(parseFloat(e.target.value) || 0)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4 space-x-2">
						<Label htmlFor="time" className="text-right whitespace-nowrap">
							Start time
						</Label>
						<div className="col-span-3">
							<TimePicker
								disableClock
								clearIcon={null}
								value={startTime}
								onChange={(value) => setStartTime(value || "")}
							/>
						</div>
					</div>
					<div className="grid grid-cols-4 items-center gap-4 space-x-2">
						<Label htmlFor="time" className="text-right whitespace-nowrap">
							End time
						</Label>
						<div className="col-span-3">
							<TimePicker
								disableClock
								clearIcon={null}
								value={endTime}
								onChange={(value) => setEndTime(value || "")}
							/>
						</div>
					</div>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn(
									"w-[280px] justify-start text-left font-normal",
									!date && "text-muted-foreground"
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{date ? format(date, "PPP") : <span>Pick a date</span>}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
						</PopoverContent>
					</Popover>
				</div>
				<DialogFooter>
					<Button type="button" onClick={handleSubmit}>
						Create shift
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default NewShift;
