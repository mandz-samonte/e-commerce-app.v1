import React from "react";
import AuthLayout from "../../layout/AuthLayout";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/Button";
import { useAccount } from "../../providers/AccountProvider";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import useErrorMessage from "../../utils/useErrorMessage";
import useForm from "../../utils/useForm";
import Alert from "../../components/Alert";

export default function Login() {
    const { auth } = useAccount();
    const navigate = useNavigate();
    const [errorMessage, setErrorCode] = useErrorMessage();

    const [loading, setLoading] = useState(false);

    const [form, setForm, submitForm, errors, resetForm] = useForm({
        initialState: {
            email: "",
            password: "",
        },
        onSubmit: async (e, data) => {
            e.preventDefault();
            const { email, password } = e.target.elements;
            setLoading(true);

            try {
                let user = await signInWithEmailAndPassword(auth, email.value, password.value);
                setLoading(false);
                navigate("/");
            } catch (e) {
                setErrorCode(e.code);
                setLoading(false);
            }
        },
        validation: {
            email: {
                isRequired: true,
            },
            password: {
                isRequired: true,
            },
        },
    });

    const onChangeForm = (e) => setForm(e.target.name, e.target.value);

    return (
        <AuthLayout>
            <h1 className="text-2xl font-semibold mb-5">Login</h1>

            <form onSubmit={submitForm} className="flex flex-col gap-y-5">
                <Input
                    onChange={onChangeForm}
                    placeholder="Please enter your email"
                    name="email"
                    label="Email"
                    type="email"
                    error={errors.email?.message}
                />
                <Input
                    onChange={onChangeForm}
                    placeholder="Please enter your password"
                    name="password"
                    label="Password"
                    type="password"
                    error={errors.password?.message}
                />

                {errorMessage && <Alert error>{errorMessage}</Alert>}

                <span className="text-sm">
                    New member? Register{" "}
                    <Link to="/register" className="font-semibold">
                        here
                    </Link>
                </span>

                <PrimaryButton type="submit" loading={loading}>
                    Login
                </PrimaryButton>

                <Link to="/forgot-password" className="ml-auto text-sm text-amber-500">
                    Forgot password?
                </Link>
            </form>
        </AuthLayout>
    );
}
