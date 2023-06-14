import { AppHeader } from 'components'
import React from 'react'
import CustomeCarousel from './components/CustomCarousel'
import Items from './components/Items'
import { Space } from 'antd'
import styles from './Home.module.css'
import Features from './components/Features'
import Footer from 'components/Footer'

function Home() {
    return (
        <>
            <AppHeader />
            <CustomeCarousel />
            <Space style={{ display: 'flex', justifyContent: 'center', padding: '1rem', width: '100%', position: 'relative', overflowX: 'hidden' }}>
                <div style={{ width: '80%', margin: 'auto' }}>
                    <Items />
                </div>
                <div className={`${styles.round} ${styles.left}`}></div>
                <div className={`${styles.round} ${styles.right}`}></div>
            </Space>
            <div style={{ width: '100%', overflowX: 'hidden', backgroundColor: 'white', paddingTop: '1rem' }}>
                <Features />
            </div>
            <Footer />
        </>
    )
}

export default Home