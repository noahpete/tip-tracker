import { Menu } from "lucide-react";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import Image from "next/image";

type Props = {};

export const Navbar = (props: Props) => {
	return (
		<div className="w-full border px-6 py-4 flex">
			<div className="flex mt-1">
				<div className="-mt-1 ml-1">
					<Image
						src={"/tipper-icon.png"}
						alt="logo"
						width={32}
						height={32}
						className="mr-0.5 aspect-square"
					/>
				</div>
				<h1 className="font-medium text-2xl text-[#05CF1C]">tipper</h1>
			</div>
			<div className="ml-auto -mr-2">
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="ghost">
							<Menu style={{ width: "24px", height: "24px" }} />
						</Button>
					</SheetTrigger>
					<SheetContent className="font-bold space-y-8">
						<p>Home</p>
						<p>Tips</p>
						<p>Analytics</p>
						<div className="bg-foreground h-0.5 rounded-full"></div>
						<div className="flex justify-center space-x-4">
							<Button variant="outline" className="text-[#05CF1C] outline outline-[#05CF1C]">
								Login
							</Button>
							<Button className="bg-[#05CF1C]">Sign up</Button>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
};
