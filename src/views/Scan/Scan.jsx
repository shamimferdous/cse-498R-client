import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import { message } from 'antd';


const Scanner = () => {
    const [data, setData] = useState('No result');
    const [img, setImg] = useState(null);

    const captureImage = () => {
        const video = document.querySelector('video');
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const image = canvas.toDataURL('image/jpeg');
        setImg(image);
        console.log(image);
        const formData = new FormData();
        formData.append('image', image);

        axios.post('https://sea-lion-app-5bs7n.ondigitalocean.app/api/products/scanner/scan', formData).then(response => {
            console.log(response.data);
            message.info(response.data.original ? 'OG' : 'Not Detected')
        }).catch(error => {
            console.log(error.response);
        });

    };

    return (
        <>
            <QrReader
                constraints={{
                    facingMode: 'environment'
                }}
                onResult={(result, error) => {
                    if (!!result) {
                        captureImage();
                        setData(result?.text);
                    }

                    if (!!error) {
                        console.info(error);
                    }
                }}
                style={{width: '100vw', height: '100vh'}}
            />
            {
                img &&
                <img src={img} width={'100%'} alt=""/>
            }
            <p>{data}</p>
        </>
    );
};

export default Scanner;
