import React, { useState, useEffect } from 'react'
import axios from 'axios'


const SimpleGears = (props) => {
    const [gearId, setGearID] = useState()
    const [set, setSets] = useState()
    const [piece, setPiece] = useState()
    const [weight, setWeight] = useState()
    const [trait, setTrait] = useState()
    const [glyph, setGlyph] = useState()

    const [selectedGear, setGear] = useState()

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
            const newGear = { set, piece, weight, trait, glyph }
            console.log("buildId:", build, "gearID:", gearId, "newGear:", newGear);


            if (gearId === "new") {

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
                    `http://localhost:5000/builds/${build}/${gearId}`,
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

    const gearCheck = async (e) => {
        const buildId = props.buildId
        setGear(e.target.piece)
        try {
            await axios.get(`http://localhost:5000/builds/${buildId}`,
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                }).then((res) => {
                    const gearList = res.data.gears
                    for (let i = 0; i < gearList.length; i++) {
                        if (gearList[i].piece === selectedGear) {
                            return true
                        } else {
                            return false
                        }
                    }

                })
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        setSets(allSets);
        setGearID('new')
    }, [])

    return (
        <div>
            <div className="row col-9 offset-1 mb-1">
                <div className="card-group col-2" piece="head">

                    <img src="https://via.placeholder.com/150?text="
                        className="card-img"
                        onClick={gearCheck(e), console.log(gearCheck(e))}
                    />

                </div>
            </div>

            <form>
                <div className="form-group">
                    <label htmlFor="piece-type">Trait</label>
                    <input id="piece-type"
                        type="piece"
                        onChange={(e) => {
                            setTrait(e.target.value)
                        }}
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
