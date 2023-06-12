import { Button, Col, Divider, Image, Input, Row, Space, Typography } from 'antd'
import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { AppHeader } from 'components'
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router';
import StyledTable from 'components/TestsTable';

interface DataType {
    image: string;
    title: string;
    reading: any;
    listening: any;
    publishDay: string;
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
        align: 'center',
        render: (item) => <>
            <p style={{ textAlign: 'center' }}>{item ? `${item.score}/${item.total}` : "-/-"}</p>
            <br />
            <Button
                style={{
                    textTransform: "uppercase",
                    backgroundColor: "#5CB1C5",
                    border: "none",
                    color: "white",
                    boxShadow: "4px 4px 4px 0 rgba(0, 0, 0, .25)",
                }}>Take test</Button>
        </>
    },
    {
        title: 'Listening',
        dataIndex: 'listening',
        key: 'listening',
        align: 'center',
        render: (item) => item ? `${item} test` : "-"
    },
    {
        title: 'Publish Day',
        key: 'publishDay',
        dataIndex: 'publishDay',
        align: 'center',
        render: (item) => item || "-"
    },
];

const data: DataType[] = [
    {
        image: "",
        title: "IELTS Recent mock test 01",
        reading: { score: 7, total: 9 },
        listening: 0,
        publishDay: "11/4/2023",
    },
    {
        image: "",
        title: "IELTS Recent mock test 02",
        reading: 0,
        listening: 0,
        publishDay: "11/4/2023",
    },
    {
        image: "",
        title: "IELTS Recent mock test 03",
        reading: { score: 7.5, total: 9 },
        listening: 0,
        publishDay: "11/4/2023",
    },
];


export function UserTests() {
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
                </div>
                <StyledTable
                    columns={columns} dataSource={[...data]} style={{ marginTop: '1rem' }}
                    pagination={{ defaultPageSize: 5 }}
                />
            </div>
        </div>
    )
}
