import React, { useState, useEffect } from 'react'
import axios from 'axios'


const SimpleGears = () => {
    const [sets, setSets] = useState()
    const [piece, setPiece] = useState()
    const [weight, setWeight] = useState()
    const [trait, setTrait] = useState()
    const [glyph, setGlyph] = useState()

    const [bonus_item_1, setBonus_item_1] = useState()



    const allSets = () => {
        axios.get('http://localhost:5000/api/sets', {
            headers: {
                "x-auth-token": localStorage.getItem("auth-token")
            }
        }).then((res) => {
            console.log(res.data)
            return res.data
        })
    }

    useEffect(() => {
        setSets(allSets);
    }, [])

    return (
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="piece-type">Piece</label>
                    <input id="piece-type"
                        type="piece"
                        onChange={(e) => setPiece(e.target.value)}
                        className="form-control"
                    />
                </div>

                <input type="submit" value="Login" className="btn btn-primary" />

            </form>
        </div>
    )
}

export default SimpleGears
