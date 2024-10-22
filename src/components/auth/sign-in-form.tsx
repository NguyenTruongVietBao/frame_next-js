'use client'

import {LoginSchema} from "@/schemas/zod";
import React, {useState} from "react";
import Link from "next/link";
import {login, loginSocial} from "@/actions/login";
import {useRouter} from "next/navigation";
import {ErrorForm} from "@/components/error-form";
import {Button} from "@/components/ui/button";

export function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        const values = { email, password };
        const validationResult = LoginSchema.safeParse(values);
        if (!validationResult.success) {
            const errorMessage = validationResult.error.errors[0]?.message;
            setError(errorMessage);
            setIsLoading(false);
            return;
        }
        try {
            const loginResponse = await login({email, password});
            if (loginResponse?.success) {
                router.push("/");
            } else {
                setError("Invalid credentials");
            }
        } catch {
            setError("An unexpected error occurred. Please try again later.");
        }
        setIsLoading(false);
    };
    return (
        <div className={'w-[500px] border-2 flex flex-col'}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border border-gray-300 p-2 rounded w-full"
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
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>
                <div>
                    <Link href={'/forgot-password'}>Forgot password</Link>
                </div>
                <ErrorForm message={error}/>
                <Button type={"submit"} disabled={isLoading}>
                    {isLoading ? 'Logging...' : 'Login   '}
                </Button>
            </form>
            <button onClick={() => loginSocial("github")}>
                Sign In GitHub
            </button>
            <button onClick={() => loginSocial("google")}>
                Sign In Google
            </button>
        </div>
    )
}