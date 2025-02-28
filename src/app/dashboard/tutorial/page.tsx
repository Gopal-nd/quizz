'use client'
import VideoCard from '@/components/tutorial/VideoCard';
import { Button } from '@/components/ui/button';
import { ArrowBigLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const videos = [
  {
    title: 'How to Start a Small Farm | A Step-by-Step Guide',
    videoUrl: 'https://www.youtube.com/watch?v=heTxEsrPVdQ',
  },
  {
    title: 'Why do potatoes grow in bags of soil have so many tubers? Here is the answer',
    videoUrl: 'https://www.youtube.com/watch?v=z1BWxDEu0P0',
  },
  {
    title: 'How to Export Agriculture items from india | A to Z Agri Product Export Process By Sagar Agravat',
    videoUrl: 'https://www.youtube.com/watch?v=1a9aG0Vicqo',
  },
  // Add more video objects as needed
];

const TutorialPage = () => {
  const router = useRouter()
  return (<>
     <div>
      <Button onClick={() => router.back()}><ArrowBigLeft /></Button>
      <h1 className='flex-1 text-2xl font-semibold text-center'>Tutorials</h1>
     </div>
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <VideoCard key={index} title={video.title} videoUrl={video.videoUrl} />
        ))}
      </div>
    </div>
        </>
  );
};

export default TutorialPage;
