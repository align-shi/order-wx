
/**
 * 假设这是服务器获取的数据
 */

const constants = [
  {
    "id": "id1",
    "name": "🎉每日特价",
    "describe": "一毛钱就能吃大餐",
    "category": [
      {
        "category_id": 1,
        "category_name": "category1",
        "num":0,
      },
      {
        "category_id": 2,
        "category_name": "category2",
        "num": 0,
      },
      {
        "category_id": 3,
        "category_name": "category3",
        "num": 0,
      }
    ],
  },
  {
    "id": "id2",
    "name": "🍔招牌美食",
    "describe": "店长极力推荐这几种美食",
    "category": [
      {
        "category_id": 4,
        "category_name": "category4",
        "num": 0,
      },
      {
        "category_id": 5,
        "category_name": "category5",
        "num": 0,
      },
      {
        "category_id": 6,
        "category_name": "category6",
        "num": 0,
      },
      {
        "category_id": 7,
        "category_name": "category7",
        "num": 0,
      },
      {
        "category_id": 8,
        "category_name": "category8",
        "num": 0,
      }, {
        "category_id": 9,
        "category_name": "category9",
        "num": 0,
      },
      {
        "category_id": 10,
        "category_name": "category10",
        "num": 0,
      },
      {
        "category_id": 11,
        "category_name": "category11",
        "num": 0,
      },
      {
        "category_id": 12,
        "category_name": "category12",
        "num": 0,
      },
      {
        "category_id": 13,
        "category_name": "category13",
        "num": 0,
      },
      {
        "category_id": 14,
        "category_name": "category14",
        "num": 0,
      },
      {
        "category_id": 15,
        "category_name": "category15",
        "num": 0,
      },
      {
        "category_id": 16,
        "category_name": "category16",
        "num": 0,
      },
    ]
  },
  {
    "id": "id3",
    "name": "🍷清爽饮品",
    "describe": "炎炎夏日有它就够了",
    "category": [
      {
        "category_id": 17,
        "category_name": "category17",
        "num": 0,
      },
      {
        "category_id": 18,
        "category_name": "category18",
        "num": 0,
      },
      {
        "category_id": 19,
        "category_name": "category19",
        "num": 0,
      }
    ],
  },
  {
    "id": "id4",
    "name": "🙌情侣套餐",
    "describe": "不多不少刚刚好",
    "category": [
      {
        "category_id": 20,
        "category_name": "category20",
        "num": 0,
      },
      {
        "category_id": 21,
        "category_name": "category21",
        "num": 0,
      },
      {
        "category_id": 22,
        "category_name": "category22",
        "num": 0,
      },
      {
        "category_id": 23,
        "category_name": "category23",
        "num": 0,
      },
      {
        "category_id": 24,
        "category_name": "category24",
        "num": 0,
      },
      {
        "category_id": 25,
        "category_name": "category25",
        "num": 0,
      },
      {
        "category_id": 26,
        "category_name": "category26",
        "num": 0,
      },
      {
        "category_id": 27,
        "category_name": "category27",
        "num": 0,
      },
      {
        "category_id": 28,
        "category_name": "category28",
        "num": 0,
      },
      {
        "category_id": 29,
        "category_name": "category29",
        "num": 0,
      },
      {
        "category_id": 30,
        "category_name": "category30",
        "num": 0,
      },
      {
        "category_id": 31,
        "category_name": "category31",
        "num": 0,
      },
      {
        "category_id": 32,
        "category_name": "category32",
        "num": 0,
      }
    ],
  },
  {
    "id": "id5",
    "name": "🥚单人套餐",
    "describe": "慢慢一大份足够吃",
    "category": [
      {
        "category_id": 33,
        "category_name": "category33",
        "num": 0,
      },
      {
        "category_id": 34,
        "category_name": "category34",
        "num": 0,
      },
      {
        "category_id": 35,
        "category_name": "category35",
        "num": 0,
      }
    ],
  },
  {
    "id": "id6",
    "name": "🧀浓郁披萨",
    "describe": "这口感非常棒",
    "category": [
      {
        "category_id": 36,
        "category_name": "category36",
        "num": 0,
      },
      {
        "category_id": 37,
        "category_name": "category37",
        "num": 0,
      },
      {
        "category_id": 38,
        "category_name": "category38",
        "num": 0,
      }
    ],
  },
  {
    "id": "id7",
    "name": "🍲主食区域",
    "describe": "家常主食啥都有",
    "category": [
      {
        "category_id": 39,
        "category_name": "category39",
        "num": 0,
      },
      {
        "category_id": 40,
        "category_name": "category40",
        "num": 0,
      },
      {
        "category_id": 41,
        "category_name": "category41",
        "num": 0,
      }
    ],
  },
  {
    "id": "id8",
    "name": "🍻酒水饮料",
    "describe": "清凉解渴很爽",
    "category": [
      {
        "category_id": 42,
        "category_name": "category42",
        "num": 0,
      },
      {
        "category_id": 43,
        "category_name": "category43",
        "num": 0,
      },
      {
        "category_id": 44,
        "category_name": "category44",
        "num": 0,
      }
    ],
  },
  {
    "id": "id9",
    "name": "🥘土豪加料",
    "describe": "你想加的这里都有",
    "category": [
      {
        "category_id": 45,
        "category_name": "category45",
        "num": 0,
      },
      {
        "category_id": 46,
        "category_name": "category46",
        "num": 0,
      },
      {
        "category_id": 47,
        "category_name": "category47",
        "num": 0,
      }
    ],
  },
  {
    "id": "id10",
    "name": "🍟免费薯条",
    "describe": "0元薯条免费吃",
    "category": [
      {
        "category_id": 48,
        "category_name": "category48",
        "num": 0,
      },
      {
        "category_id": 49,
        "category_name": "category49",
        "num": 0,
      },
      {
        "category_id": 50,
        "category_name": "category50",
        "num": 0,
      }
    ],
  },
 
]

module.exports =  constants

