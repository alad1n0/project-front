"use client";

import React, { useState } from "react";

export default function AdminLoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit() {

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
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="********"
                            className="form-control password-input"
                        />
                    </div>
                    <button className="continue-button">Sign in</button>
                </div>
            </div>
        </div>
    );
}