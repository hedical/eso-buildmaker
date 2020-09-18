import React, { useState, useEffect } from 'react'

function getSets() {

    axios.get('http://localhost:5000/api/sets', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("auth-token")
        }
    }).then((res) => {
        console.log(res.data)
        allSets.push(res.data)
    })
}

const SimpleGears = () => {
    const [gear, setGear] = useState()

    return (
        <div>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="gear-type">Gear</label>
                    <input id="gear-type"
                        type="gear"
                        onChange={(e) => setGear(e.target.value)}
                        className="form-control"
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <input id="login-password" type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />

                </div>


                <input type="submit" value="Login" className="btn btn-primary" />

            </form>
        </div>
    )
}

export default SimpleGears
