'use client';

import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation'
import axios,{AxiosResponse } from 'axios';
import {Image} from "@nextui-org/react";
import { UploadButton } from '../../utils/uploadthing';
import "@uploadthing/react/styles.css";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/react";
// ... (existing imports)

interface MovieData {
    THOI_GIAN_PHIM: string;
    TEN_PHIM: string;
    THONG_TIN_PHIM: string;
    HINH_ANH: string;
    MA_LOAI_PHIM: string;
    GIA_PHIM: number;
    TRAILER: string
}


interface movieGenres {
    MA_LOAI_PHIM: number;
    TEN_LOAI_PHIM: string;
}

export default function App() {
    const router = useRouter();
    const [THOI_GIAN_PHIM, setTHOIGIANPHIM] = useState('');
    const [TEN_PHIM, setTENPHIM] = useState('');
    const [THONG_TIN_PHIM, setTHONGTINPHIM] = useState('');
    const [HINH_ANH, setHINHANH] = useState('');
    const [MA_LOAI_PHIM, setMALOAIPHIM] = useState('');
    const [GIA_PHIM, setGIAPHIM] = useState<number>();
    const [TRAILER, setTRAILER] = useState('');
    const [movieGenres, setMovieGenres] = useState<movieGenres[]>([]);
    const [loadingGenres, setLoadingGenres] = useState(true);
    const [alert, setAlert] = useState('');

    function resetForm(){
        setGIAPHIM(0);
        setHINHANH('');
        setTENPHIM('');
        setTHOIGIANPHIM('');
        setTHONGTINPHIM('');
        setTRAILER('');
    }
    
    const handleMovieInsertion = async () => {
        const formData = new FormData();

        try {
            const movieData: MovieData = {
                THOI_GIAN_PHIM,
                TEN_PHIM,
                THONG_TIN_PHIM,
                HINH_ANH,
                MA_LOAI_PHIM,
                GIA_PHIM,
                TRAILER
            };
            for (const key in movieData) {
                formData.append(key, movieData[key]);
            }
            
            const response: AxiosResponse<{ data: { message: string, imagePath: string } }> = await axios.post('/api/movies', formData);
            console.log('Movie insertion successful:', response.data);
            setAlert('Thêm thành công');
            resetForm();

        } catch (error) {
            console.error('Movie insertion failed:', error);
            setAlert('Thêm phim thất bại, thử lại');

        }
    };
    
    const uploadToClient = (res: any) => {
        const imageUrl = res[0].url;
       setHINHANH(imageUrl);
    };
    React.useEffect(() => {
        axios.get('/api/movieGenres')
            .then(response => {
                setMovieGenres(response.data.data)
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
                <h1 className="text-2xl font-bold mb-4">Thêm một phim mới</h1>
                <h1 className="text-xl font-bold mb-2">{alert}</h1>
                <div className="mb-2 w-full">
                    <Input
                        type="text"
                        label="Tên phim"
                        value={TEN_PHIM}
                        onChange={(e) => setTENPHIM(e.target.value)}
                        className="max-w-full"
                    />
                </div>
                <div className="mb-2 w-full">
                    <Input
                        type="text"
                        label="Thời gian phim"
                        value={THOI_GIAN_PHIM}
                        onChange={(e) => setTHOIGIANPHIM(e.target.value)}
                        className="max-w-full"
                    />
                </div>
                <div className="mb-2 w-full">
                    <Input
                        type="text"
                        label="Thông tin phim"
                        value={THONG_TIN_PHIM}
                        onChange={(e) => setTHONGTINPHIM(e.target.value)}
                        className="max-w-full"
                    />
                </div>
                
                
                
                <div className="mb-2 w-full justify-end flex">
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                        >
                            Chọn thể loại phim
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Movie Genres">
                        {movieGenres.map(genre => (
                            <DropdownItem onClick={()=>{setMALOAIPHIM(genre.MA_LOAI_PHIM.toString())}} key={genre.MA_LOAI_PHIM}>{genre.TEN_LOAI_PHIM}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                </div>
              
                <div className="mb-2 w-full">
                    <Input
                        type="number"
                        required
                        label="Giá phim"
                        value={GIA_PHIM}
                        onChange={(e) => setGIAPHIM(Number(e.target.value))}
                        className="max-w-full"
                    />
                </div>
                <div className="mb-2 w-full">
                    <Input
                        type="text"
                        label="Trailer phim"
                        value={TRAILER}
                        onChange={(e) => setTRAILER(e.target.value)}
                        className="max-w-full"
                    />
                </div>
                <div className="mb-2 w-full justify-end flex">
                <UploadButton
                    
                    endpoint="imageUploader"
                    onClientUploadComplete={uploadToClient}
                    onUploadError={(error: Error) => {
                    //Do something with the error.
                    setAlert('Upload hình thất bại, vui lòng thử lại');
                    }}
                />
                </div>
                
                {HINH_ANH && (
                    <div className="mb-2 items-center justify-center flex w-full">
                        <Image isBlurred  className="m-5" src={HINH_ANH} alt="Preview" width={200} height={200} />
                    </div>
                    )}
                <div className="w-full">
                    <Button size="lg" onClick={handleMovieInsertion} className="max-w-xs">
                        Thêm phim
                    </Button>
                </div>
            </div>
        </div>
    );
}
