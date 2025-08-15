"use client"
import { Button } from 'antd'
import { createAuthClient } from 'better-auth/client'
import React from 'react'

const authClient = createAuthClient();

const Signin = () => {
    const handleLogin = async () => {
        await authClient.signIn.social({ provider: "google" });
    }
    return (
        <div>
            <Button onClick={handleLogin}>
                sign in
            </Button>
        </div>
    )
}

export default Signin