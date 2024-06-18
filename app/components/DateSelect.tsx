'use client'
import { useState , useEffect} from 'react'
import { cn } from '@nextui-org/react'
import axios from 'axios'

type props = {
  id: string;
}

interface ShowTimeInterface {
  MA_LICH_CHIEU: number,
  NGAY_GIO_CHIEU: Date,
  MA_PHIM: number
}

function formatDate(inputDate) {
  const originalDate = new Date(inputDate);

  // Extract day and month components
  const day = originalDate.getDate();
  const month = originalDate.getMonth() + 1; // Months are zero-indexed, so add 1

  // Format the date as "DD/MM"
  const formattedDate = `${day}/${month}`;

  return formattedDate;
}
function DateSelect(props: props) {
  const [selectedDate, setSelectedDate] = useState(2)
  const [displayDate, setdisplayDate] = useState<string[]>();
  const [showTimes,setShowTimes] = useState<ShowTimeInterface[]>();
  useEffect(()=>{
    const fetchShowTime = async () => {
      try { 
        // Make a GET request to the /api/movies endpoint
        const response = await axios.get('/api/getshowtimebymovieid?id='+props.id);

        setShowTimes(response.data.data);
        if(showTimes){
          showTimes.forEach((element,index)=>{
           // setdisplayDate(prevArray => [...prevArray, formatDate(element.NGAY_GIO_CHIEU)]);
            console.log(formatDate(element.NGAY_GIO_CHIEU));
          })
        }
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };

    // Call the fetchMovies function
    fetchShowTime();
    },[]);
  return (
    <ul className='flex gap-3'>
      {displayDate && displayDate.map((size, index) => (
        <li key={size}>
          <button
            onClick={() => setSelectedDate(index)}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full p-2 text-sm font-semibold transition-colors',
              selectedDate === index
          ? 'bg-primary text-white'
          : 'bg-transparent'
          )}
            >
            {size}
          </button>
        </li>
        ))}
      
    </ul>
  )
}

export default DateSelect
