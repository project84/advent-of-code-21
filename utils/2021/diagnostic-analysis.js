import { sum as arraySum } from '../general/array-tools';

export default function(readings, position) {

    // Filter diagnostic readings to specified position
    const positionItems = readings.map(reading => {
        return parseInt(reading[position]);
    });

    // Determine most / least frequent digit at specified position
    const sum = arraySum(positionItems);
    const most = Math.round(sum / positionItems.length);

    return {
        most: most,
        least: most ^ 1
    }
}