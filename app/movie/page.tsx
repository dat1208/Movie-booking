'use client';

import { Card, CardBody, Button, Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import DateSelect from '../components/DateSelect';
import TimeSelect from '../components/TimeSelect';
import { useState } from 'react'; // Import useState from React
import {Image} from "@nextui-org/react";
import React from 'react';
import axios from 'axios';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Badge, Avatar, AvatarGroup} from "@nextui-org/react";
import { cn } from '@nextui-org/react'
import { CheckIcon } from '../components/CheckIcon';

export default function App() {
  const searchParams = useSearchParams();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [showTimes,setShowTimes] = useState<ShowTimeInterface[]>();
  const [selectedDate, setSelectedDate] = useState(2)
  const [selectedTime, setSelectedTime] = useState(2)
  const [arrayDate, setArrayDate] = useState(['17/12', '18/12', '19/12', '20/12']);
  const [arrayTime, setArrayTime] = useState(['16:40', '18:00', '17:20', '21:30']);
  
  const [arrayDate2, setArrayDate2] = useState([]);
  
  
  const movieId  = searchParams.get('id');
  
  const handleOpen = () => {
    onOpen();
  }  

  const [movie, setMovie] = useState({
    MA_PHIM: 1, // Replace with actual values
    TEN_PHIM: 'Movie Title',
    THOI_GIAN_PHIM: '120',
    HINH_ANH: 'https://utfs.io/f/23d82d98-a757-4c34-aa86-2affcffc5805-nr175n.png',
    GIA_PHIM: 100000,
    THONG_TIN_PHIM: 'Example'
  });

  const initialSeats = Array.from({ length: 100 }, (_, index) => ({
    id: `A${index + 1}`,
    reserved: index % 3 === 0, // Make every third seat reserved initially
  }));

  const [seats, setSeats] = useState(initialSeats);
  
  const handleSeatClick = (seatId: string) => {
    // Toggle the reserved status of the clicked seat
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === seatId ? { ...seat, reserved: !seat.reserved } : seat
      )
    );
  };
  
  function formatDate(inputDate) {
    const originalDate = new Date(inputDate);

    // Extract day and month components
    const day = originalDate.getDate();
    const month = originalDate.getMonth() + 1; // Months are zero-indexed, so add 1

    // Format the date as "DD/MM"
    const formattedDate = `${day}/${month}`;

    return formattedDate;
  }



  const renderSeatRow = (startIdx: number | undefined, endIdx: number | undefined) => (
    <div key={`row-${startIdx}`}>
      {seats.slice(startIdx, endIdx).map((seat) => (
        <>
        <Badge
              key={seat.id}
              isOneChar
              content={seat.reserved ? (
                  <CheckIcon size={undefined} height={undefined} width={undefined} />
              ) : null}
              color={seat.reserved ? 'danger' : 'success'}
              placement=""
              onClick={() => handleSeatClick(seat.id)}
          >
              <Avatar
              className='mr-5'
                  isBordered
                  color={seat.reserved ? 'danger' : 'success'}
                  radius="md"
                  name={seat.id} />
          </Badge>
          </>
      ))}
    </div>
  );
  
  const fetchMovie = async () => {
    try {
      const response = await axios.get(`/api/movies?id=${movieId}`);
      setMovie(response.data.movie);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };
  
  const fetchShowTimes = async () => {
    try {

      const response = await axios.get(`/api/getshowtimebymovieid?id=${movieId}`);
      await setShowTimes(response.data.data);
      console.log(showTimes);
    } catch (error) {
      console.error('Error fetching show times:', error);
    }
  };
  
  React.useEffect(()=>{
    fetchMovie();
    fetchShowTimes();
    },[]);
  return (
    <>
      <section className='py-36'>
        <div className='container flex flex-wrap justify-center'>
          <Card key={movie.MA_PHIM} className='py-4 lg:w-10/12 xl:w-10/12 flex-shrink-0 m-3'>
            <CardBody className='overflow-visible py-2'>
              <div className='flex gap-6'>
                <Image isBlurred alt={movie.TEN_PHIM} className='flex-3 object-cover' src={movie.HINH_ANH} width={300} height={300} />
                <div className='flex-1'>
                  <h2 className='text-lg font-bold uppercase'>{movie.TEN_PHIM}</h2>
                  <p className='text-sm text-default-500'>{movie.THOI_GIAN_PHIM} phút</p>

                  <div className='mb-6 mt-2 flex gap-3'>
                    <span className='font-bold'>{movie.GIA_PHIM} VNĐ</span>
                  </div>
                  <div className='mb-6 mt-2 flex gap-3'>
                    <span className='font-light'>{movie.THONG_TIN_PHIM}</span>
                  </div>

                  <div className='mb-3 mt-5 flex gap-3'>
                  <ul className='flex gap-3'>
                    {showTimes && showTimes.map((showtime) => (
                      <li key={showtime.MA_LICH_CHIEU}>
                          <button
                            onClick={() => setSelectedDate(showtime.MA_LICH_CHIEU)}
                            className={cn(
                              'flex h-10 w-10 items-center justify-center rounded-full p-2 text-sm font-semibold transition-colors',
                              selectedDate === showtime.MA_LICH_CHIEU
                                ? 'bg-primary text-white'
                                : 'bg-transparent'
                            )}
                          >
                            {formatDate(showtime.NGAY_GIO_CHIEU)}
                          </button>
                        </li>
                      ))}

                    </ul>
                    </div>
                    <div className='mb-15 mt-1 flex gap-3'>
                    <ul className='flex gap-3'>
                    {arrayTime.map((size, index) => (
                        <li key={size}>
                        <button
                            onClick={() => setSelectedTime(index)}
                            className={cn(
                            'flex h-10 w-10 items-center justify-center  rounded-full p-2 text-sm font-semibold transition-colors',
                            selectedTime === index
                                ? 'bg-gray-400 text-white'
                                : 'bg-transparent'
                            )}
                        >
                            {size}
                        </button>
                        </li>
                    ))}
                    </ul>
                    </div>
                  
                  <div className='mt-20 flex gap-6'>
                    <Button onClick={handleOpen} color='primary'>Đặt vé ngay</Button>
                    <Button color='primary' variant='bordered' radius='full'>
                      Trailer
                    </Button>
                  </div>
                </div>
              </div>
              
            </CardBody>
          </Card>

          <Modal backdrop={'blur'} size='5xl' isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className=' font-bold '>
                {movie.TEN_PHIM}
                </div>
                <div className='font-light'>
                Vé ngày {arrayDate[selectedDate]} lúc {arrayTime[selectedTime]}
                </div>
                <div className='font-bold w-full flex justify-center bg-gray-500/30 rounded-md'>
                MÀN HÌNH
                </div>
              </ModalHeader>
              <ModalBody className='w-full flex justify-center items-center'>
              {Array.from({ length: Math.ceil(seats.length / 10) }).map((_, rowIndex) => (
                renderSeatRow(rowIndex * 10, (rowIndex + 1) * 10)
              ))}
            </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                <Button color="primary" onPress={onClose}>
                  Thanh toán
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
        </div>
      </section>
    </>
  );
}


