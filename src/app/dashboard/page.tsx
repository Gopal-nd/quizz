'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React,{ FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  const user = useSession()
  if(!user) return <div>Unauthorized</div>
  return (<>
    <div className="space-y-4 ">
      <h2 className='text-center font-bold text-2xl'>Welcome <span className='text-blue-500'>{user.data?.user.name}</span></h2>
      <div className="flex flex-col items-center justify-center space-y-10 min-h-screen ">
      {/* Hero Section */}
      <div className="text-center p-10 w-full">
        <h1 className="text-4xl font-bold">Get Ready to Revolutionalize Agriculture.</h1>
        <p className="mt-4 text-lg">
          Leveraging technology to achieve Zero Hunger and sustainable growth.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
        {/* Feature: Weather Information */}
        <FeatureCard
          title="Weather Information"
          description="Real-time updates and personalized recommendations."
          link="/dashboard/weather"
        />
        {/* Feature: Agricultural Marketplace */}
        <FeatureCard
          title="Agricultural Marketplace"
          description="Direct farmer-buyer connections."
          link="/dashboard/marketplace"
        />

        {/* Feature: Pest and Disease Detection */}
        <FeatureCard
          title="Pest and Disease Detection"
          description="Using advanced image recognition."
          link="/dashboard/image-recognition"
        />

        {/* Feature: Training and Awareness */}
        <FeatureCard
          title="Training and Awareness"
          description="Knowledge dissemination for farmers."
          link="/dashboard/tutorial"
        />
        
      </div>

    
    </div>
    </div>
  </>)
}

export default page;

const FeatureCard = ({ title, description, link }: { title: string; description: string; link: string }) => (
  <div className="border rounded-lg shadow-lg p-6 text-center">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-600 mb-6">{description}</p>
    <Link href={link}>
      <p className="px-4 py-2 border">Get started</p>
    </Link>
  </div>
)