import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Jumbo from '../Jumbo.js'

const ViewOneBuild = (props) => {

    const [build, setBuild] = useState()

    const getBuildInfo = async () => {
        await axios
            .get(`http://localhost:5000/build/${props.match.params.id}`,
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                })
            .then((build) => {
                set(build.data)
            })
    }

    useEffect(() => {
        getBuildInfo()
    }, [])

    return (
        <div>
            <Jumbo text={props.title} action="Create a new build" link="/create-build" />
        </div>
    )
}

export default ViewOneBuild
