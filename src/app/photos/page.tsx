'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import dotenv from 'dotenv';
import { ImageData } from '../../types/Image.models';
import Loader from "../../components/Loader"; 
import ErrorMessage from "@/components/ErrorMessage";
dotenv.config();

 
export default function Photos() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const perPage = 27;

  // fetch images from unsplash api
  const fetchImages = async (pageIdx: number) => {
    try {
      const response = await fetch(`https://api.unsplash.com/photos?page=${pageIdx}&per_page=${perPage}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_ACCESS_KEY}`, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_API_ACCESS_KEY}`,
        },
      });

      // check if response is ok
      if (!response.ok) {
        throw new Error('Error fetching data');
      }

      // parse response to json
      const data = await response.json();
      console.log('response: ', data);
      return data;

    } catch (error) {
      // handle error
      if (error instanceof Error) {
        setError('Failed to fetch data. Please try again later: ' + error.message);
      } else {
        setError('Failed to fetch data. Please try again later.');
      }
    }
  };

  // increase page number
  const increasePage = () => {
    setPage(page + 1);
  }


  useEffect(() => {
    // fetch data
    const fetchData = async () => {
      try {
      // fetch images by calling fetchImages function
      const jsonData = await fetchImages(page);

      // check if jsonData is empty or end of list
      if (jsonData && jsonData.length === 0) {
        setIsLastPage(true);
        return;
      }
      
      // set images, if images is not empty, append new images to existing images
      // else set images to new images
      let data: ImageData[];
      if (images.length > 0) {
        data = [...images, ...jsonData];
      } else {
        data = jsonData;
      }

      setImages(data);

      } catch (error) {
        // handle error
        if (error instanceof Error) {
          setError('Failed to fetch data. Please try again later: ' + error.message);
        } else {
          setError('Failed to fetch data. Please try again later.');
        }
      }
    }
    fetchData();

  },[page]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="header-text">
          <h1>UnSplash API</h1>
        </div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <InfiniteScroll 
              dataLength={images?.length ? images.length : 0}
              next={increasePage} 
              hasMore={!isLastPage} 
              loader={<Loader />}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all! This is end of lists</b>
                </p>
              }        
              >
              {error ? (
                <ErrorMessage message={error}/>
                ) : (
                <div className="container mx-auto p-4">
                 <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                  {images.map((image, index: number) => (
                    <Link key={index} className="relative w-full h-full p-4" href={`/photos/${image.id}`}>
                      <img src={image!.urls!.thumb!} alt={image.alt_description!} className="object-cover w-full" />
                      <div className="">{image!.user ? image!.user!.username : 'Unknown'}</div>
                    </Link>
                  ))}
                </div>
                </div>
              )
            }
           </InfiniteScroll>
      </main>
    </div>
  );
}
