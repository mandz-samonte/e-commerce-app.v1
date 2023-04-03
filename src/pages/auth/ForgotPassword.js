import React from "react";
import AuthLayout from "../../layout/AuthLayout";
import Input from "../../components/Input";
import { PrimaryButton } from "../../components/Button";
import { Link } from "react-router-dom";
import useForm from "../../utils/useForm";
import { useState } from "react";
import { useAccount } from "../../providers/AccountProvider";
import useErrorMessage from "../../utils/useErrorMessage";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
    const { auth } = useAccount();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorCode] = useErrorMessage();
    const [form, setForm, submitForm, errors] = useForm({
        initialState: {
            email: "",
        },
        onSubmit: async (e) => {
            e.preventDefault();
            setLoading(true);
            const { email } = e.target.elements;

            try {
                let data = await sendPasswordResetEmail(auth, email.value);
                setLoading(false);
            } catch (e) {
                setLoading(false);
                console.log(e.code);
                console.log(e.message);
            }
        },
        validation: {
            email: {
                isRequired: true,
            },
        },
    });

    return (
        <AuthLayout>
            <h1 className="text-2xl font-semibold mb-5">Forgot Password</h1>

            <form onSubmit={submitForm} className="flex flex-col gap-y-5">
                <Input
                    onChange={(e) => setForm(e.target.name, e.target.value)}
                    placeholder="Please enter your email"
                    name="email"
                    label="Email"
                    type="email"
                    error={errors.email?.message}
                />

                <PrimaryButton loading={loading}>Send Email</PrimaryButton>

                <Link to="/login" className="mr-auto text-sm text-amber-500">
                    Back to Login
                </Link>
            </form>
        </AuthLayout>
    );
}
