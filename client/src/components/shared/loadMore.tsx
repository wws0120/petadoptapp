'use client';

import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

import spinner from '../../assets/spinner.svg';

let page = 2;

function LoadMore() {
  const { ref, inView } = useInView();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      // Add a delay of 500 milliseconds
      const delay = 500;
      const fetchAnime = async (page) => {};
      const timeoutId = setTimeout(() => {
        fetchAnime(page).then((res) => {
          setData([...data, ...res]);
          page++;
        });

        setIsLoading(false);
      }, delay);

      // Clear the timeout if the component is unmounted or inView becomes false
      return () => clearTimeout(timeoutId);
    }
  }, [inView, data, isLoading]);
  return (
    <>
      <section className="flex justify-center items-center w-full">
        <div className="my-10">
          <img
            src={spinner}
            alt="spinner"
            className="w-10 h-10 object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
