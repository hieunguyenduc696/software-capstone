import { Image } from 'antd';
import React, { useState, useEffect } from 'react';

const UploadImage = () => {
    const [selectedFile, setSelectedFile] = useState<any>()
    const [preview, setPreview] = useState<any>()

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }

    return (
        <div>
            <input id="upload-image" type='file' onChange={onSelectFile} style={{ display: 'none' }} />
            <div style={{
                position: 'relative',
                borderRadius: '10px',
                overflow: 'hidden'
            }}>
                <Image src={selectedFile ? preview : '/default.png'} alt='' style={{ width: 140, height: 120 }} preview={false} />
                <button
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, .6)',
                        display: 'block',
                        width: '100%'
                    }}
                    onClick={() => {
                        const ele = document.querySelector("#upload-image") as HTMLInputElement | null;
                        if (ele) { ele.click() }
                    }}>
                    <Image src='/upload.png' style={{ width: 30, cursor: 'pointer' }} preview={false} />
                </button>
            </div>
        </div>
    )
}

export default UploadImage;