import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Material-UI
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import SimpleCard from './SimpleCard';
import { TableContainer, TableRow } from '@material-ui/core';

// Variables
const armorType = ["Light", "Medium", "Heavy"]
const esoTrait = ["Impenetrable", "Infused", "Charged"]
const armorGlyph = ["Health", "Recovery", "Stamina"]

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    customWidth: {
        maxWidth: 500,
    },
    noMaxWidth: {
        maxWidth: 'none',
    },
}));


const SimpleGears = (props) => {
    const [finalGear, setFinalGear] = useState({
        gearId: undefined,
        set: { undefined },
        piece: undefined,
        weight: undefined,
        trait: undefined,
        glyph: undefined,
    })

    const [set, setSet] = useState()

    const classes = useStyles();
    const [value, setValue] = useState({
        set,
        glyph,
        trait
    });
    const [inputValue, setInputValue] = useState([]);

    const build = props.buildId

    const resetGear = (selectedPiece) => {
        setFinalGear({
            gearId: undefined,
            glyph: "Chose a glyph",
            trait: "Chose a trait",
            set: {},
            piece: selectedPiece
        })
    }

    const gearDisplay = async (selectedPiece) => {
        resetGear(selectedPiece)
        try {
            await axios
                .get(`http://localhost:5000/builds/${props.buildId}`,
                    {
                        headers: {
                            "x-auth-token": localStorage.getItem("auth-token")
                        }
                    })

                .then((res) => {

                    return res.data.gears
                })
                .then(async (gearList) => {

                    for (let i = 0; i < gearList.length; i++) {

                        if (gearList[i].piece === selectedPiece) {
                            console.log("A corresponding gear in this build has been found");
                            setFinalGear({
                                gearId: gearList[i]._id,
                                trait: gearList[i].trait,
                                set: gearList[i].set,
                                piece: selectedPiece,
                                weight: gearList[i].weight,
                                glyph: gearList[i].glyph,
                            })
                            return Promise.resolve()
                        }
                    }

                    console.log("No existing gears in this build have been found for this type of piece");

                    resetGear(selectedPiece)

                    return Promise.resolve()

                })
        } catch (err) {
            console.log(err);
        }
    }

    const add = async (e) => {
        e.preventDefault();

        try {
            console.log("buildId:", build, "gearID:", finalGear.gearId, "newGear:", finalGear);

            if (finalGear.piece === undefined) {
                alert("select a piece")
            }
            else if (!finalGear.gearId) {

                await axios.patch(
                    `http://localhost:5000/builds/${build}/new`,
                    finalGear, {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                }).then((res) => {
                    console.log("response if gearID NO exists on add", res.data);
                    setFinalGear({ ...finalGear, gearId: res.data._id })
                })
            } else if (finalGear.gearId) {
                await axios.patch(
                    `http://localhost:5000/builds/${build}/${finalGear.gearId}`,
                    finalGear, {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                }).then((res) => {
                    console.log("response if gearID exists on add", res.data);
                })
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    // useEffect(() => {
    //     setFinalGear({ ...finalGear })
    //     //     setGearId()
    // }, [])

    return (
        <div className="container mt-4">

            <div className="row">
                <div className="col-4" gears>
                    <div className="row col-12 offset-1 mb-1">
                        <div className="card-group col-2">
                            <img src="https://via.placeholder.com/150?text=head"
                                className="card-img"
                                id="head"
                                onClick={(e) => { gearDisplay(e.target.id) }}
                            />
                        </div>
                    </div>
                    <div className="row col-12 mb-1">
                        <div className="card-group col-2">
                            <img src="https://via.placeholder.com/150?text=shoulder"
                                className="card-img"
                                id="shoulder"
                                onClick={(e) => { gearDisplay(e.target.id) }}
                            />
                        </div>
                        <div className="card-group col-2 offset-2 p-0">
                            <img src="https://via.placeholder.com/150?text=chest"
                                className="card-img"
                                id="chest"
                                onClick={(e) => { gearDisplay(e.target.id) }}
                            />
                        </div>
                    </div>
                    <div className="row col-12 mb-1">
                        <div className="card-group col-2">
                            <img src="https://via.placeholder.com/150?text=hands"
                                className="card-img"
                                id="hands"
                                onClick={(e) => { gearDisplay(e.target.id) }}
                            />
                        </div>
                        <div className="card-group col-2 offset-2 p-0">
                            <img src="https://via.placeholder.com/150?text=belt"
                                className="card-img"
                                id="belt"
                                onClick={(e) => { gearDisplay(e.target.id) }}
                            />
                        </div>
                    </div>
                    <div className="row col-12 mb-1">
                        <div className="card-group col-2">
                            <img src="https://via.placeholder.com/150?text=legs"
                                className="card-img"
                                id="legs"
                                onClick={(e) => { gearDisplay(e.target.id) }}
                            />
                        </div>
                        <div className="card-group col-2 offset-2 p-0">
                            <img src="https://via.placeholder.com/150?text=feet"
                                className="card-img"
                                id="feet"
                                onClick={(e) => { gearDisplay(e.target.id) }}
                            />
                        </div>
                    </div>
                    <div className="row col-9 mb-1">
                        <div className="card-group col-2">
                            <img src="https://via.placeholder.com/150?text=necklace"
                                className="card-img"
                                id="necklace"
                                onClick={(e) => { gearDisplay(e.target.id) }}
                            />
                        </div>
                        <div className="card-group col-2">
                            <img src="https://via.placeholder.com/150?text=ring"
                                className="card-img"
                                id="ring"
                                onClick={(e) => { gearDisplay(e.target.id) }}
                            />
                        </div>
                        <div className="card-group col-2">
                            <img src="https://via.placeholder.com/150?text=ring"
                                className="card-img"
                                id="ring"
                                onClick={(e) => { gearDisplay(e.target.id) }}
                            />
                        </div>
                    </div>




                </div>

                <form className="col-3">
                    {finalGear.set ?
                        < Autocomplete
                            freeSolo
                            onChange={(event, newValue) => {

                                setFinalGear({ ...finalGear, set: newValue })
                                console.log("onchange");
                                setSet(newValue)
                                finalGear.set.name ? setValue(finalGear.set.name) : setValue(newValue);
                            }}
                            // inputValue={inputValue}
                            value={value}
                            onInputChange={(event, newInputValue) => {
                                finalGear.set.name ? setValue(finalGear.set.name) : setValue(newInputValue);
                            }}
                            disableClearable
                            options={props.sets}
                            getOptionLabel={(option) => option.name}
                            style={{ width: 200 }}
                            renderInput={(params) =>
                                <TextField {...params}
                                    label="Search set"
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{ ...params.InputProps, type: 'search' }} />}
                        />
                        : <></>
                    }


                    < Autocomplete
                        freeSolo
                        id="armorGlyph"
                        onChange={(event, newValue) => {
                            setFinalGear({ ...finalGear, glyph: newValue })
                        }}
                        disableClearable
                        options={armorGlyph}
                        getOptionLabel={(option) => option}
                        style={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} label="Glyph" margin="normal"
                            variant="outlined"
                            InputProps={{ ...params.InputProps, type: 'search' }} />}
                    />

                    < Autocomplete
                        freeSolo
                        id="esoTrait"
                        onChange={(event, newValue) => {
                            setFinalGear({ ...finalGear, trait: newValue })

                            // setTrait(newValue);
                        }}
                        disableClearable
                        options={esoTrait}
                        getOptionLabel={(option) => option}
                        style={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} label="Trait" margin="normal"
                            variant="outlined"
                            InputProps={{ ...params.InputProps, type: 'search' }} />}
                    />

                    <input type="submit"
                        value="Add"
                        className="btn btn-primary"
                        onClick={add} />
                </form>
                <div className="col-3 ml-5">
                    {set ? <div className="col-10"><SimpleCard set={set} /></div> : <div></div>}
                </div>

            </div>

        </div>
    )
}

export default SimpleGears
