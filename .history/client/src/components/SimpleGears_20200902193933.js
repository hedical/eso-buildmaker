import React, { useState, useEffect } from 'react'
import axios from 'axios'


const SimpleGears = () => {
    const [gear, setGear] = useState()

    const allSets = () => {
        axios.get('http://localhost:5000/api/sets', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("auth-token")
            }
        }).then((res) => {
            console.log(res.data)
            return res.data
        })
    }

    useEffect(() => {
        setGear(allSets);
    }, [])

    console.log(gear);

    return (
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="gear-type">Gear</label>
                    <input id="gear-type"
                        type="gear"
                        onChange={(e) => setGear(e.target.value)}
                        className="form-control"
                    />
                </div>

                <input type="submit" value="Login" className="btn btn-primary" />

            </form>
        </div>
    )
}

export default SimpleGears
