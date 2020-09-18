
import React, { useState } from 'react'
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
let allSets = []

const role = ["DPS", "Healer", "Tank", "Hybrid"]
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
            < Autocomplete
                freeSolo
                id="role"
                disableClearable
                options={role}
                getOptionLabel={(option) => option}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Chose Trait" margin="normal"
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
                renderInput={(params) => <TextField {...params} label="Chose Trait" margin="normal"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: 'search' }} />}
            />
        </div>
    )
}

export default CreateBuild
