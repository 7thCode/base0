// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
    production: false,
    endPoint: "",
    webSocket: "",
    displayServerName: "http://localhost:3000",
    headers: {
        "Accept": "application/json; charset=utf-8",
        "Content-Type": "application/json; charset=utf-8",
    },
    use_publickey: false,
    is_electron: false,
    gcp: {
        credentials: "aigia-315003.json",
        storage_service: "https://storage.googleapis.com",
        bucket_name: "aigia_image",
    },
    default: {
        nickname: "manage",
        username: "admin@aigia.co.jp"
    },
    video_layout: [
        {
            name: "AIGIA メソッド動画",
            row: [
                {
                    noobs: false,
                    name: "前傾ライン",
                    sub_categories: [
                        {
                            name: "",
                            column: [
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail01_001.png",
                                    path: "/videos/lesson01_001.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "正しい前傾ラインの作り方"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail01_002.png",
                                    path: "/videos/lesson01_002.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "自宅でできるスイングドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail01_003.png",
                                    path: "/videos/lesson01_003.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "肩の回転ドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail01_004.png",
                                    path: "/videos/lesson01_004.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "前傾キープのコツ！脇腹の使い方"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail01_005.png",
                                    path: "/videos/lesson01_005.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "前傾キープのコツ！お尻の使い方"
                                    }
                                },
                            ],
                        }
                    ],
                },
                {
                    noobs: false,
                    name: "センターポジション",
                    sub_categories: [
                        {
                            name: "",
                            column: [
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail02_001.png",
                                    path: "/videos/lesson02_001.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "体重移動し過ぎ！修正ドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail02_002.png",
                                    path: "/videos/lesson02_002.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "下半身リードの体重移動"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail02_003.png",
                                    path: "/videos/lesson02_003.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "右腰の動き方！左への体重移動"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail02_004.png",
                                    path: "/videos/lesson02_004.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "横に軸がブレる人！必見"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail02_005.png",
                                    path: "/videos/lesson02_005.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "レベルUPできる下半身リードのダウンスイング"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail02_006.png",
                                    path: "/videos/lesson02_006.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "スイング中の体重移動を簡単に覚えよう"
                                    }
                                },
                            ],
                        }
                    ],
                },
                {
                    noobs: false,
                    name: "センターライン",
                    sub_categories: [
                        {
                            name: "",
                            column: [
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail03_001.png",
                                    path: "/videos/lesson03_001.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "インパクト！右傾き修正"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail03_002.png",
                                    path: "/videos/lesson03_002.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "インパクト！左傾き修正"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail03_003.png",
                                    path: "/videos/lesson03_003.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "スイングバランス素振りドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail03_004.png",
                                    path: "/videos/lesson03_004.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "数値を合わせる！肩の回転ドリル"
                                    }
                                },
                            ],
                        }
                    ]
                },
                {
                    noobs: false,
                    name: "ライト・レフトライン",
                    sub_categories: [
                        {
                            name: "",
                            column: [
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail04_001.png",
                                    path: "/videos/lesson04_001.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "右腰が動き過ぎ！修正ドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail04_002.png",
                                    path: "/videos/lesson04_002.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "右腰が引けてる！修正ドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail04_003.png",
                                    path: "/videos/lesson04_003.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "インパクト時の左腰のポジション"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail04_004.png",
                                    path: "/videos/lesson04_004.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "左腰が動き過ぎ！修正ドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail04_005.png",
                                    path: "/videos/lesson04_005.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "左腰が引けてる！修正ドリル"
                                    }
                                },
                            ],
                        }
                    ]
                },
                {
                    noobs: false,
                    name: "ネックポジション",
                    sub_categories: [
                        {
                            name: "",
                            column: [
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail09_001.png",
                                    path: "/videos/lesson09_001.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "ネックポジションのキープと軸回転"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail09_002.png",
                                    path: "/videos/lesson09_002.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "飛距離UPのビハインザボールインパクト"
                                    }
                                },
                            ],
                        }
                    ]
                },
                {
                    noobs: false,
                    name: "右膝・左膝の角度",
                    sub_categories: [
                        {
                            name: "",
                            column: [
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail10_001.png",
                                    path: "/videos/lesson10_001.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "トップまでの右膝のキープ"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail10_002.png",
                                    path: "/videos/lesson10_002.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "スイングをレベルUPさせる右膝の使い方"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail10_003.png",
                                    path: "/videos/lesson10_003.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "スイング中の左膝のチェック"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail10_004.png",
                                    path: "/videos/lesson10_004.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "左膝を使った左腰の回転スピードUP"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail10_005.png",
                                    path: "/videos/lesson10_005.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "両膝の動きと体重移動"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail10_006.png",
                                    path: "/videos/lesson10_006.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "両膝の角度キープと正しいスイング"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail10_007.png",
                                    path: "/videos/lesson10_007.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "膝の柔軟性とコースでのライの対応"
                                    }
                                },
                            ],
                        }
                    ]
                },
                {
                    noobs: false,
                    name: "グリップ&アドレス",
                    sub_categories: [
                        {
                            name: "",
                            column: [
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail06_001.png",
                                    path: "/videos/lesson06_001.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "正しいグリップの握り方"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail06_002.png",
                                    path: "/videos/lesson06_002.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "アドレス！３つのチェックポイント"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail06_003.png",
                                    path: "/videos/lesson06_003.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "とても大事！ボールポジション"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail06_004.png",
                                    path: "/videos/lesson06_004.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "正しい前傾ポジションの作り方"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail06_005.png",
                                    path: "/videos/lesson06_005.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "アプローチのアドレス"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail06_006.png",
                                    path: "/videos/lesson06_006.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "ここがポイント！アプローチの基本　Yの文字"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail06_007.png",
                                    path: "/videos/lesson06_007.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "アプローチの距離の打ち分けドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail06_008.png",
                                    path: "/videos/lesson06_008.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "距離があるアプローチの打ち方ドリル"
                                    }
                                },
                            ],
                        }
                    ]
                },
                {
                    noobs: false,
                    name: "スイング修正ドリル",
                    sub_categories: [
                        {
                            name: "",
                            column: [
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail05_001.png",
                                    path: "/videos/lesson05_001.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "ハーフスイングドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail05_002.png",
                                    path: "/videos/lesson05_002.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "ハンドファースト練習ドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail05_003.png",
                                    path: "/videos/lesson05_003.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "ヘッドスピード UPドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail05_004.png",
                                    path: "/videos/lesson05_004.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "ボディー！回転スピードUPドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail05_005.png",
                                    path: "/videos/lesson05_005.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "完璧なハーフスイング"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail05_006.png",
                                    path: "/videos/lesson05_006.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "ハンドファースト！右肘の使い方"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail05_007.png",
                                    path: "/videos/lesson05_007.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "正しいハーフスイングドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail05_008.png",
                                    path: "/videos/lesson05_008.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "カット軌道！修正ドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail05_009.png",
                                    path: "/videos/lesson05_009.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "ミート率UPにとても大事なドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail05_010.png",
                                    path: "/videos/lesson05_010.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "スライス修正ドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail05_011.png",
                                    path: "/videos/lesson05_011.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "フェースが右！右曲がり修正ドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail05_012.png",
                                    path: "/videos/lesson05_012.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "引っ掛けフック！修正ドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail05_013.png",
                                    path: "/videos/lesson05_013.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "クラブと体の動きを合わせるドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail05_014.png",
                                    path: "/videos/lesson05_014.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "スイング安定！HBのポジション"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail05_015.png",
                                    path: "/videos/lesson05_015.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "スイング軌道を安定させる連続素振り"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail05_016.png",
                                    path: "/videos/lesson05_016.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "腕の使い方を覚える水平スイング"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail05_017.png",
                                    path: "/videos/lesson05_017.m4v",
                                    metadata: {
                                        noobs: false,
                                        description: "フェースコントロール"
                                    }
                                },
                            ],
                        }
                    ]
                },
                {
                    noobs: true,
                    name: "レッスンプログラム",
                    sub_categories: [
                        {
                            name: "Step1・前傾ラインキープ",
                            column: [
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail07_001.png",
                                    path: "/videos/lesson07_001.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "自宅でできるスイングドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail07_002.png",
                                    path: "/videos/lesson07_002.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "ヘッドスピードUP"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail07_003.png",
                                    path: "/videos/lesson07_003.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "足を揃えてのスイング練習"
                                    }
                                }
                            ],
                        },
                        {
                            name: "Step2・センターポジション",
                            column: [
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail07_004.png",
                                    path: "/videos/lesson07_004.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "正しい体重移動の練習ドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail07_005.png",
                                    path: "/videos/lesson07_005.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "体重移動にスイングを合わせる！"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail07_006.png",
                                    path: "/videos/lesson07_006.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "ハーフスイングで体重移動"
                                    }
                                },
                            ],
                        },
                        {
                            name: "Step3・二つの骨格を同時にチェック",
                            column: [
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail07_007.png",
                                    path: "/videos/lesson07_007.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "同時に２つの数値を合わせる"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail07_008.png",
                                    path: "/videos/lesson07_008.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "パワースイングドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail07_009.png",
                                    path: "/videos/lesson07_009.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "スイングドリル"
                                    }
                                },
                            ],
                        },
                        {
                            name: "Step4・センターライン",
                            column: [
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail07_010.png",
                                    path: "/videos/lesson07_010.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "スイング中の手の動かし方"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail07_011.png",
                                    path: "/videos/lesson07_011.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "フェース向きのチェック"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail07_012.png",
                                    path: "/videos/lesson07_012.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "スイングをセルフチェック"
                                    }
                                },
                            ],
                        },
                        {
                            name: "Step5・３つの骨格を同時にチェック",
                            column: [
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail07_013.png",
                                    path: "/videos/lesson07_013.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "テー打ち素振りドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail07_014.png",
                                    path: "/videos/lesson07_014.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "とても大事な手元の通過位置"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail07_015.png",
                                    path: "/videos/lesson07_015.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "スイング中の正しい体重移動"
                                    }
                                },
                            ],
                        }
                    ]
                },
                {
                    noobs: true,
                    name: "スイング修正ドリル",
                    sub_categories: [
                        {
                            name: "Step1・スイング",
                            column: [
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail08_001.png",
                                    path: "/videos/lesson08_001.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "自宅でできるエアースイング"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail08_002.png",
                                    path: "/videos/lesson08_002.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "ハーフ連続スイングドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail08_003.png",
                                    path: "/videos/lesson08_003.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "ヘッドスピードUP！手首の動き"
                                    }
                                },
                            ],
                        },
                        {
                            name: "Step2・ポジションチェック",
                            column: [
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail08_004.png",
                                    path: "/videos/lesson08_004.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "トップでの手首の角度"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail08_005.png",
                                    path: "/videos/lesson08_005.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "インパクトのイメージドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail08_006.png",
                                    path: "/videos/lesson08_006.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "腰の回転を意識したスイング"
                                    }
                                },
                            ],
                        },
                        {
                            name: "Step3・体重移動",
                            column: [
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail08_007.png",
                                    path: "/videos/lesson08_007.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "下半身リードのスイングドリル"
                                    }
                                },
                            ],
                        },
                        {
                            name: "Step4・右腰の動き",
                            column: [
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail08_008.png",
                                    path: "/videos/lesson08_008.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "レフトラインの数値を合わせる"
                                    }
                                },
                            ],
                        },
                        {
                            name: "Step5・ハンドファースト",
                            column: [
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail08_009.png",
                                    path: "/videos/lesson08_009.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "ハンドファースト練習ドリル"
                                    }
                                },
                                {
                                    thumbnail: "/images/videos/thumbnail/thumbnail08_010.png",
                                    path: "/videos/lesson08_010.m4v",
                                    metadata: {
                                        noobs: true,
                                        description: "ハンドファースト！右肘の使い方"
                                    }
                                },
                            ],
                        }
                    ]
                },
            ]
        }
    ],
    meta: {
        top: {
            title: "AIGIA メンバー　会員サイト",
            description: [
                { name: 'description', content: "AIGIAメンバーへのご登録、あなたのスイングデータを見るためのAIGIAログインページへのアクセスはこちらから" },
                { name: 'keywords', content: "AIGIA,ゴルフ,AI,システム,IT,ディテクト,スイング,弾道計測,インドアゴルフ,計測機器,骨格,非接触" },
                { name: 'twitter:card', content: "" },
                { name: 'twitter:site', content: "" },
                { property: 'og:url', content: "" },
                { property: 'og:title', content: "AIGIA メンバー 会員サイト" },
                { property: 'og:description', content: "AIGIAメンバーへのご登録、あなたのスイングデータを見るためのAIGIAログインページへのアクセスはこちらから" },
                { property: 'og:image', content: "" }
            ]
        },
        description: {
            title: "DESC",
            description: [
                { name: 'twitter:card', content: "" },
                { name: 'twitter:site', content: "" },
                { property: 'og:url', content: "" },
                { property: 'og:title', content: "AIGIA メンバー 会員サイト" },
                { property: 'og:description', content: "AIGIAメンバーへのご登録、あなたのスイングデータを見るためのAIGIAログインページへのアクセスはこちらから" },
                { property: 'og:image', content: "" }
            ]
        }
    },
    analytics: {
        id: 'G-*******-*' // IDを設定する、environment.prod.tsにも
    },
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
//# sourceMappingURL=environment.js.map