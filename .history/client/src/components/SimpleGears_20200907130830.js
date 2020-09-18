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
            const newGear = { set, piece, weight, trait, glyph }
            console.log("buildId:", build, "gearID:", gearId, "newGear:", newGear);


            if (gearId === "new") {

                console.log("verif1");
                await axios.patch(
                    `http://localhost:5000/builds/${build}/new`,
                    newGear, {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                }).then((res) => {
                    console.log("verif2");
                    console.log(res);
                    setGearID(res.data._id)
                })
            } else {
                console.log("verif3");
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



    useEffect(() => {
        setSets(allSets);
        setGearID('new')
    }, [])

    return (
        <div>
            <div className="row col-9 offset-1 mb-1">
                <div className="card-group col-2" piece="head">

                    <img src={!value ? "https://via.placeholder.com/150?text=" + props.textPlaceholder : "http://imgur.com/7jEklMc.png"} className="card-img" alt={props.textPlaceholder} />

                </div>
            </div>

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