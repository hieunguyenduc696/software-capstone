import { Col, Row, Typography } from 'antd'
import React from 'react'
import styles from '../../Result.module.css'

const AnswerKeyItem = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '.5rem' }}>
            <div className={styles.number}>1</div>
            <Typography.Title
                level={5}
                style={{
                    margin: 0,
                    textTransform: 'uppercase',
                    color: '#45764B',
                    marginRight: '.2rem'
                }}>false:</Typography.Title>
            <Typography.Title level={5} style={{ margin: '0 .2rem 0 0', textTransform: 'uppercase' }}>false</Typography.Title>
            <img alt='' src='../done.png' height={15} />
        </div>
    )
}

function AnswersKeys() {
    return (
        <div>
            <Typography.Title level={4} style={{ textTransform: 'uppercase', textAlign: 'center', marginTop: '1rem' }}>Answers Keys:</Typography.Title>
            <Row>
                <Col xs={12}>
                    <div>
                        <AnswerKeyItem />
                        <AnswerKeyItem />
                        <AnswerKeyItem />
                    </div>
                </Col>
                <Col xs={12}>
                    <div>
                        <AnswerKeyItem />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default AnswersKeys