import React, { useState } from 'react'
import axios from 'axios'
import Jumbo from '../Jumbo.js'

const ViewOneBuild = (props) => {

    const [build, setBuild] = useState()


    return (
        <div>
            <Jumbo text={props.title} action="Create a new build" link="/create-build" />
        </div>
    )
}

export default ViewOneBuild
