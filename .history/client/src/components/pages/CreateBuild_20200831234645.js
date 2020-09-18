
import React, { useState } from 'react'
import Jumbo from '../Jumbo'
import axios from 'axios'
import Stats from '../Stats'

// Material-UI
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { TableContainer, TableRow } from '@material-ui/core';


// Variables


const role = ["DPS", "Healer", "Tank", "Hybrid"]
const esoClass = ["Dragonknight", "Necromancer", "Nightblade", "Sorcerer", "Templar", "Warden"]
const race = ["Altmer", "Argonian", "Bosmer", "Breton", "Dunmer", "Imperial", "Khajiit", "Nord", "Orc", "Redguard"]




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





const CreateBuild = () => {
    return (
        <div>
            <Jumbo text="Build Maker" />
            <h2>General Information</h2>

            <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Build name"
                variant="outlined"
                style={{ width: 300 }}
            />

            < Autocomplete
                freeSolo
                id="class"
                disableClearable
                options={esoClass}
                getOptionLabel={(option) => option}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Class" margin="normal"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: 'search' }} />}
            />
            < Autocomplete
                freeSolo
                id="role"
                disableClearable
                options={role}
                getOptionLabel={(option) => option}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Role" margin="normal"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: 'search' }} />}
            />
            < Autocomplete
                freeSolo
                id="race"
                disableClearable
                options={race}
                getOptionLabel={(option) => option}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Race" margin="normal"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: 'search' }} />}
            />
            <Stats />
        </div>
    )
}

export default CreateBuild
