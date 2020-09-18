import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Jumbo from '../Jumbo.js'

const ViewOneBuild = (props) => {

    const params = useParams("/build/:id")
    const [build, setBuild] = useState()

    const getBuildInfo = async () => {
        await axios
            .get(`http://localhost:5000/build/${params.id}`,
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                })
            .then((build) => {
                setBuild(build.data)
            })
    }

    useEffect(() => {
        getBuildInfo()
    }, [])

    return (
        <div>
            <Jumbo text={"ok"} action="Create a new build" link="/create-build" />
        </div>
    )
}

export default ViewOneBuild
