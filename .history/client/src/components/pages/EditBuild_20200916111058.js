import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Jumbo from '../Jumbo.js'


const EditBuild = () => {

    const params = useParams("/build/:id")
    const [build, setBuild] = useState({})


    const getBuildInfo = async () => {
        console.log("getBuildInfo");
        console.log(params.id);
        const mybuild = await axios
            .get(`http://localhost:5000/builds/${params.id}`,
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                })
        const allInfo = await mybuild.data
        await setBuild(allInfo)
        console.log("allInfo", allInfo);
    }

    useEffect(() => {
        getBuildInfo()
    }, [])

    return (
        <div>
            {build
                ? <h1>Build Info</h1>
                : <></>
            }
        </div>
    )
}

export default EditBuild
