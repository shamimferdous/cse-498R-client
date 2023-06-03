import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

const Scanner = () => {
  const [data, setData] = useState('No result');

  const captureImage = () => {
    const video = document.querySelector('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL('image/jpeg');
    console.log(image);
    // setImageData(image);
  };

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            captureImage();
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100vw', height: '100vh' }}
      />
      <p>{data}</p>
    </>
  );
};

export default Scanner;
