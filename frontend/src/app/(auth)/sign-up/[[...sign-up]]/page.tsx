import { SignUp } from "@clerk/nextjs";
import React from "react";

type Props = {};

const SignUpPage = (props: Props) => {
	return (
		<div className="w-full">
			<div className="w-fit mx-auto my-4">
				<SignUp />
			</div>
		</div>
	);
};

export default SignUpPage;
