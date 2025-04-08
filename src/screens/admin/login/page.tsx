"use client"

import React, { useState } from "react";
import {useAdminLoginMutation} from "@/screens/admin/hooks/auth/useSendOtpMutation";
import {useAuthAdmin} from "@/provider/AdminAuthProvider";
import {useRouter} from "next/navigation";

export default function AdminLoginPage() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { mutateAsync: adminLogin } = useAdminLoginMutation();
    const { login } = useAuthAdmin();

    async function onSubmit() {
        setIsLoading(true);

        try {
            const response = await adminLogin({ email: phone, password });

            if (response?.data?.data.access_token && response?.data?.data.refresh_token) {
                login(response?.data?.data.access_token, response?.data?.data.refresh_token)
            }

            router.push("/admin/dashboard");

        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
            <div className="modal-container">
                <div className="modal-body">
                    <h3>Welcome back</h3>
                    <p>Enter your credentials to access your account</p>
                </div>
                <div>
                    <div className="form-group">
                        <label className="control-label">Email address</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="name@example.com"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control password-input"
                        />
                    </div>
                    <button
                        onClick={onSubmit}
                        className="continue-button"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing in..." : "Sign in"}
                    </button>
                </div>
            </div>
        </div>
    );
}