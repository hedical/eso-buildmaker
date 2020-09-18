import React, { useState, useEffect } from 'react'
import axios from 'axios'


const SimpleGears = (props) => {
    const [gearId, setGearID] = useState()
    const [set, setSets] = useState()
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

    const save = async (e) => {
        e.preventDefault();

        try {
            const build = props.buildId
            if (!gearId) {
                const newGear = { set, piece, weight, trait, glyph }
                await axios.patch(
                    `http://localhost:5000/builds/${build}/new`,
                    newGear, {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                }).then((res) => {
                    setGearID(res.data._id)
                })
            } else {
                const newGear = { set, piece, weight, trait, glyph }
                await axios.patch(
                    `http://localhost:5000/builds/${props.buildId}/${gearId}`,
                    newGear, {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                })
            }

        }
        catch (err) {
            console.log(err);
        }

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

                <input type="submit"
                    value="Save"
                    className="btn btn-primary"
                    onClick={save} />
            </form>
        </div>
    )
}

export default SimpleGears
