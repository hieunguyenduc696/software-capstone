import { Table } from 'antd';
import { styled } from 'styled-components';

const StyledTable = styled(Table)`
    .ant-pagination .ant-pagination-item {
        font-weight: 600;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ant-pagination .ant-pagination-item-active {
        font-weight: 600;
        background-color: #ffffff;
        border-color: #1677ff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export default StyledTable;