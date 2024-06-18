'use client';

import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation'
import axios,{AxiosResponse } from 'axios';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage';
import { document } from 'postcss'

export default function App() {
    const router = useRouter()
    const [username, setUsername] = useState('testuser');
  const [password, setPassword] = useState('testuser');
  const [errorMessage, setErrorMessage] = useState('');
  
  
  const handleLogin = async  () => {
      try{
          // Your login logic here
          const formData = new FormData();
          formData.append('username', username);
          formData.append('password', password);
          

          const response = await axios.post('/api/auth', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
          
          if(response.data.token){
              saveToLocalStorage('token', response.data.token);
              console.log('saved token');
              router.push('/');
          }
      }
       catch (error) {
          setErrorMessage('Sai tài khoản hoặc mật khẩu');
      }
  };

  return (
      <div className="flex items-center justify-center mt-10">
          <div className="flex flex-col items-start w-[80%] max-w-md mx-auto">
              <h1 className="text-2xl font-bold mb-4">Đăng nhập</h1>
              <h1 id="alert-text" className="text-xl font-bold mb-2">
                  {errorMessage}
              </h1>
              <div className="mb-2 w-full">
                  <Input
                      type="text"
                      label="Tên tài khoản"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="max-w-full"
                  />
              </div>
              <div className="mb-4 w-full ">
                  <Input
                      type="password"
                      label="Mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="max-w-full"
                  />
              </div>
              <div className="w-full flex flex-row">
                  <h4>Chưa có tài khoản</h4>

                  <Button className="max-w-xs ml-auto" variant="ghost" onClick={()=>{router.push('/register')}} >
                      Đăng ký
                  </Button>
              </div>
              <div className="w-full mb-1">
                  <Button size="lg" onClick={handleLogin} className="max-w-xs">
                      Đăng nhập
                  </Button>
                  
              </div>
              
              
          </div>
      </div>
      );
}
