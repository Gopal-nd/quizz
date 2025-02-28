'use client'
import YouTube from 'react-youtube';
// components/VideoCard.tsx
import React, { FC } from 'react'

interface VideoCardProps {
    title: string;
    videoUrl: string;
}

const VideoCard: FC<VideoCardProps> = ({ title, videoUrl }) => {
    return (
        <div className="border rounded-lg shadow-md overflow-hidden">
            <div className='w-full'>
                <YouTube
                    videoId={videoUrl.split('?v=')[1]}
                    opts={{
                        height: '315',
                        width: '100%',
                        playerVars: {
                            autoplay: 0,  // Set to 1 to autoplay the video
                        },

                    }}
                />
            </div>
            <div className="p-4">
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>
        </div>
    );
};

export default VideoCard;
