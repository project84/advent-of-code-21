import { sum } from "../../utils/general/array-tools";

export default function (inputFile) {

	const { filesystem } = inputFile.reduce(({ current, filesystem }, command) => {

		const [ dir ] = command.match(/(?<=\$ cd )[^\.]+/g) || [];

		if (dir) {
			current = dir === '/' ? 'root' : `${current}/${dir}`;
			filesystem[current] = [];
		}

		const [ file ] = command.match(/\d+?(?= .+)/) || []

		if (file) {
			filesystem[current] = [
				...filesystem[current],
				+file
			]
		}

		if (/\$ cd \.\./.test(command)) {
			current = current.split('/').slice(0, current.match(/\//g).length).join('/')
		}

		return { current, filesystem };

	}, { filesystem: {} });

	const dirList = Object.keys(filesystem);
	const dirSizes = dirList.map((dir) => sum(dirList.filter((path) => path.startsWith(dir)).flatMap((path) => filesystem[path])));

	const target = 30000000 - (70000000 - Math.max(...dirSizes));

	return {
		1: sum(dirSizes.filter((size) => size <= 100000)),
		2: Math.min(...dirSizes.filter((size) => size >= target))
	}
}