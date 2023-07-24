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
var TreeNode = /** @class */ (function () {
    function TreeNode() {
    }
    return TreeNode;
}());
var Entry = /** @class */ (function () {
    function Entry() {
    }
    return Entry;
}());
var node_size = 4;
var r = {
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
                    }
                ]
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
                                }
                            ]
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
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
var between = function (value, start, end) {
    return ((start < value) && (value < end));
};
var find = function (upper_node, current_node, find_key) {
    var size = current_node.data.length;
    for (var index = 0; index < size; index++) {
        var lesser_entry = current_node.data[index];
        // 先頭、中間
        if (index < size - 1) {
            var grater_entry = current_node.data[index + 1];
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
var is_full = function (current_node) {
    return (node_size === current_node.data.length);
};
var compare = function (current_node, key) {
    var result = 0;
    var size = current_node.data.length;
    var min = current_node.data[0];
    var max = current_node.data[size - 1];
    if (key < min.key) {
        result = -1;
    }
    else if (key > max.key) {
        result = 1;
    }
    return result;
};
var insert_entry = function (current_node, key, value) {
    var size = current_node.data.length;
    for (var index = 0; index < size; index++) {
        if (current_node.data[index].key > key) {
            current_node.data.splice(index, 0, {
                key: key,
                value: value,
                lesser: null,
                grater: null
            });
            break;
        }
        else if (index === size - 1) {
            current_node.data.push({
                key: key,
                value: value,
                lesser: null,
                grater: current_node.data[index].grater
            });
            current_node.data[index].grater = null;
        }
    }
    return current_node;
};
var insert = function (current_node, key, value) {
    var result = null;
    var _a = find(null, current_node, key), upper_target = _a[0], target = _a[1], entry = _a[2];
    if (compare(target, key) === -1) { // 子のminより小さい
        if (!is_full(upper_target)) { // 親に空きがある
            if (!entry) { // target_nodeに同じキーはない
                result = insert_entry(upper_target, key, value);
            }
        }
    }
    else {
        if (!is_full(target)) { // 空きがある
            result = insert_entry(target, key, value);
        }
    }
    return result;
};
var result = insert(r, 361, 100);
console.log(result);
console.log(r);
/*
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
*/
//# sourceMappingURL=btree.js.map