import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';

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

export const DesktopOnlyVideo = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
`;

const VideoContainer = styled.div<{ height: string }>`
  width: 100%;
  height: ${props => props.height};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StyledVideo = styled.video<{ isVisible: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.6s ease-in-out;
`;

const VideoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%);
  background-size: 400% 400%;
  animation: shimmer 2s ease-in-out infinite;
  position: absolute;
  top: 0;
  left: 0;

  @keyframes shimmer {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

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
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
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
            if (typeof window === 'undefined') return;
            observer.disconnect();
        };
    }, []);

    const handleLoad = () => {
        setIsLoaded(true);
        setIsVisible(true);
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
        <VideoContainer height={height} style={style} className={className}>
            {!isVisible && <VideoPlaceholder />}
            <StyledVideo
                ref={videoRef}
                isVisible={isVisible}
                muted={muted}
                loop={loop}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onLoadedData={handleLoad}
                preload={isIntersecting ? 'metadata' : 'none'}
            >
                {isIntersecting && <source src={src} type="video/mp4" />}
                Your browser does not support the video tag
            </StyledVideo>
        </VideoContainer>
    );
};

export default LazyVideo;
