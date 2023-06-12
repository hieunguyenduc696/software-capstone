import { AppHeader } from 'components'
import React from 'react'
import Title from './components/Title/Title'
import Score from './components/Score/Score'
import AnswersKeys from './components/AnswersKeys/AnswersKeys'

function TestResult() {
    return (
        <div>
            <AppHeader />
            <div style={{ width: '90%', margin: 'auto', padding: '.5rem 0 3rem 0' }}>
                <Title />
            </div>
            <div>
                <Score />
            </div>
            <div style={{ width: '100%', margin: 'auto', backgroundColor: '#EAFBFF', padding: '1rem 0' }}>
                <AnswersKeys />
            </div>
        </div>
    )
}

export default TestResult