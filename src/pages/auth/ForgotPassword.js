import React from "react";
import AuthLayout from "../../layout/AuthLayout";
import Input from "../../components/Input";
import { PrimaryButton } from "../../components/Button";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    return (
        <AuthLayout>
            <h1 className="text-2xl font-semibold mb-5">Forgot Password</h1>

            <form className="flex flex-col gap-y-5">
                <Input placeholder="Please enter your email" label="Email" type="email" />

                <PrimaryButton>Send Email</PrimaryButton>

                <Link to="/login" className="mr-auto text-sm text-amber-500">
                    Back to Login
                </Link>
            </form>
        </AuthLayout>
    );
}
