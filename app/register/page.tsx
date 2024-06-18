'use client';

import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation'
import axios,{AxiosResponse } from 'axios';

interface RegistrationData {
    email: string;
    phoneNumber: string;
    fullName: string;
    birthDate: string;
    username: string;
    password: string;
}

export default function App() {
    const router = useRouter()
    const [email, setEmail] = useState('abc@gmai.com');
    const [phoneNumber, setPhoneNumber] = useState('0365326912');
    const [fullName, setFullName] = useState('Test');
    const [birthDate, setBirthDate] = useState('01/01/2002');
    const [username, setUsername] = useState('testuser');
    const [password, setPassword] = useState('testuser');

    const handleRegistration = async  () => {
        const formData = new FormData();
        
        try{
           const registrationData: RegistrationData = {
              email,
              phoneNumber,
              fullName,
              birthDate,
              username,
              password,
            };
           for (const key in registrationData) {
               formData.append(key, registrationData[key]);
           }
            const response: AxiosResponse<{ data: string }> = await axios.put('/api/auth', formData);
           console.log('Registration successful:', response.data);
            router.push('/login');
        } catch (error) {
        // Handle errors
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="flex flex-col items-start w-[80%] max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-4">Đăng ký</h1>
                <div className="mb-2 w-full">
                    <Input
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="max-w-full"
                    />
                </div>
                <div className="mb-2 w-full">
                    <Input
                        type="tel"
                        label="Số điện thoại"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="max-w-full"
                    />
                </div>
                <div className="mb-2 w-full">
                    <Input
                        type="text"
                        label="Họ và tên"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="max-w-full"
                    />
                </div>
                <div className="mb-2 w-full">
                    <Input
                        type="date"
                        label="Ngày sinh"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="max-w-full"
                        placeholder=" "
                        defaultValue=""
                    />
                </div>
                <div className="mb-2 w-full">
                    <Input
                        type="text"
                        label="Tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="max-w-full"
                    />
                </div>
                <div className="mb-2 w-full">
                    <Input
                        type="password"
                        label="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="max-w-full"
                    />
                </div>
                <div className="w-full flex flex-row">
                    <h4>Đã có tài khoản</h4>

                    <Button className="max-w-xs ml-auto" variant="ghost" onClick={()=>{router.push('/login')}} >
                        Đăng nhập
                    </Button>
                </div>
                <div className="w-full">
                    <Button size="lg" onClick={handleRegistration} className="max-w-xs">
                        Đăng ký
                    </Button>
                </div>
            </div>
        </div>
        );
}
