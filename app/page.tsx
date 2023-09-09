"use client"

import { useEffect, useState } from "react"

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/constants';
import { HomeProps } from '@/types';
import { fetchCars } from '@/utils'

import Image from 'next/image'

// export default async function Home( { searchParams }: HomeProps ) {
export default function Home() {
  // const allCars = await fetchCars({
  //   manufacturer: searchParams?.manufacturer || "",
  //   year: searchParams?.year || 2023,
  //   fuel: searchParams?.fuel || "",
  //   limit: searchParams?.limit || 10,
  //   model: searchParams?.model || ""
  // });

  const [allCars, setAllCars] = useState([]);
  const [loading, setloading] = useState(false);

  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2023);

  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        year: year || 2023,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || ""
      });
  
      setAllCars(result);

    } catch (error) {
      console.log(error);
    } finally {
      setloading(false)
    }
  }

  useEffect(() => {
    getCars();
  }, [fuel, year, limit, manufacturer, model]);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explorer the cars that you might like</p>
        </div>

        <div className="home__fiters">
          <SearchBar
            setManufacturer={setManufacturer}
            setModel={setModel}
          />

          <div className="home__filter-container">
            {/* <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} /> */}
            <CustomFilter 
              title="fuel" 
              options={fuels} 
              setFilter={setFuel}  
            />
            <CustomFilter 
              title="year" 
              options={yearsOfProduction} 
              setFilter={setYear}  
            />
          </div>
        </div>

        {/* {!isDataEmpty ? ( */}
        {allCars.length > 0 ? (
           <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            {loading && (
              <div className="mt-16 w-full flex-center">
                <Image
                  src='/loader.svg'
                  alt='loader'
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            )}

            <ShowMore
              // pageNumber={ (searchParams.limit || 10) / 10 }
              // isNext={(searchParams.limit || 10) > allCars.length} 
              // pageNumber={ (limit || 10) / 10 }
              // isNext={(limit || 10) > allCars.length} 
              pageNumber={ (limit) / 10 }
              isNext={limit > allCars.length} 
              setLimit={setLimit}
            />

           </section>
        ) : (
          <div className="home__error-container">
            {/* <h2 className="text-black text-xl">OOPS NO RESULTS</h2>
            <p>{allCars?.message}</p> */}
            <h2 className="text-black text-xl">OOPS NO RESULTS</h2>
            <p>{allCars?.message}</p>
          </div>
        )}

      </div>
    </main>
  )
}
