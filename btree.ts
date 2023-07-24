/*
class BTreeNode {

	static node_size:number = 4;
	private is_root:boolean;

	private data: number[];
	private left_hand: BTreeNode[];
	private right_hand: BTreeNode[];

	constructor(is_root:boolean) {
		this.is_root = is_root;
	}


	public Find(key:number):number {

	}

	public Insert(key:number, value:number):void {

	}

	public Delete(key:number):boolean {

	}

	private Split(key:number): void {

	}

}
*/

class Entry {
	public key: number;
	public value: number;
	public lesser: Entry[];
	public grater: Entry[];
}

const node_size = 4;

const key = 0;
const value = 1;
const lesser = 2;
const grater = 3;

let d: any[][] = [
	[150, 3, 1, null],
	[200, 4, null, 2],
	[null, null, null, null],
	[null, null, null, null],
	[3, 0, null, null],
	[100, 1, null, null],
	[120, 2, null, null],
	[null, null, null, null],
	[360, 9, 3, 4],
	[null, null, null, null],
	[null, null, null, null],
	[null, null, null, null],
	[320, 5, null, null],
	[330, 6, null, null],
	[340, 7, null, null],
	[350, 8, null, null],
	[400, 10, null, null],
	[500, 11, null, null],
	[600, 12, null, null],
	[null, null, null, null]
];

const field = (record_no: number): Entry => {
	const record = d[record_no * 4];
	return {
		key: record[key],
		value: record[value],
		lesser: record[lesser],
		grater: record[grater],
	}

}

let r: Entry[] =
	[
		{
			key: 150,
			value: 3,
			lesser: [
				{key: 3, value: 0, lesser: null, grater: null},
				{key: 100, value: 1, lesser: null, grater: null},
				{key: 120, value: 2, lesser: null, grater: null},
				{key: null, value: null, lesser: null, grater: null},
			],
			grater: null
		},
		{
			key: 200,
			value: 4,
			lesser: null,
			grater: [
				{
					key: 360,
					value: 9,
					lesser: [
						{key: 320, value: 5, lesser: null, grater: null},
						{key: 330, value: 6, lesser: null, grater: null},
						{key: 340, value: 7, lesser: null, grater: null},
						{key: 350, value: 8, lesser: null, grater: null}
					],
					grater: [
						{key: 400, value: 10, lesser: null, grater: null},
						{key: 500, value: 11, lesser: null, grater: null},
						{key: 600, value: 12, lesser: null, grater: null},
						{key: null, value: null, lesser: null, grater: null}
					],
				},
				{key: null, value: null, lesser: null, grater: null},
				{key: null, value: null, lesser: null, grater: null},
				{key: null, value: null, lesser: null, grater: null}],
		},
		{key: null, value: null, lesser: null, grater: null},
		{key: null, value: null, lesser: null, grater: null}
	]

const between = (value: number, start: number, end: number): boolean => {
	return ((start < value) && (value < end));
}


const find = (upper_node: Entry[], current_node: Entry[], find_key: number): [Entry[], Entry[], Entry] => {
	const _size = size(current_node);  // current_node.length;
	for (let index: number = 0; index < _size; index++) {
		const lesser_entry: Entry = current_node[index];

		// 先頭、中間
		if (index < _size - 1) {
			const grater_entry: Entry = current_node[index + 1];

			if (find_key === grater_entry.key) {
				return [upper_node, current_node, grater_entry];
			}

			if (between(find_key, lesser_entry.key, grater_entry.key)) {
				if (grater_entry.lesser) {
					return find(current_node, grater_entry.lesser, find_key);
				}
			}

			if (find_key > grater_entry.key) {
				if (grater_entry.grater) {
					return find(current_node, grater_entry.grater, find_key);
				}
			}
		}

		// 先頭、中間、終端
		if (find_key === lesser_entry.key) {
			return [upper_node, current_node, lesser_entry];
		}

		if (find_key < lesser_entry.key) {
			if (lesser_entry.lesser) {
				return find(current_node, lesser_entry.lesser, find_key);
			}
		}

		if (find_key > lesser_entry.key) {
			if (lesser_entry.grater) {
				return find(current_node, lesser_entry.grater, find_key);
			}
		}

	}
	return [upper_node, current_node, null];
}

const size = (current_node: Entry[]): number => {
	let result = node_size;
	for (let index = 0; index < node_size; index++) {
		const entry: Entry = current_node[index];
		if (entry.key == null) {
			result = index;
			break;
		}
	}
	return result;
}

const is_full = (current_node: Entry[]): boolean => {
	return (node_size === size(current_node));
}

const compare = (current_node: Entry[], key: number): number => {
	let result: number = 0;
	const _size = size(current_node);
	const min: Entry = current_node[0];
	const max: Entry = current_node[_size - 1];
	if (key < min.key) {
		result = -1;
	} else if (key > max.key) {
		result = 1;
	}
	return result;
}

const insert_entry = (current_node: Entry[], key: number, value: number): Entry[] => {
	const _size = size(current_node);
	for (let index = 0; index < _size; index++) {
		if (current_node[index].key > key) {
			current_node[index] = {
				key: key,
				value: value,
				lesser: null,
				grater: null
			}
			break;
		} else if (index === _size - 1) {
			current_node[_size] = {
				key: key,
				value: value,
				lesser: null,
				grater: current_node[index].grater
			}
			current_node[index].grater = null;
		}
	}

	return current_node;
}

const split = (current_node: Entry[], key: number, value: number): Entry[] => {
	return current_node
}

const insert = (current_node: Entry[], key: number, value: number): Entry[] => {
	let result: Entry[] = null;
	const [upper_target, target, entry] = find(null, current_node, key);
	if (!entry) { // target_nodeに同じキーはない
		if (compare(target, key) === -1) { // 子のminより小さい
			if (!is_full(upper_target)) { // 親に空きがある
				result = insert_entry(upper_target, key, value);
			} else {
				result = split(upper_target, key, value);
			}
		} else {
			if (!is_full(target)) { // 空きがある
				result = insert_entry(target, key, value);
			} else {
				result = split(target, key, value);
			}
		}
	}
	return result;
}

const result = insert(r, 361, 100);

// console.log(result);
//console.log(r);


//console.log("360 :", find(null, r, 360)[2].value);

//let [node, entry] = find(null, r, 151)

//console.log("003 :", node, entry);

console.log("003 :", find(null, r, 3)[2].value);
console.log("100 :", find(null, r, 100)[2].value);
console.log("120 :", find(null, r, 120)[2].value);
console.log("150 :", find(null, r, 150)[2].value);
console.log("200 :", find(null, r, 200)[2].value);
console.log("320 :", find(null, r, 320)[2].value);
console.log("330 :", find(null, r, 330)[2].value);
console.log("340 :", find(null, r, 340)[2].value);
console.log("350 :", find(null, r, 350)[2].value);
console.log("360 :", find(null, r, 360)[2].value);
console.log("361 :", find(null, r, 361)[2].value);
console.log("400 :", find(null, r, 400)[2].value);
console.log("500 :", find(null, r, 500)[2].value);
console.log("600 :", find(null, r, 600)[2].value);


