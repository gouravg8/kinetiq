"use client"
import { authClient } from '@/lib/auth-client'
import { GoogleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'


const Signin = () => {
    const router = useRouter();
    const handleLogin = async () => {
        await authClient.signIn.social({ provider: "google" });
        router.push("/dashboard");
    }
    return (
        <div className="flex items-center justify-center h-[80vh]">
            <Button
                onClick={handleLogin}
                className="mx-auto"
                icon={<GoogleOutlined />}
                size='large'
            >
                Continue Sign In
            </Button>
        </div>
    )
}

export default Signin
