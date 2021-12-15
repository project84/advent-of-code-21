export default function(map, expansionFactor, increment, maxValue, resetValue) {

    // Create copy of the supplied map
    let modifiedMap = JSON.parse(JSON.stringify(map));

    // Expand the map vertically by the specified values
    for (let i = 0; i < expansionFactor - 1; i++) {
        for (let j = 0; j < map.length; j++) {

            let index = j + (i * map.length);
            let modifiedRow = modifiedMap[index].map(node => (node + increment) > maxValue ? resetValue : node + increment);
            modifiedMap.push(modifiedRow);

        }
    }

    // Expand the map horizontally by the specified values
    modifiedMap = modifiedMap.map(row => {

        let modifiedRow = JSON.parse(JSON.stringify(row));

        for (let i = 0; i < expansionFactor - 1; i++) {
            for (let j = 0; j < row.length; j++) {
    
                let index = j + (i * row.length);
                let modifiedNode = (modifiedRow[index] + increment) > maxValue ? resetValue : modifiedRow[index] + increment
                modifiedRow.push(modifiedNode);
    
            }
        }

        return modifiedRow;

    })

    return modifiedMap;

}