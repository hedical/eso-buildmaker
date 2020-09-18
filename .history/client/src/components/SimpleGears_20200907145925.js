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

    const gearCheck = async () => {
        const buildId = props.buildId
        try {
            await axios.get(`http://localhost:5000/builds/${buildId}`,
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                }).then((res) => {
                    const gearList = res.data.gears
                    let existingGear = ""
                    for (let i = 0; i < gearList.length; i++) {
                        if (gearList[i].piece === selectedGear) {
                            existingGear.push(true)
                        } else {
                            existingGear.push(false)
                        }
                    } return existingGear

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
                <div
                    id="tmlp"
                    className="card-group col-2"
                    piece="head"
                    onClick={(e) => {
                        setGear(e.target.id);
                        console.log(e.target.id);
                        console.log(selectedGear);
                        gearCheck()
                        console.log(gearCheck);
                    }
                    }>

                    <img src="https://via.placeholder.com/150?text="
                        className="card-img"
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
