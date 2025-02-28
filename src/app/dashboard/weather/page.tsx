'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import { WeatherData, WeatherDataHour } from '@/types/weather'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ArrowLeft, LocateFixed, MapPin, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import WeatherComponent from '@/components/weather/detailsToday'
import HourlyWeatherData from '@/components/weather/Hourlydata'
import DailyForecast from '@/components/weather/DailyForcast'


function debounce(func: (...args: any[]) => void, delay: number) {
  let timeout: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }
}

interface Location {
  latitude: number | null
  longitude: number | null
}

const fetchWeatherData = async (params: { lat?: number; lon?: number; q?: string }) => {
  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: { ...params, appid: process.env.NEXT_PUBLIC_WEATHER_API, units: 'metric' },
  })
  return data
}

const fetchHourlyData = async (params: { lat?: number; lon?: number; q?: string }) => {
  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: { ...params, appid: process.env.NEXT_PUBLIC_WEATHER_API, units: 'metric' },
  })
  return data.list
}

export default function WeatherPage() {
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null })
  const [place, setPlace] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const getUserLocation = useCallback(() => {
    if (location.latitude || location.longitude) return
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords
          setLocation({ latitude, longitude })
        },
        (error: GeolocationPositionError) => {
          toast({
            title: 'Location Error',
            description: error.message,
            variant: 'destructive',
          })
        }
      )
    } else {
      toast({
        title: 'Location Error',
        description: 'Geolocation is not supported by your browser',
        variant: 'destructive',
      })
    }
  }, [location.latitude, location.longitude, toast])

  useEffect(() => {
    getUserLocation()
  }, [getUserLocation])

  const { data: weatherData, isLoading: weatherLoading } = useQuery<WeatherData>({
    queryKey: ['weather', location, place],
    queryFn: () => fetchWeatherData(place ? { q: place } : { lat: location.latitude!, lon: location.longitude! }),
    enabled: !!(place || (location.latitude && location.longitude)),
  })

  const { data: hourlyData, isLoading: hourlyLoading } = useQuery<WeatherDataHour[]>({
    queryKey: ['hourly', location, place],
    queryFn: () => fetchHourlyData(place ? { q: place } : { lat: location.latitude!, lon: location.longitude! }),
    enabled: !!(place || (location.latitude && location.longitude)),
  })

  const searchLocation = useCallback(
    debounce(() => {
      if (!place) return
      setLocation({ latitude: null, longitude: null })
    }, 500),
    [place]
  )

  return (
    <div className='flex flex-col space-y-4'>
      <header className='flex justify-between items-center px-4 w-full mx-auto border-b pb-2'>
        <div className='flex items-center gap-4'>
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className='h-5 w-5' />
          </Button>
          <div className='flex items-center gap-2'>
            <MapPin className='h-5 w-5' />
            <span>{weatherData?.name || 'Loading...'}</span>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant="ghost" size="icon" onClick={getUserLocation}>
            <LocateFixed className={`h-5 w-5 ${location.latitude ? 'text-green-500' : 'text-red-500'}`} />
          </Button>
          <Input
            type="text"
            placeholder="Search location..."
            onChange={(e) => setPlace(e.target.value)}
            value={place ?? ''}
            className="w-40 md:w-60"
          />
          <Button size="icon" onClick={searchLocation}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {!weatherData && !place && (
        <p className='text-center text-xl p-4'>
          Allow location access or <span className='text-green-500 font-bold'>search for a location</span>
        </p>
      )}

      {(weatherLoading || hourlyLoading) && <WeatherSkeleton />}

      {weatherData && (
        <div className='w-[90%] mx-auto space-y-4'>
          <WeatherComponent weatherData={weatherData} />
          {hourlyData && <HourlyWeatherData HourlyWeatherData={hourlyData} />}
          <DailyForecast />
        </div>
      )}
    </div>
  )
}

function WeatherSkeleton() {
  return (
    <div className='w-[90%] mx-auto space-y-4'>
      <Skeleton className='h-40 w-full' />
      <Skeleton className='h-60 w-full' />
      <Skeleton className='h-80 w-full' />
    </div>
  )
}