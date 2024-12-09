"use client";

import { Menu } from "lucide-react";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";

type Props = {};

export const Navbar = (props: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const closeSheet = () => setIsOpen(false);

	return (
		<div className="w-full border px-6 py-4 flex">
			<div className="flex mt-1">
				<div className="-mt-1 ml-1">
					<Link href="/">
						<Image
							src={"/tipper-icon.png"}
							alt="logo"
							width={32}
							height={32}
							className="mr-0.5 aspect-square"
						/>
					</Link>
				</div>
				<h1 className="font-medium text-2xl text-[#05CF1C]">tipper</h1>
			</div>
			<div className="ml-auto -mr-2">
				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<Button variant="ghost">
							<Menu style={{ width: "24px", height: "24px" }} />
						</Button>
					</SheetTrigger>
					<SheetContent className="font-bold space-y-8">
						<div>
							<Link href="/" onClick={closeSheet}>
								Home
							</Link>
						</div>
						<div>
							<Link href="/tips" onClick={closeSheet}>
								Tips
							</Link>
						</div>
						<div>
							<Link href="/analytics" onClick={closeSheet}>
								Analytics
							</Link>
						</div>
						<div className="bg-foreground h-0.5 rounded-full"></div>
						<div className="flex justify-center space-x-4">
							<SignedOut>
								<SignInButton>
									<Button variant="outline" className="text-[#05CF1C] outline outline-[#05CF1C]">
										Login
									</Button>
								</SignInButton>
								<SignUpButton>
									<Button className="bg-[#05CF1C]">Sign up</Button>
								</SignUpButton>
							</SignedOut>
							<SignedIn>
								<SignOutButton>
									<Button>Sign out</Button>
								</SignOutButton>
							</SignedIn>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
};
