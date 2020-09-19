import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useConfirm } from 'material-ui-confirm';
import { useSnackbar } from 'notistack';

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
        set: undefined,
        glyph: undefined,
        trait: undefined
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
        await resetGear(selectedPiece)

        try {
            await axios
                .get(`/builds/${props.buildId}`,
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
                            setValue({ set: gearList[i].set.name, glyph: gearList[i].glyph, trait: gearList[i].trait })
                            setSet(gearList[i].set)
                            return Promise.resolve()
                        }
                    }

                    console.log("No existing gears in this build have been found for this type of piece");

                    setValue({})


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

            if (!finalGear.gearId) {

                await axios.patch(
                    `/builds/${build}/new`,
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
                    `/builds/${build}/${finalGear.gearId}`,
                    finalGear, {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                }).then((res) => {
                    console.log("response if gearID exists on add", res.data);
                })
            }
            setValue({})
            finalGear.piece ? alertSuccess("Gear added and build saved") : alertWarning("Please select a gear")


        }
        catch (err) {
            console.log(err);
        }
    }

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const alertSuccess = (message) => {
        enqueueSnackbar(message, {
            variant: 'success',
        });
    }
    const alertWarning = (message) => {
        enqueueSnackbar(message, {
            variant: 'warning',
        });
    }

    const imgStyle = {
        border: "1px solid",
    }


    return (
        <div className="col-8 mt-2">
            <div className="row">
                <h1>Gears selection</h1>
            </div>

            <div className="row col-12-md-auto justify-content-center">
                <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 m-0 p-0" gears>
                    <div className="row col-12 offset-1 mb-1 p-0 m-0">
                        <div className="card-group offset-4 col-4">
                            <img src={require("../utils/images/head.png")}
                                className="card-img"
                                style={finalGear.piece === "head" ? imgStyle : {}}
                                id="head"
                                onClick={(e) => { gearDisplay(e.target.id) }}
                            />
                        </div>
                    </div>
                    <div className="row col-12 p-0 m-0 mb-1">
                        <div className="card-group col-4">
                            <img src={require("../utils/images/chest.png")}
                                className="card-img"
                                style={finalGear.piece === "chest" ? imgStyle : {}}
                                id="chest"
                                onClick={(e) => { gearDisplay(e.target.id) }}
                            />
                        </div>
                        <div className="card-group col-4 offset-4 p-0">
                            <img src={require("../utils/images/shoulder.png")}
                                className="card-img"
                                style={finalGear.piece === "shoulder" ? imgStyle : {}}
                                id="shoulder"
                                onClick={(e) => { gearDisplay(e.target.id) }}
                            />

                        </div>
                    </div>
                    <div className="row col-12 p-0 mb-1 m-0">
                        <div className="card-group col-4">
                            <img src={require("../utils/images/hands.png")}
                                className="card-img"
                                style={finalGear.piece === "hands" ? imgStyle : {}}
                                id="hands"
                                onClick={(e) => { gearDisplay(e.target.id) }}
                            />
                        </div>
                        <div className="card-group col-4 offset-4 p-0">
                            <img src={require("../utils/images/belt.png")}
                                className="card-img"
                                style={finalGear.piece === "belt" ? imgStyle : {}}
                                id="belt"
                                onClick={(e) => { gearDisplay(e.target.id) }}
                            />
                        </div>
                    </div>
                    <div className="row col-12 p-0 mb-1 m-0">
                        <div className="card-group col-4">
                            <img src={require("../utils/images/legs.png")}
                                className="card-img"
                                style={finalGear.piece === "legs" ? imgStyle : {}}
                                id="legs"
                                onClick={(e) => { gearDisplay(e.target.id) }}
                            />
                        </div>
                        <div className="card-group col-4 offset-4 p-0">
                            <img src={require("../utils/images/feet.png")}
                                className="card-img"
                                style={finalGear.piece === "feet" ? imgStyle : {}}
                                id="feet"
                                onClick={(e) => { gearDisplay(e.target.id) }}
                            />
                        </div>
                    </div>
                    <div className="row col-12 p-0 mb-1 m-0">
                        <div className="card-group col-4 p-0">
                            <img src={require("../utils/images/necklace.png")}
                                className="card-img"
                                style={finalGear.piece === "necklace" ? imgStyle : {}}
                                id="necklace"
                                onClick={(e) => { gearDisplay(e.target.id) }}
                            />
                        </div>
                        <div className="card-group col-4 p-0">
                            <img src={require("../utils/images/ring.png")}
                                className="card-img"
                                style={finalGear.piece === "ring" ? imgStyle : {}}
                                id="ring"
                                onClick={(e) => { gearDisplay(e.target.id) }}
                            />
                        </div>
                        <div className="card-group col-4 p-0">
                            <img src={require("../utils/images/ring.png")}
                                className="card-img"
                                style={finalGear.piece === "ring" ? imgStyle : {}}
                                id="ring"
                                onClick={(e) => { gearDisplay(e.target.id) }}
                            />
                        </div>
                    </div>




                </div>

                <form className="col-3">
                    {finalGear.piece ? <h3>{finalGear.piece}</h3> : <></>}
                    {finalGear.set ?
                        < Autocomplete
                            freeSolo
                            onChange={(event, newValue) => {

                                setFinalGear({ ...finalGear, set: newValue })
                                console.log("onchange");
                                setSet(newValue)
                            }}
                            value={value.set ? value.set : value}
                            disableClearable
                            options={props.sets}
                            getOptionLabel={(option) => option.name ? option.name : value.set}
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
                        // onSelect={(e) => setFinalGear({ ...finalGear, glyph: e.target.value })}
                        onChange={(event, newValue) => {
                            setFinalGear({ ...finalGear, glyph: newValue })
                        }}
                        value={value.glyph ? value.glyph : value}
                        // defaultValue={finalGear.glyph}
                        disableClearable
                        options={armorGlyph}
                        getOptionLabel={(option) => option ? option : value.glyph}
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
                        }}
                        // defaultValue={finalGear.trait}

                        value={value.trait ? value.trait : value}
                        disableClearable
                        options={esoTrait}
                        getOptionLabel={(option) => option ? option : value.trait}
                        style={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} label="Trait" margin="normal"
                            variant="outlined"
                            InputProps={{ ...params.InputProps, type: 'search' }} />}
                    />

                    <input type="submit"
                        value="Add"
                        className="btn btn-dark"
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
