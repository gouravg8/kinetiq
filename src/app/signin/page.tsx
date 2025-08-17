"use client"
import { authClient } from '@/lib/auth-client'
import { GoogleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'


const Signin = () => {
    const handleLogin = async () => {
        await authClient.signIn.social({ provider: "google" });
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <Button
                onClick={handleLogin}
                className="mx-auto"
                icon={<GoogleOutlined />}
            >
                Continue Sign In
            </Button>
        </div>
    )
}

export default Signin
