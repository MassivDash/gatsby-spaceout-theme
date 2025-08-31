import React, { useRef, useEffect, useState } from 'react';

interface LazyVideoProps {
  src: string;
  height?: string;
  muted?: boolean;
  loop?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  height = '100%',
  muted = true,
  loop = true,
  style = {},
  className = '',
  onMouseEnter,
  onMouseLeave,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(video);
        }
      },
      {
        rootMargin: '50px', // Start loading when video is 50px away from viewport
      },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleMouseEnter = () => {
    if (isLoaded && videoRef.current) {
      videoRef.current.play();
    }
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    if (isLoaded && videoRef.current) {
      videoRef.current.pause();
    }
    onMouseLeave?.();
  };

  return (
    <video
      ref={videoRef}
      height={height}
      muted={muted}
      loop={loop}
      style={style}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onLoadedData={handleLoad}
      preload={isIntersecting ? 'metadata' : 'none'}
    >
      {isIntersecting && <source src={src} type="video/mp4" />}
      Your browser does not support the video tag
    </video>
  );
};

export default LazyVideo;
