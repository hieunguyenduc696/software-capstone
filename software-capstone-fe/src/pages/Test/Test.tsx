import { Button, Col, Divider, Image, Input, Row, Space, Table, Tag, Typography } from 'antd'
import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { AppHeader } from 'components'
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router';

interface DataType {
    image: string;
    title: string;
    reading: number;
    listening: number;
    publishDay: string;
    actions: any[]
}

const columns: ColumnsType<DataType> = [
    {
        title: '',
        dataIndex: 'image',
        key: 'image',
        render: (item) => <Image src={item || 'default.png'} style={{ height: '50px' }} preview={false} />,
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (item) => item,
    },
    {
        title: 'Reading',
        dataIndex: 'reading',
        key: 'reading',
        render: (item) => item ? `${item} test` : "-"
    },
    {
        title: 'Listening',
        dataIndex: 'listening',
        key: 'listening',
        render: (item) => item ? `${item} test` : "-"
    },
    {
        title: 'Publish Day',
        key: 'publishDay',
        dataIndex: 'publishDay',
        render: (item) => item || "-"
    },
    {
        title: '',
        key: 'action',
        render: (_, { actions }) => (
            <Space >
                {actions.map((act) => {
                    return (
                        act
                    );
                })}
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        image: "",
        title: "IELTS Recent mock test 01",
        reading: 1,
        listening: 0,
        publishDay: "11/4/2023",
        actions: [
            <Image src='publish_fill.png' alt='' preview={false} style={{ height: '22px', cursor: 'pointer' }} />,
            <Image src='edit_fill.png' alt='' preview={false} style={{ height: '16px', cursor: 'pointer' }} />,
            <Image src='trash_fill.png' alt='' preview={false} style={{ height: '20px', cursor: 'pointer' }} />
        ]
    },
    {
        image: "",
        title: "IELTS Recent mock test 02",
        reading: 1,
        listening: 0,
        publishDay: "11/4/2023",
        actions: [
            <Image src='publish_fill.png' alt='' preview={false} style={{ height: '22px', cursor: 'pointer' }} />,
            <Image src='edit_fill.png' alt='' preview={false} style={{ height: '16px', cursor: 'pointer' }} />,
            <Image src='trash_fill.png' alt='' preview={false} style={{ height: '20px', cursor: 'pointer' }} />
        ]
    },
    {
        image: "",
        title: "IELTS Recent mock test 03",
        reading: 1,
        listening: 0,
        publishDay: "11/4/2023",
        actions: [
            <Image src='publish_fill.png' alt='' preview={false} style={{ height: '22px', cursor: 'pointer' }} />,
            <Image src='edit_fill.png' alt='' preview={false} style={{ height: '16px', cursor: 'pointer' }} />,
            <Image src='trash_fill.png' alt='' preview={false} style={{ height: '20px', cursor: 'pointer' }} />
        ]
    },
];


export function Test() {
    const navigate = useNavigate();
    return (
        <div style={{ backgroundColor: 'white' }}>
            <AppHeader />
            <div style={{ width: '100%', backgroundColor: '#f5f5f5' }}>
                <Row style={{ width: '80%', margin: 'auto', padding: '1rem 0' }}>
                    <Col span={24}>
                        <Input
                            placeholder="Find IELTS test"
                            suffix={
                                <Image src="search.png" alt="" preview={false} style={{ width: '26px', height: '26px', cursor: 'pointer' }} />
                            }
                            style={{ width: '100%' }}
                        />
                    </Col>
                </Row>
            </div>
            <Divider style={{ margin: 0 }} />
            <div style={{ width: '80%', margin: 'auto', padding: '1rem 0', backgroundColor: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography.Text style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                        IELTS Test Library
                    </Typography.Text>
                    <Button
                        icon={<PlusOutlined />}
                        style={{ color: 'white', backgroundColor: '#5CB1C5' }}
                        onClick={() => navigate('/post-test')}
                    >
                        ADD IELTS TEST
                    </Button>
                </div>
                <Table columns={columns} dataSource={data} style={{ marginTop: '1rem' }} />
            </div>
        </div>
    )
}
