import { Card, List, Typography } from 'antd'
import React from 'react'

function Features() {
    const data = [
        'https://i.pinimg.com/564x/aa/ea/12/aaea12e1c3a5a1ed35dbd87c3f15f45e.jpg',
        'https://i.pinimg.com/564x/c0/1f/71/c01f719490b79c02ede76db8687e8a67.jpg',
        'https://i.pinimg.com/564x/6f/2c/00/6f2c00585b1183995fd0690fff0ccc6b.jpg'
    ]

    return (
        <>
            <Typography.Title
                level={2}
                style={{
                    margin: 0,
                    textAlign: 'center',
                    textTransform: 'uppercase'
                }}>
                Our Ielts Futures
            </Typography.Title>
            <List
                style={{ marginTop: '1rem', paddingInline: '2rem' }}
                grid={{
                    gutter: 42,
                    xs: 1,
                    sm: 2,
                    md: 2,
                    lg: 3,
                    xl: 3,
                    xxl: 3
                }}
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item key={index}>
                        <div>
                            <img alt="" width={'100%'} height={320} src={`${item}`} style={{ objectFit: 'cover' }} />
                            <Typography.Title level={3} style={{ textAlign: 'center', margin: 0 }}>Reading Tests</Typography.Title>
                            <Typography.Text style={{ textAlign: 'center' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 15</Typography.Text>
                        </div>
                    </List.Item>
                )}
            />
        </>
    )
}

export default Features