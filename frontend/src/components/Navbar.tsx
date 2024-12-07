import { Menu } from "lucide-react";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

type Props = {};

export const Navbar = (props: Props) => {
	return (
		<div className="w-full border px-6 py-4 flex">
			<h1 className="font-bold text-2xl">tipper</h1>
			<div className="ml-auto -mr-2">
				<Sheet>
					<SheetTrigger>
						<Button variant="ghost">
							<Menu style={{ width: "24px", height: "24px" }} />
						</Button>
					</SheetTrigger>
					<SheetContent>
						<p>Home</p>
						<p>Tips</p>
						<p>Analytics</p>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
};
