import React from 'react'
import SimpleCard from './SimpleCard'

const SetDescription = (props) => {
    return (
        <div>
            <SimpleCard set={props.selectedSet}>

            </SimpleCard>
        </div>
    )
}

export default SetDescription
