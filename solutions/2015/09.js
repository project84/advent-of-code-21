import { RouteFinder } from '../../utils/2015/route-finder'

export default function (inputFile) {

	let paths = new RouteFinder(inputFile).findPaths();

	return {
		1: Math.min(...paths.map(path => path.distance)),
		2: Math.max(...paths.map(path => path.distance))
	}
}