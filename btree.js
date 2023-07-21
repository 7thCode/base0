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
//const root = new BTreeNode(true);
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
                        value: 6,
                        lesser: {
                            data: [
                                {
                                    key: 320,
                                    value: 5,
                                    lesser: null,
                                    grater: null
                                }
                            ]
                        },
                        grater: {
                            data: [
                                {
                                    key: 400,
                                    value: 7,
                                    lesser: null,
                                    grater: null
                                },
                                {
                                    key: 500,
                                    value: 8,
                                    lesser: null,
                                    grater: null
                                },
                                {
                                    key: 600,
                                    value: 9,
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
var find = function (current_node, find_key) {
    var size = current_node.data.length;
    for (var index = 0; index < size; index++) {
        var lesser_entry = current_node.data[index];
        // 先頭、中間
        if (index < size - 1) {
            var grater_entry = current_node.data[index + 1];
            if (find_key === grater_entry.key) {
                return grater_entry;
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
            return lesser_entry;
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
    return undefined;
};
console.log("003 :", find(r, 3).value);
console.log("100 :", find(r, 100).value);
console.log("120 :", find(r, 120).value);
console.log("150 :", find(r, 150).value);
console.log("200 :", find(r, 200).value);
console.log("320 :", find(r, 320).value);
console.log("360 :", find(r, 360).value);
console.log("400 :", find(r, 400).value);
console.log("500 :", find(r, 500).value);
console.log("600 :", find(r, 600).value);
//# sourceMappingURL=btree.js.map