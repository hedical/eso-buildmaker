import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Jumbo from '../Jumbo.js'
import { makeStyles } from '@material-ui/core/styles';
import ReactTooltip from "react-tooltip";
import MyTooltip from "../Tooltip"
import Chart from 'react-apexcharts'


const ViewOneBuild = () => {

    const params = useParams("/build/:id")
    const [build, setBuild] = useState({ gears: [] })
    const [gears, setGears] = useState(
        { head: { set: {} } },
        { shoulder: { set: {} } },
        { chest: { set: {} } }
    )
    const [calcul, setCalcul] = useState({
        magicka_occurrence: 0, // Maximum Magicka
        health_occurence: 0, // Maximum Health, Healing taken, Health
        stamina_occurence: 0, // Maximum Stamina
        weapon_damage_occurence: 0, // Weapon Damage
        spell_damage_occurence: 0, // Spell Damage
        stam_reco_occurence: 0, // Stamina Recovery
        mag_reco_occurence: 0, // Magicka Recovery
        health_reco_occurence: 0, // Health Recovery
    })

    //Sustain chart
    //Ressources Pool
    let healthPool = 0
    let stamPool = 0
    let magickaPool = 0

    //Ressources Recovery
    let healthReco = 0
    let stamReco = 0
    let magickaReco = 0

    // Damage chart
    //Penetration
    let physicalPen = 0
    let spellPen = 0

    //Critical
    let weaponCritical = 0
    let spellCritical = 0

    // Damage
    let weaponDamage = 0
    let spellDamage = 0



    const getBuildInfo = async () => {
        console.log("getBuildInfo");
        const mybuild = await axios
            .get(`http://localhost:5000/builds/${params.id}`,
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("auth-token")
                    }
                })
        const allInfo = await mybuild.data
        await setBuild(allInfo)
        await gearsMap(allInfo)

    }


    const gearsMap = async (build) => {
        let gearsIn = {}

        await build.gears.forEach(gear => {
            gearsIn[gear.piece] = gear
        })
        await setGears(gearsIn)
    }



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

    const classes = useStyles();


    useEffect(() => {
        getBuildInfo()
    }, [])

    const statCalculation = () => {


        build.gears.forEach((gear) => {
            const stringToAnalyze = Object.values(gear.set)
            stringToAnalyze.forEach((bonus) => {
                console.log(bonus);
                if (typeof bonus == "string" && bonus.includes('Maximum Health' || 'Healing taken')) {
                    healthPool++
                }
                if (typeof bonus == "string" && bonus.includes('Maximum Stamina')) {
                    stamPool++
                }
                if (typeof bonus == "string" && bonus.includes('Maximum Magicka')) {
                    magickaPool++
                }
                //
                if (typeof bonus == "string" && bonus.includes('Health Recovery')) {
                    healthReco++
                }
                if (typeof bonus == "string" && bonus.includes('Stamina Recovery')) {
                    stamReco++
                }
                if (typeof bonus == "string" && bonus.includes('Magicka Recovery')) {
                    magickaReco++
                }
                if (typeof bonus == "string" && bonus.includes('Stamina and Magicka Recovery')) {
                    magickaReco++
                    stamReco++
                }
                if (typeof bonus == "string" && bonus.includes('Physical and Spell Penetration')) {
                    physicalPen++
                    spellPen++
                }
                if (typeof bonus == "string" && bonus.includes('Physical Penetration')) {
                    physicalPen++
                }
                if (typeof bonus == "string" && bonus.includes('Spell Penetration')) {
                    spellPen++
                }
                if (typeof bonus == "string" && bonus.includes('Weapon and Spell Damage')) {
                    weaponDamage++
                    spellDamage++
                }
                if (typeof bonus == "string" && bonus.includes('Weapon Damage')) {
                    weaponDamage++
                }
                if (typeof bonus == "string" && bonus.includes('Spell Damage')) {
                    spellDamage++
                }
                if (typeof bonus == "string" && bonus.includes('Weapon and Spell Critical')) {
                    weaponCritical++
                    spellCritical++
                }
                if (typeof bonus == "string" && bonus.includes('Weapon Critical')) {
                    weaponCritical++
                }
                if (typeof bonus == "string" && bonus.includes('Spell Critical')) {
                    spellCritical++
                }
            })
        })
        // console.log("health:", healthPool);
        // console.log("stam:", stamPool);
        // console.log("magicka:", magickaPool);
        // console.log("health reco:", healthReco);
        // console.log("stam reco:", stamReco);
        // console.log("magicka reco:", magickaReco);
        // console.log("physical pen:", physicalPen);
        // console.log("spell pen:", spellPen);
        // console.log("weapon damage:", weaponDamage);
        // console.log("spell damage:", spellDamage);
        // console.log("weapon Critical:", weaponCritical);
        // console.log("spell Critical:", spellCritical);
    }

    statCalculation()

    const graphSustain = {
        series: [{
            name: 'Ressources Pool',
            data: [healthPool, stamPool, magickaPool],
        },
        {
            name: 'Ressources Recovery',
            data: [healthReco, stamReco, magickaReco],
        }
        ],
        options: {
            chart: {
                height: 350,
                type: 'radar',
                dropShadow: {
                    enabled: true,
                    blur: 1,
                    left: 1,
                    top: 1
                }
            },
            // title: {
            //     text: 'Sustain Analysis'
            // },
            stroke: {
                width: 2
            },
            fill: {
                opacity: 0.1
            },
            markers: {
                size: 0
            },
            tooltip: {
                x: {
                    formatter: function (val) {
                        return val
                    }
                }
            },
            xaxis: {
                categories: ['Health', 'Stamina', 'Magicka']
            }
        },
    }

    const graphDamage = {
        series: [{
            name: 'Physical',
            data: [physicalPen, weaponCritical, weaponDamage],
        },
        {
            name: 'Spell',
            data: [spellPen, spellCritical, spellDamage],
        },
        ],
        options: {
            chart: {
                height: 350,
                type: 'radar',
                dropShadow: {
                    enabled: true,
                    blur: 1,
                    left: 1,
                    top: 1
                }
            },
            // title: {
            //     text: 'Damage Analysis'
            // },
            stroke: {
                width: 2
            },
            fill: {
                opacity: 0.1
            },
            markers: {
                size: 0
            },
            tooltip: {
                x: {
                    formatter: function (val) {
                        return val
                    }
                }
            },
            xaxis: {
                categories: ['Penetration', 'Critical', 'Damage']
            }
        },
    }

    const imgStyle = {
        height: "auto",
    }

    return (

        < div >
            <Jumbo text={build.title} comment={build.comments} />

            <div className="row">
                <img className="classImg col-lg-2 col-md-2 col-sm-2" src={build.iclass ? require(`../../utils/images/${build.iclass}.png`) : "https://www.eso-gold.com/images/game_left/the-elder-scrolls-online.png"} style={imgStyle} />


                {gears.chest ?
                    < div className="container col-4 m-0" >
                        <h2>Gears</h2>
                        <div className="row col-9 offset-1 mb-1">
                            <div className="card-group col-2">
                                <MyTooltip setInfo={gears.head} piece='head' />
                            </div>
                        </div>

                        <div className="row col-9 mb-1">
                            <div className="card-group col-2">
                                <MyTooltip setInfo={gears.shoulder} piece='shoulder' />
                            </div>
                            <div className="card-group col-2 offset-2 p-0">
                                <MyTooltip setInfo={gears.chest} piece='chest' />
                            </div>
                        </div>
                        <div className="row col-9 mb-1">
                            <div className="card-group col-2">
                                <MyTooltip setInfo={gears.hands} piece='hands' />


                            </div>
                            <div className="card-group col-2 offset-2 p-0">
                                <MyTooltip setInfo={gears.belt} piece='belt' />

                            </div>
                        </div>
                        <div className="row col-9 mb-1">
                            <div className="card-group col-2">
                                <MyTooltip setInfo={gears.legs} piece='legs' />

                            </div>
                            <div className="card-group col-2 offset-2 p-0">
                                <MyTooltip setInfo={gears.feet} piece='feet' />

                            </div>
                        </div>
                        <div className="row col-9 mb-1">
                            <div className="card-group col-2">
                                <MyTooltip setInfo={gears.necklace} piece='necklace' />

                            </div>
                            <div className="card-group col-2">
                                <MyTooltip setInfo={gears.ring} piece='ring' />

                            </div>
                            <div className="card-group col-2">
                                <MyTooltip setInfo={gears.ring} piece='ring' />

                            </div>
                        </div>
                    </div>
                    : <></>
                }
                <div id="chart" className="col-2">
                    <h2>Sustain analysis</h2>
                    <Chart options={graphSustain.options} series={graphSustain.series} type="radar" height={350} />
                </div>
                <div id="chart" className="col-2">
                    <h2>Damage Analysis</h2>
                    <Chart options={graphDamage.options} series={graphDamage.series} type="radar" height={350} />
                </div>
            </div>
        </ div >
    )
}

export default ViewOneBuild
