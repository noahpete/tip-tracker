import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Rubik } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

const rubik = Rubik({
	subsets: ["latin"],
	variable: "--font-rubik",
	weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
	title: "Tipper: Tip Tracker",
	description: "A tip tracking app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider
		// appearance={{
		// 	baseTheme: dark,
		// }}
		>
			<html lang="en">
				<body className={`${rubik.className} antialiased`}>
					<Navbar />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
