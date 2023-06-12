import React, { useState } from 'react';
import { Button, Image, Modal, Typography } from 'antd';

interface PropsType {
    open: boolean
    setOpen: any
}

const TestConfirmModal: React.FC<PropsType> = ({ open, setOpen }: PropsType) => {
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleSubmit = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Modal
            open={open}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            width={300}
            footer={null}
        >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '.5rem' }}>
                <Image src='./../../reading_icon.png' />
            </div>
            <Typography.Title level={5} style={{ textAlign: 'center' }}>Confirm submit your test?</Typography.Title>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    type="primary"
                    onClick={() => setOpen(false)}
                    style={{
                        color: "white",
                        backgroundColor: "#9A9494",
                        textTransform: "uppercase",
                        padding: '0 2rem'
                    }}
                >
                    Cancel
                </Button>
                <Button
                    type="primary"
                    onClick={handleSubmit}
                    style={{
                        color: "white",
                        backgroundColor: "#5196A5",
                        textTransform: "uppercase",
                        padding: '0 2rem'
                    }}
                >
                    Submit
                </Button>
            </div>
        </Modal >
    );
};

export default TestConfirmModal;