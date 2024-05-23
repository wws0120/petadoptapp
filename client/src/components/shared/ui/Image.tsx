import React, { useState, useEffect } from 'react';

function Image({ src, alt, width, height, className }) {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        let objectURL = URL.createObjectURL(blob);
        setImageSrc(objectURL);
      });
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      style={{ width: `${width}px`, height: `${height}px` }}
      className={className}
    />
  );
}

export default Image;
