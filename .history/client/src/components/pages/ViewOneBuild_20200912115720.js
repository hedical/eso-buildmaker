import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Jumbo from '../Jumbo.js'

const ViewOneBuild = (props) => {

    const params = useParams("/build/:id")
    // const { param }
    const [build, setBuild] = useState()

    // const getBuildInfo = async () => {
    //     await axios
    //         .get(`http://localhost:5000/build/${props.match.params.id}`,
    //             {
    //                 headers: {
    //                     "x-auth-token": localStorage.getItem("auth-token")
    //                 }
    //             })
    //         .then((build) => {
    //             setBuild(build.data)
    //         })
    // }

    useEffect(() => {
        // getBuildInfo()
        console.log(params.id);
    }, [])

    return (
        <div>
            <Jumbo text={props.title} action="Create a new build" link="/create-build" />
            {console.log(params.id)}
        </div>
    )
}

export default ViewOneBuild
