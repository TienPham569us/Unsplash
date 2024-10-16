'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
//import { useRouter } from "next/router";
import dotenv from 'dotenv';
import { ImageData } from '../../../types/Image.models';
import ErrorMessage from "@/components/ErrorMessage";
dotenv.config();

export default function ImageDetail({ params}: { params: { id: string } }) {
 
  const [image, setImage] = useState<ImageData>();
  const [error, setError] = useState<string | null>(null);

  // fetch image from unsplash api
  const fetchImage = async (photoId: string) => {  
    try {
      // fetch image from unsplash api
      const response = await fetch(`https://api.unsplash.com/photos/${photoId}?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_ACCESS_KEY}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_API_ACCESS_KEY}`
        }
      });

      // check if response is ok
      if (!response.ok) {
        throw new Error('Failed to fetch image');
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
  }
  useEffect(() => {
    // fetch data
    const fetchData = async () => {
      try {
        // fetch one image with id
        const jsonData: ImageData = await fetchImage(params.id as string);
        setImage(jsonData);

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

  },[]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="header-text">
          <h1>UnSplash API</h1> 
        </div>
        { 
        error ? 
        (<ErrorMessage message={error}/>
         ) : (
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">

            <div className="container mx-auto p-4">
                <div><strong>Description: </strong> {image?.alt_description!}</div>
                <div><strong>Author: </strong>{image?.user?.username}</div>
                <div className="relative w-full p-4 ">
                  <img src={image?.urls?.full!} alt={image?.alt_description!} className="object-cover w-full" />
                </div>
                <div className="flex flex-row justify-center"><p>Image title: <strong className="italic">{image?.alternative_slugs?.en!}</strong></p></div>
            </div>
          </main>
        )
      }
    </div>
  );
}
