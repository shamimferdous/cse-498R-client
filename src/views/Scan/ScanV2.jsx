import styles from './Scan.module.scss';
import axios from "axios";
import { Button, message, Result } from "antd";
import { BiQrScan } from 'react-icons/bi';
import { useState } from "react";

const ScanV2 = () => {

    const [loading, setLoading] = useState(false);
    const [res, setRes] = useState(null);
    const fileUploadHandler = (e) => {

        setLoading(true);
        console.log(e.target.files[0])
        let image = e.target.files[0];

        const formData = new FormData();
        formData.append('image', image);

        axios.post('https://sea-lion-app-5bs7n.ondigitalocean.app/api/products/scanner/scan', formData).then(response => {
            console.log(response.data);
            // message.info(response.data.original ? 'OG' : 'Not Detected')
            if (response.data.original) {
                setRes('true');
            } else {
                setRes('false');
            }
        }).catch(error => {
            console.log(error.response);
        }).finally(() => {
            setLoading(false);
        })

    }
    return (
        <div className={styles.wrapper}>
            <input style={{display: 'none'}} id={'file'} type="file" onChange={fileUploadHandler}/>
            {
                !res &&
                <label htmlFor="file" className={styles.label}>
                    {
                        loading ?
                            <img src="https://samherbert.net/svg-loaders/svg-loaders/bars.svg" alt=""/>
                            :
                            <>
                                <BiQrScan size={30}/>
                                Upload QR Image for Scan</>
                    }
                </label>
            }

            {
                res &&
                <>
                    {
                        res === 'true' ?
                            <Result
                                status="success"
                                title="The product is authentic!"
                                extra={[
                                    <Button type={'primary'} onClick={()=>{
                                        setRes(null);
                                        setLoading(false);
                                    }}>Scan Again</Button>
                                ]}
                            />
                            :
                            <Result
                                status="warning"
                                title="The product might not be authentic!"
                                extra={[
                                    <Button type={'primary'} onClick={()=>{
                                        setRes(null);
                                        setLoading(false);
                                    }}>Scan Again</Button>
                                ]}
                            />
                    }
                </>
            }
        </div>
    );
};

export default ScanV2;