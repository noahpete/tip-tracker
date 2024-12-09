import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
	return (
		<div className="bg-[var(--background)]">
			<div className="p-8">
				<h1 className="p-8 text-4xl font-bold text-center">
					Keep track of your tips—analyze your income.
				</h1>
				<h2 className="text-center">
					Simplify the process of tracking tips and easily calculate your hourly wage and other
					income statistics.
				</h2>
				<div className="py-12 flex justify-center items-center">
					<SignedIn></SignedIn>
					<SignedOut>
						<SignUpButton>
							<Button className="bg-[#05CF1C]">Sign up for free</Button>
						</SignUpButton>
					</SignedOut>
				</div>
			</div>
		</div>
	);
}
