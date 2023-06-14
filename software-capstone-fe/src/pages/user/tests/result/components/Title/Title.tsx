import { Typography } from 'antd'
import React from 'react'

function Title() {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '120px', marginRight: '.5rem' }}>
                <img alt='' src='../default.png' style={{ width: '120px', borderRadius: '16px' }} />
                <img alt='' src='../read_group_icon.png'
                    style={{
                        width: '60px',
                        position: 'absolute',
                        right: '-20%',
                        bottom: '-20%',
                    }} />
            </div>
            <Typography.Title level={5}>IELTS mock test 6</Typography.Title>
        </div>
    )
}

export default Title