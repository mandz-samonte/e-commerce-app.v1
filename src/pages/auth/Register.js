import React from "react";
import Input from "../../components/Input";
import { PrimaryButton } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAccount } from "../../providers/AccountProvider";
import useErrorMessage from "../../utils/useErrorMessage";
import useForm from "../../utils/useForm";

export default function Register() {
    const { auth } = useAccount();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorCode] = useErrorMessage();

    const [form, setForm, submitForm, errors, resetForm] = useForm({
        initialState: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit: async (e, data) => {
            e.preventDefault();
            const { fullName, email, password } = e.target.elements;
            setLoading(true);

            try {
                let newUserAccount = await createUserWithEmailAndPassword(auth, email.value, password.value);

                let updatedUserAccount = await updateProfile(newUserAccount, {
                    fullName: fullName.value,
                });

                setLoading(false);
                navigate("/");
            } catch (e) {
                setErrorCode(e.code);
                setLoading(false);
            }
        },
        validation: {
            fullName: {
                isRequired: true,
            },
            email: {
                isRequired: true,
                isEmail: true,
            },
            password: {
                isRequired: true,
            },
        },
    });

    const onChangeForm = (e) => setForm(e.target.name, e.target.value);

    return (
        <AuthLayout>
            <h1 className="text-2xl font-semibold mb-5">Create your account</h1>

            <form onSubmit={submitForm} className="flex flex-col gap-y-5">
                <Input
                    onChange={onChangeForm}
                    placeholder="Please input your full name"
                    label="Full Name"
                    name="fullName"
                    error={errors.fullName?.message}
                />
                <Input
                    onChange={onChangeForm}
                    placeholder="Please input your email"
                    label="Email"
                    name="email"
                    error={errors.email?.message}
                />
                <Input
                    onChange={onChangeForm}
                    placeholder="Please input your strong password"
                    type="password"
                    label="Password"
                    name="password"
                    error={errors.password?.message}
                />

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

                <PrimaryButton loading={loading}>Register</PrimaryButton>
            </form>
        </AuthLayout>
    );
}
