import React, { useEffect, useRef } from 'react';
import './wallpaperShowcase.css';

// Functional React 16-compatible lazy component
// Props: { desktop: string, tablet: string, mobile: string }
const WallpaperShowcase = ({ desktop, tablet, mobile }) => {
  const observer = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            if (src) img.src = src;
            observer.current.unobserve(img);
          }
        });
      },
      { rootMargin: '200px' },
    );

    imagesRef.current.forEach((img) => {
      if (img) observer.current.observe(img);
    });

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  const downloadImage = (src) => {
    try {
      const a = document.createElement('a');
      a.href = src;
      const name = src.split('/').pop().split('?')[0];
      a.download = name || 'image';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      window.open(src, '_blank');
    }
  };

  // buttons are keyboard-activatable by default, no explicit key handler needed

  const devices = [
    { type: 'desktop', src: desktop },
    { type: 'tablet', src: tablet },
    { type: 'mobile', src: mobile },
  ];

  return (
    <div className="ws-root">
      <div className="ws-grid">
        {devices.map((d, i) => (
          <div className={`ws-device ws-${d.type}`} key={d.type}>
            <div className="ws-frame">
              {d.type === 'desktop' ? (
                <div className="ws-screen ws-screen--bg">
                  <button
                    type="button"
                    className="ws-screen-button"
                    aria-label={`${d.type} wallpaper`}
                    style={{ backgroundImage: `url(${d.src})` }}
                    onClick={() => downloadImage(d.src)}
                  />
                </div>
              ) : (
                <div className="ws-screen">
                  <button
                    type="button"
                    className="ws-screen-button"
                    aria-label={`${d.type} wallpaper`}
                    onClick={() => downloadImage(d.src)}
                  >
                    <img
                      ref={(el) => (imagesRef.current[i] = el)}
                      data-src={d.src}
                      alt={`${d.type} wallpaper`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              )}
            </div>
            <p>{d.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WallpaperShowcase;
