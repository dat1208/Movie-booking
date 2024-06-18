'use client';

import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation'
import axios,{AxiosResponse } from 'axios';
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/react";
import { movie } from '@/app/constants/models/movie'

export default function App() {
    const router = useRouter();
    const [LOAI_PHIM, setLOAIPHIM] = useState('');
    const [alert, setAlert] = useState('');

    function resetForm(){
        setLOAIPHIM('');
    }
    
    const handleAddCategory = async () => {
        const formData = new FormData();
        try {
            formData.append("TEN_LOAI_PHIM",LOAI_PHIM);
            const response: AxiosResponse<{ data: { message: string } }> = await axios.put('/api/category', formData);
            console.log('Movie insertion successful:', response.data);
            setAlert('Thêm thành công');
            resetForm();

        } catch (error) {
            
            setAlert('Thêm thất bại, thử lại');

        }
    };
    
    return (
        <div className="flex items-center justify-center mt-10">
            <div className="flex flex-col items-start w-[80%] max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-4">Thêm thể loại phim</h1>
                <h1 className="text-xl font-bold mb-2">{alert}</h1>

               
                <div className="mb-2 w-full">
                    <Input
                        type="text"
                        label="Tên loại phim"
                        value={LOAI_PHIM}
                        onChange={(e) => setLOAIPHIM(e.target.value)}
                        className="max-w-full"
                    />
                </div>
                <div className="mb-2 w-full justify-start flex">
              
                </div>
                <div className="w-full">
                    <Button size="lg" onClick={handleAddCategory} className="max-w-xs">
                        Thêm
                    </Button>
                </div>
            </div>
        </div>
    );
}
