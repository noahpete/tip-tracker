import { ChevronDown } from "lucide-react";
import { Card } from "./ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Shift = {
	cashTips: number;
	creditTips: number;
	date: string;
	start: string;
	end: string;
};

type Props = {
	shift: Shift;
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

const calculateHoursWorked = (start: string, end: string): number => {
	const startTime = new Date(start).getTime();
	const endTime = new Date(end).getTime();
	const hoursWorked = (endTime - startTime) / (1000 * 60 * 60);
	return hoursWorked;
};

const calculateHourlyWage = (tips: number, start: string, end: string): string => {
	const hoursWorked = calculateHoursWorked(start, end);
	return hoursWorked > 0 ? "$" + (tips / hoursWorked).toFixed(2) : ">$1000";
};

export const Shift = (props: Props) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	return (
		<Card
			className={cn(
				"p-2 py-3 transition-all duration-500 overflow-hidden",
				isExpanded ? "max-h-36" : "max-h-16"
			)}
		>
			<div className="flex">
				<div className="w-24 flex items-center justify-end text-2xl font-medium mr-2">
					{(props.shift.cashTips + props.shift.creditTips).toFixed(2)}
				</div>
				<div>
					<p>{formatDate(props.shift.date)}</p>
					<p className="text-xs">
						{formatTime(props.shift.start)} - {formatTime(props.shift.end)}
					</p>
				</div>
				<div className="ml-auto items-center flex cursor-pointer">
					<ChevronDown
						className={cn("transition-all duration-500", isExpanded ? "-scale-y-100" : "")}
						onClick={() => setIsExpanded(!isExpanded)}
					/>
				</div>
			</div>
			<div className="mt-2 px-4 text-xs flex items-center w-fit ml-auto mr-auto space-x-4">
				<div>
					<p>Cash tips: {props.shift.cashTips.toFixed(2)}</p>
					<p>Credit tips: {props.shift.creditTips.toFixed(2)}</p>
				</div>
				<div>
					<p>Hours worked: {calculateHoursWorked(props.shift.start, props.shift.end).toFixed(2)}</p>
					<p>
						Hourly:{" "}
						{calculateHourlyWage(
							props.shift.cashTips + props.shift.creditTips,
							props.shift.start,
							props.shift.end
						)}{" "}
						/hr
					</p>
				</div>
			</div>
		</Card>
	);
};
