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
var Entry = /** @class */ (function () {
    function Entry() {
    }
    return Entry;
}());
var node_size = 4;
var key = 0;
var value = 1;
var lesser = 2;
var grater = 3;
var d = [
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
var field = function (record_no) {
    var record = d[record_no * 4];
    return {
        key: record[key],
        value: record[value],
        lesser: record[lesser],
        grater: record[grater]
    };
};
var r = [
    {
        key: 150,
        value: 3,
        lesser: [
            { key: 3, value: 0, lesser: null, grater: null },
            { key: 100, value: 1, lesser: null, grater: null },
            { key: 120, value: 2, lesser: null, grater: null },
            { key: null, value: null, lesser: null, grater: null },
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
                    { key: 320, value: 5, lesser: null, grater: null },
                    { key: 330, value: 6, lesser: null, grater: null },
                    { key: 340, value: 7, lesser: null, grater: null },
                    { key: 350, value: 8, lesser: null, grater: null }
                ],
                grater: [
                    { key: 400, value: 10, lesser: null, grater: null },
                    { key: 500, value: 11, lesser: null, grater: null },
                    { key: 600, value: 12, lesser: null, grater: null },
                    { key: null, value: null, lesser: null, grater: null }
                ]
            },
            { key: null, value: null, lesser: null, grater: null },
            { key: null, value: null, lesser: null, grater: null },
            { key: null, value: null, lesser: null, grater: null }
        ]
    },
    { key: null, value: null, lesser: null, grater: null },
    { key: null, value: null, lesser: null, grater: null }
];
var between = function (value, start, end) {
    return ((start < value) && (value < end));
};
var find = function (upper_node, current_node, find_key) {
    var _size = size(current_node); // current_node.length;
    for (var index = 0; index < _size; index++) {
        var lesser_entry = current_node[index];
        // 先頭、中間
        if (index < _size - 1) {
            var grater_entry = current_node[index + 1];
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
};
var size = function (current_node) {
    var result = node_size;
    for (var index = 0; index < node_size; index++) {
        var entry = current_node[index];
        if (entry.key == null) {
            result = index;
            break;
        }
    }
    return result;
};
var is_full = function (current_node) {
    return (node_size === size(current_node));
};
var compare = function (current_node, key) {
    var result = 0;
    var _size = size(current_node);
    var min = current_node[0];
    var max = current_node[_size - 1];
    if (key < min.key) {
        result = -1;
    }
    else if (key > max.key) {
        result = 1;
    }
    return result;
};
var insert_entry = function (current_node, key, value) {
    var _size = size(current_node);
    for (var index = 0; index < _size; index++) {
        if (current_node[index].key > key) {
            current_node[index] = {
                key: key,
                value: value,
                lesser: null,
                grater: null
            };
            break;
        }
        else if (index === _size - 1) {
            current_node[_size] = {
                key: key,
                value: value,
                lesser: null,
                grater: current_node[index].grater
            };
            current_node[index].grater = null;
        }
    }
    return current_node;
};
var split = function (current_node, key, value) {
    return current_node;
};
var insert = function (current_node, key, value) {
    var result = null;
    var _a = find(null, current_node, key), upper_target = _a[0], target = _a[1], entry = _a[2];
    if (!entry) { // target_nodeに同じキーはない
        if (compare(target, key) === -1) { // 子のminより小さい
            if (!is_full(upper_target)) { // 親に空きがある
                result = insert_entry(upper_target, key, value);
            }
            else {
                result = split(upper_target, key, value);
            }
        }
        else {
            if (!is_full(target)) { // 空きがある
                result = insert_entry(target, key, value);
            }
            else {
                result = split(target, key, value);
            }
        }
    }
    return result;
};
var result = insert(r, 361, 100);
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
//# sourceMappingURL=btree.js.map