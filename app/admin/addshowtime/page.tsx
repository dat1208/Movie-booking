'use client';

import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation'
import axios,{AxiosResponse } from 'axios';
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/react";
import { movie } from '@/app/constants/models/movie'
import { AnyDateTime } from '@internationalized/date'
interface MovieShowTimeData {
    NGAY_GIO_CHIEU: Date | undefined,
    MA_PHIM: string
}

export default function App() {
    const router = useRouter();
    const [NGAY_GIO_CHIEU, setNGAYGIOCHIEU] = useState<Date>();
    const [TEN_PHIM, setTENPHIM] = useState('');
    const [MA_PHIM, setMAPHIM] = useState('');
    const [movies, setMovies] = useState<movie[]>([]);
    const [loadingGenres, setLoadingGenres] = useState(true);
    const [alert, setAlert] = useState('');

    function resetForm(){
        setTENPHIM('');
    }
    
    const handleAddShowTime = async () => {
        const formData = new FormData();
        try {
            const movieData: MovieShowTimeData = {
                NGAY_GIO_CHIEU,
                MA_PHIM,
            };
            for (const key in movieData) {
                formData.append(key, movieData[key]);
                console.log(formData.get(key));
                
            }
            
            const response: AxiosResponse<{ data: { message: string, imagePath: string } }> = await axios.put('/api/movieshowtime', formData);
            console.log('Movie insertion successful:', response.data);
            setAlert('Thêm thành công');
            resetForm();

        } catch (error) {
            
            setAlert('Thêm thất bại, thử lại');

        }
    };
    
    React.useEffect(() => {
        axios.get('/api/movies')
            .then(response => {
                setMovies(response.data.data)
                console.log(response.data.data);
                setLoadingGenres(false);
            })
            .catch(error => {
                console.error('Error fetching movie genres:', error);
                setLoadingGenres(false);
            });
    }, []);
    return (
        <div className="flex items-center justify-center mt-10">
            <div className="flex flex-col items-start w-[80%] max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-4">Thêm lịch chiếu</h1>
                <h1 className="text-xl font-bold mb-2">{alert}</h1>
                <div className="mb-2">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                                >
                                Chọn phim cần thêm lịch chiếu
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Movie Genres">
                            {movies.map(movie => (
                                <DropdownItem onClick={()=>{setMAPHIM(movie.MA_PHIM.toString()); setTENPHIM(movie.TEN_PHIM)}} key={movie.MA_PHIM}>{movie.TEN_PHIM}</DropdownItem>
                                ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
               
                <div className="mb-2 w-full">
                    <Input
                        isDisabled
                        type="text"
                        label="Tên phim"
                        value={TEN_PHIM}
                        onChange={(e) => setTENPHIM(e.target.value)}
                        className="max-w-full"
                    />
                </div>
                <div className="mb-2 w-full">
                    <Input
                        type="datetime-local"
                        onChange={(e) => setNGAYGIOCHIEU(e.target.value)}
                        className="max-w-full"
                    />
                </div>
                <div className="mb-2 w-full justify-start flex">
              
                </div>
                <div className="w-full">
                    <Button size="lg" onClick={handleAddShowTime} className="max-w-xs">
                        Thêm lịch chiếu
                    </Button>
                </div>
            </div>
        </div>
    );
}
