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

class TreeNode {
	public data: Entry[];
}

class Entry {
	public key: number;
	public value: number;
	public lesser: TreeNode;
	public grater: TreeNode;
}

let r: TreeNode = {
	data: [
		{
			key: 150,
			value: 3,
			lesser: {
				data: [
					{
						key: 3,
						value: 0,
						lesser: null,
						grater: null
					},
					{
						key: 100,
						value: 1,
						lesser: null,
						grater: null
					},
					{
						key: 120,
						value: 2,
						lesser: null,
						grater: null
					}],
			},
			grater: null
		},
		{
			key: 200,
			value: 4,
			lesser: null,
			grater: {
				data: [
					{
						key: 360,
						value: 9,
						lesser: {
							data: [
								{
									key: 320,
									value: 5,
									lesser: null,
									grater: null
								},
								{
									key: 330,
									value: 6,
									lesser: null,
									grater: null
								}, {
									key: 340,
									value: 7,
									lesser: null,
									grater: null
								}, {
									key: 350,
									value: 8,
									lesser: null,
									grater: null
								}],
						},
						grater: {
							data: [
								{
									key: 400,
									value: 10,
									lesser: null,
									grater: null
								},
								{
									key: 500,
									value: 11,
									lesser: null,
									grater: null
								},
								{
									key: 600,
									value: 12,
									lesser: null,
									grater: null
								}],
						}
					}],
			},
		}],
}


const between = (value: number, start: number, end: number): boolean => {
	return ((start < value) && (value < end));
}

const find = (current_node: TreeNode, find_key: number): [TreeNode, Entry] => {
	const size = current_node.data.length;
	for (let index: number = 0; index < size; index++) {
		const lesser_entry: Entry = current_node.data[index];

		// 先頭、中間
		if (index < size - 1) {
			const grater_entry: Entry = current_node.data[index + 1];

			if (find_key === grater_entry.key) {
				return [current_node, grater_entry];
			}

			if (between(find_key, lesser_entry.key, grater_entry.key)) {
				if (grater_entry.lesser) {
					return find(grater_entry.lesser, find_key);
				}
			}

			if (find_key > grater_entry.key) {
				if (grater_entry.grater) {
					return find(grater_entry.grater, find_key);
				}
			}
		}

		// 先頭、中間、終端
		if (find_key === lesser_entry.key) {
			return [current_node, lesser_entry];
		}

		if (find_key < lesser_entry.key) {
			if (lesser_entry.lesser) {
				return find(lesser_entry.lesser, find_key);
			}
		}

		if (find_key > lesser_entry.key) {
			if (lesser_entry.grater) {
				return find(lesser_entry.grater, find_key);
			}
		}

	}
	return [current_node, null];
}


let [node, entry] = find(r, 350)

console.log("003 :", node, entry);

console.log("003 :", find(r, 3)[1].value);
console.log("100 :", find(r, 100)[1].value);
console.log("120 :", find(r, 120)[1].value);
console.log("150 :", find(r, 150)[1].value);
console.log("200 :", find(r, 200)[1].value);
console.log("320 :", find(r, 320)[1].value);
console.log("330 :", find(r, 330)[1].value);
console.log("340 :", find(r, 340)[1].value);
console.log("350 :", find(r, 350)[1].value);
console.log("360 :", find(r, 360)[1].value);
console.log("400 :", find(r, 400)[1].value);
console.log("500 :", find(r, 500)[1].value);
console.log("600 :", find(r, 600)[1].value);

//for (let i = 0; i < 601; i+= 1) {
//	console.log( i + " :", find(r, i).value);
//}



