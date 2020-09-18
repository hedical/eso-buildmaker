const token = process.env.ESO_TOKEN

function getSets() {

    axios.get('https://cors-anywhere.herokuapp.com/https://beast.pathfindermediagroup.com/api/eso/sets', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then((res) => {
        allSets.push(...res.data)
        console.log(allSets);
    })
}