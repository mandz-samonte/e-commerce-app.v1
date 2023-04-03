import React from "react";
import Input from "../../components/Input";
import { PrimaryButton } from "../../components/Button";
import { Link } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";

export default function Register() {
    return (
        <AuthLayout>
            <h1 className="text-2xl font-semibold mb-5">Create your account</h1>

            <form className="flex flex-col gap-y-5">
                <Input label="Full Name" />
                <Input label="Email" />
                <Input label="Password" />

                <span className="text-xs text-center text-gray-400 my-3">
                    By proceeding to sign up, I acknowledge that I have read and consented blah blah blah{" "}
                    <a className="cursor-pointer">&lt; MY GITHUB PAGE &gt;</a>
                </span>

                <span className="text-sm">
                    Already a member? Login{" "}
                    <Link to="/login" className="font-semibold">
                        here
                    </Link>
                </span>

                <PrimaryButton>Register</PrimaryButton>
            </form>
        </AuthLayout>
    );
}
