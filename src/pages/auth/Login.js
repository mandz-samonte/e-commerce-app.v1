import React from "react";
import AuthLayout from "../../layout/AuthLayout";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../../components/Button";

export default function Login() {
    return (
        <AuthLayout>
            <h1 className="text-2xl font-semibold mb-5">Login</h1>

            <form className="flex flex-col gap-y-5">
                <Input placeholder="Please enter your email" label="Email" type="email" />
                <Input placeholder="Please enter your password" label="Password" type="password" />

                <span className="text-sm">
                    New member? Register{" "}
                    <Link to="/register" className="font-semibold">
                        here
                    </Link>
                </span>

                <PrimaryButton>Login</PrimaryButton>

                <Link to="/forgot-password" className="ml-auto text-sm text-amber-500">
                    Forgot password?
                </Link>
            </form>
        </AuthLayout>
    );
}
