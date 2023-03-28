import { Button, Col, Image, Row } from "antd"
import { AppHeader, UploadImage } from "components"
import { PreviewTestItem } from "components/PreviewTestItem"

export const PostTest = () => {
    return <div>
        <AppHeader />
        <div>
            <Row style={{ padding: '1rem', backgroundColor: 'white' }}>
                {/* left */}
                <Col span={14} >
                    {/* title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div>
                            <UploadImage />
                        </div>
                        <div>

                            <div style={{ fontSize: '20px', paddingBottom: '.2rem' }}>Title:</div>
                            <Row>
                                <Col span={20}>
                                    <div style={{ fontSize: '24px', lineHeight: '.8' }}>
                                        IELTS Recent mock test
                                    </div>
                                </Col>
                                <Image src='edit.png'
                                    style={{
                                        width: '1.5rem',
                                        height: '1.5rem',
                                        cursor: 'pointer'
                                    }}
                                    preview={false}
                                />

                            </Row>
                        </div>
                    </div>

                    {/* buttons */}
                    <Row style={{ padding: '1rem 0' }}>
                        <Col span={12} >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                <Image src="read.png" style={{ height: 68 }} preview={false} />
                                <Button
                                    style={{
                                        textTransform: 'uppercase',
                                        backgroundColor: '#45764B',
                                        border: 'none',
                                        color: 'white',
                                        boxShadow: '4px 4px 4px 0 rgba(0, 0, 0, .25)',
                                        marginTop: '.5rem'
                                    }}
                                >Add Reading Section</Button>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                <Image src="listen.png" style={{ height: 68 }} preview={false} />
                                <Button
                                    style={{
                                        textTransform: 'uppercase',
                                        backgroundColor: '#5CB1C5',
                                        border: 'none',
                                        color: 'white',
                                        boxShadow: '4px 4px 4px 0 rgba(0, 0, 0, .25)',
                                        marginTop: '.5rem'
                                    }}
                                >
                                    Add Listening Section
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
                {/* right */}
                <Col span={10}>
                    <PreviewTestItem />
                </Col>
            </Row>
        </div>
    </div>
}