'use client'
import {Image} from "@nextui-org/react";
import { Button } from '@nextui-org/button'
import { Card, CardBody } from '@nextui-org/card'
import { movie } from '@/app/constants/models/movie'
import React from 'react'
import axios,{AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation'

const moviess = [
  {
    id: 1,
    title: 'Avanger: End Game',
    duration: '220 phút',
    price: 300000,
    image: 'https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg',
    trailer: ''
  },
  // Add more movie entries as needed
];

export default function Home() {
  const [movies, setMovies] = React.useState([]);
  const router = useRouter()

  React.useEffect(()=>{
    const fetchMovies = async () => {
      try { 
        // Make a GET request to the /api/movies endpoint
        const response = await axios.get('/api/movies');
  
        // Update the state with the fetched movies
        setMovies(response.data.data);
        console.log(movies[0]);
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };

    // Call the fetchMovies function
    fetchMovies();
    },[]);
  
  return (
    <section className='py-36'>
      <div className='container flex flex-wrap justify-center'>
        {movies.map((movie) => (
          <Card key={movie.MA_PHIM} className='py-4 lg:w-5/12 xl:w-5/12 flex-shrink-0 m-3'>
            <CardBody className='overflow-visible py-2'>
              <div className='flex gap-6'>
                <Image isBlurred alt={movie.TEN_PHIM} className='flex-3 object-cover' src={movie.HINH_ANH} width={250} height={300}/>
                <div className='flex-1'>
                  <h2 className='text-lg font-bold uppercase'>{movie.TEN_PHIM}</h2>
                  <p className='text-sm text-default-500'>{movie.THOI_GIAN_PHIM} phút</p>

                  <div className='mb-6 mt-2 flex gap-3'>
                    <span className='font-bold'>{movie.GIA_PHIM} VNĐ</span>
                  </div>
                  <div className='mb-6 mt-2 flex gap-3'>
                    <span className='font-light'>{movie.THONG_TIN_PHIM}</span>
                  </div>
                  
                  <div className='mt-6 flex gap-6'>
                    <Button onClick={()=>{router.push(`/movie?id=${movie.MA_PHIM}`)}} color='primary'>Đặt vé ngay</Button>
                    <Button onClick={()=>{window.open(movie.TRAILER, '_blank');}} color='primary' variant='bordered' radius='full'>
                      Trailer
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          ))}
      </div>
    </section>
    );
}
