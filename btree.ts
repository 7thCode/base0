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

const find = (upper_node:TreeNode,current_node: TreeNode, find_key: number): [TreeNode,TreeNode, Entry] => {
	const size = current_node.data.length;
	for (let index: number = 0; index < size; index++) {
		const lesser_entry: Entry = current_node.data[index];

		// 先頭、中間
		if (index < size - 1) {
			const grater_entry: Entry = current_node.data[index + 1];

			if (find_key === grater_entry.key) {
				return [upper_node,current_node, grater_entry];
			}

			if (between(find_key, lesser_entry.key, grater_entry.key)) {
				if (grater_entry.lesser) {
					return find(current_node,grater_entry.lesser, find_key);
				}
			}

			if (find_key > grater_entry.key) {
				if (grater_entry.grater) {
					return find(current_node,grater_entry.grater, find_key);
				}
			}
		}

		// 先頭、中間、終端
		if (find_key === lesser_entry.key) {
			return [upper_node,current_node, lesser_entry];
		}

		if (find_key < lesser_entry.key) {
			if (lesser_entry.lesser) {
				return find(current_node,lesser_entry.lesser, find_key);
			}
		}

		if (find_key > lesser_entry.key) {
			if (lesser_entry.grater) {
				return find(current_node,lesser_entry.grater, find_key);
			}
		}

	}
	return [upper_node,current_node, null];
}

console.log("360 :", find(null,r, 360)[2].value);

let [node, entry] = find(null,r, 151)

console.log("003 :", node, entry);

console.log("003 :", find(null,r, 3)[2].value);
console.log("100 :", find(null,r, 100)[2].value);
console.log("120 :", find(null,r, 120)[2].value);
console.log("150 :", find(null,r, 150)[2].value);
console.log("200 :", find(null,r, 200)[2].value);
console.log("320 :", find(null,r, 320)[2].value);
console.log("330 :", find(null,r, 330)[2].value);
console.log("340 :", find(null,r, 340)[2].value);
console.log("350 :", find(null,r, 350)[2].value);
console.log("360 :", find(null,r, 360)[2].value);
console.log("400 :", find(null,r, 400)[2].value);
console.log("500 :", find(null,r, 500)[2].value);
console.log("600 :", find(null,r, 600)[2].value);

//for (let i = 0; i < 601; i+= 1) {
//	console.log( i + " :", find(r, i).value);
//}


const insert = (current_node: TreeNode,key:number,value:number):TreeNode => {
	const [upper, node, entry] = find(null,current_node, key);
	if (!entry) {
		for (let index = 0;index < node.data.length; index++) {
			if (node.data[index].key > key) {
				node.data.splice(index, 0, {
					key: key,
					value: value,
					lesser: null,
					grater: null
				});
				break;
			}
		}
		return node;
	}
}

const result = insert(r, 361, 100);

console.log(result);
