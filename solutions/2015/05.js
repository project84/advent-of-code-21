import { NaughtyNiceList } from '../../utils/2015/nice-list'

export default function (inputFile) {

	let list = new NaughtyNiceList(inputFile);

	return {
		1: list.getNiceList(1).length,
		2: list.getNiceList(2).length
	}
}