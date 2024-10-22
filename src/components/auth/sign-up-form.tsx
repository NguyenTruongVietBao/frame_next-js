'use client'

import { signIn } from "next-auth/react"
import {RegisterSchema} from "@/schemas/zod";
import React, {useState} from "react";
import Link from "next/link";
import {register} from "@/actions/register";
import {ErrorForm} from "@/components/error-form";
import {SuccessForm} from "@/components/success-form";

export function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const values = { name, email, password };
        const validationResult = RegisterSchema.safeParse(values);

        if (!validationResult.success) {
            // Extracting the first validation error message
            const errorMessage = validationResult.error.errors[0]?.message;
            setError(errorMessage);
            return;
        }

        try {
            const response = await register(values);

            if (response.error) {
                setError(response.error);
            } else if (response.success) {
                setSuccess(response.success);
            }
        } catch {
            setError("An unexpected error occurred. Please try again later.");
        }
    };
    return (
        <div className={'w-[500px] border-2 flex flex-col'}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <ErrorForm message={error}/>
                <SuccessForm message={success}/>
                <button type="submit">Register</button>

            </form>
            <Link href={'/sign-in'}>Already account</Link>
            <button onClick={() => signIn("github", {redirectTo: "/settings"})}>
                Sign In GitHub
            </button>
            <button onClick={() => signIn("google", {redirectTo: "/settings"})}>
                Sign In Google
            </button>
        </div>
    )
}