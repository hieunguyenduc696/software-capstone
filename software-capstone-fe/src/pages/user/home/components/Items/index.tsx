import React from 'react';
import { Button, List, Typography } from 'antd';
import styles from './Items.module.css'
import { RightOutlined } from '@ant-design/icons';

const data = [
    'slide.png',
    'https://i.pinimg.com/564x/aa/ea/12/aaea12e1c3a5a1ed35dbd87c3f15f45e.jpg',
    'https://i.pinimg.com/564x/c0/1f/71/c01f719490b79c02ede76db8687e8a67.jpg',
    'https://i.pinimg.com/564x/6f/2c/00/6f2c00585b1183995fd0690fff0ccc6b.jpg'
];

const Items: React.FC = () => (
    <>
        <Typography.Title
            level={2}
            style={{
                margin: 0,
                textAlign: 'center',
                textTransform: 'uppercase'
            }}>
            Newest Ielts Tests
        </Typography.Title>
        <List
            style={{ marginTop: '1rem' }}
            grid={{
                gutter: 32,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 4,
                xl: 4,
                xxl: 4
            }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <img className={styles['responsive-image']} alt='' src={item} style={{ objectFit: 'cover', borderRadius: '.5rem' }} />
                </List.Item>
            )}
        />
        <Button
            type='text'
            className={styles['btn-see-more']}
            style={{
                textTransform: 'uppercase',
                width: '100%',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
            }}>
            See More <RightOutlined />
        </Button>
    </>
);

export default Items;