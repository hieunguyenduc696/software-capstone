import type { ColumnsType } from 'antd/es/table';
import { Button, Image} from 'antd'
import { UserTests } from './Tests';
export interface DataType {
    image: string;
    title: string;
    reading: any;
    listening: any;
    publishDay: string;
}

export const DEFAULT_SIZE = 5;

export const columns: ColumnsType<DataType> = [
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
        render: (item) =>
            <Button
                style={{
                    textTransform: "uppercase",
                    backgroundColor: "#5CB1C5",
                    border: "none",
                    color: "white",
                    boxShadow: "4px 4px 4px 0 rgba(0, 0, 0, .25)",
                }}
                >Take test</Button>
    },
    {
        title: 'Listening',
        dataIndex: 'listening',
        key: 'listening',
        align: 'center',
        render: (item) =>  "-"
    },
    {
        title: 'Publish Day',
        key: 'publishDay',
        dataIndex: 'publishDay',
        align: 'center',
        render: (item) => item || "-"
    },
];
