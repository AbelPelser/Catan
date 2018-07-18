var boards = [{
    init: false,
    fieldBorderColor: "#f4deb5",
    fields: [
        {id: 0, col: 2, row: 1, type: "grain", imgSrc: "/static/images/png/AKKER.png", imgRot: 0, number: 2},
        {id: 1, col: 3, row: 1, type: "ore", imgSrc: "/static/images/png/BERGEN.png", imgRot: 0, number: 3},
        {id: 2, col: 4, row: 1, type: "wood", imgSrc: "/static/images/png/BOS.png", imgRot: 0, number: 3},
        {id: 3, col: 2, row: 2, type: "stone", imgSrc: "/static/images/png/HEUVEL.png", imgRot: 0, number: 4},
        {id: 4, col: 3, row: 2, type: "wool", imgSrc: "/static/images/png/WEIDE.png", imgRot: 0, number: 4},
        {id: 5, col: 4, row: 2, type: "grain", imgSrc: "/static/images/png/AKKER.png", imgRot: 0, number: 5},
        {id: 6, col: 5, row: 2, type: "wool", imgSrc: "/static/images/png/WEIDE.png", imgRot: 0, number: 5},
        {id: 7, col: 1, row: 3, type: "wood", imgSrc: "/static/images/png/BOS.png", imgRot: 0, number: 6},
        {id: 8, col: 2, row: 3, type: "stone", imgSrc: "/static/images/png/HEUVEL.png", imgRot: 0, number: 6},
        {id: 9, col: 3, row: 3, type: "", imgSrc: "/static/images/png/HAVEN.png", imgRot: 0},
        {id: 10, col: 4, row: 3, type: "grain", imgSrc: "/static/images/png/AKKER.png", imgRot: 0, number: 8},
        {id: 11, col: 5, row: 3, type: "wool", imgSrc: "/static/images/png/WEIDE.png", imgRot: 0, number: 8},
        {id: 12, col: 2, row: 4, type: "wood", imgSrc: "/static/images/png/BOS.png", imgRot: 0, number: 9},
        {id: 13, col: 3, row: 4, type: "stone", imgSrc: "/static/images/png/HEUVEL.png", imgRot: 0, number: 9},
        {id: 14, col: 4, row: 4, type: "ore", imgSrc: "/static/images/png/BERGEN.png", imgRot: 0, number: 10},
        {id: 15, col: 5, row: 4, type: "grain", imgSrc: "/static/images/png/AKKER.png", imgRot: 0, number: 10},
        {id: 16, col: 2, row: 5, type: "wood", imgSrc: "/static/images/png/BOS.png", imgRot: 0, number: 11},
        {id: 17, col: 3, row: 5, type: "wool", imgSrc: "/static/images/png/WEIDE.png", imgRot: 0, number: 11},
        {id: 18, col: 4, row: 5, type: "ore", imgSrc: "/static/images/png/BERGEN.png", imgRot: 0, number: 12},

        {id: 19, col: 2, row: 0, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 0},
        {id: 20, col: 3, row: 0, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 60},
        {id: 21, col: 4, row: 0, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 60},
        {id: 22, col: 5, row: 0, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 60},
        {id: 23, col: 1, row: 1, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 0},
        {id: 24, col: 5, row: 1, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 120},
        {id: 25, col: 1, row: 2, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 0},
        {id: 26, col: 6, row: 2, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 120},
        {id: 27, col: 0, row: 3, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: -60},
        {id: 28, col: 6, row: 3, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 120},
        {id: 29, col: 1, row: 4, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: -60},
        {id: 30, col: 6, row: 4, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 180},
        {id: 31, col: 1, row: 5, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: -60},
        {id: 32, col: 5, row: 5, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 180},
        {id: 33, col: 2, row: 6, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: -120},
        {id: 34, col: 3, row: 6, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: -120},
        {id: 35, col: 4, row: 6, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: -120},
        {id: 36, col: 5, row: 6, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 180},
    ],
    roads: [
        {player: "blue", fieldId: 10, side: 0},
        {player: "blue", fieldId: 10, side: 4},
        {player: "blue", fieldId: 10, side: 5},
        {player: "red", fieldId: 15, side: 0},
        {player: "red", fieldId: 15, side: 1},
        {player: "red", fieldId: 15, side: 2},
        {player: "white", fieldId: 12, side: 0},
        {player: "white", fieldId: 12, side: 1},
        {player: "orange", fieldId: 18, side: 1},
        {player: "orange", fieldId: 18, side: 2}
    ],
    settlements: [
        {player: "blue", fieldId: 10, vertex: 0},
        {player: "red", fieldId: 15, vertex: 2},
        {player: "white", fieldId: 12, vertex: 0},
        {player: "orange", fieldId: 18, vertex: 1}
    ],
    cities: [
        {player: "blue", fieldId: 10, vertex: 4},
        {player: "red", fieldId: 15, vertex: 0},
        {player: "white", fieldId: 12, vertex: 2},
        {player: "orange", fieldId: 18, vertex: 3}
    ],
    roadClickboxes: [
        {fieldId: 10, side: 1},
        {fieldId: 18, side: 3}
    ],
    crossingClickboxes: [
        {fieldId: 2, vertex: 2},
        {fieldId: 2, vertex: 4},
        {fieldId: 17, vertex: 0},
        {fieldId: 8, vertex: 2},
        {fieldId: 3, vertex: 0},
        {fieldId: 3, vertex: 2}
    ],
    robber: {fieldId: 9, imgSrc: "/static/images/png/robber_m6.png"},

    ownedCardsAndPieces: [
        {
            color: "blue",
            name: "Hans Heikneuter",
            playerId: 0,
            longestTradingRoute: "/static/images/png/tradeRouteCard.png",
            largestArmy: "/static/images/png/armyCard.png",
            devCards: [
                {type: "knight", color: "beige", count: 3},
                {type: "hidden", color: "#404040", count: 2},
                {type: "library", color: "#663300", count: 1}
            ],
            settlements: 5,
            cities: 4,
            roads: 15
        }, {
            color: "red",
            name: "Bert Bromkop",
            playerId: 1,
            longestTradingRoute: "/static/images/png/tradeRouteCard.png",
            largestArmy: "/static/images/png/armyCard.png",
            devCards: [
                {type: "knight", color: "beige", count: 3},
                {type: "hidden", color: "#404040", count: 2},
                {type: "library", color: "#663300", count: 1}
            ],
            settlements: 5,
            cities: 4,
            roads: 15
        }, {
            color: "white",
            name: "Hoofd Broodzaken",
            playerId: 2,
            longestTradingRoute: "/static/images/png/tradeRouteCard.png",
            largestArmy: "/static/images/png/armyCard.png",
            devCards: [
                {type: "knight", color: "beige", count: 3},
                {type: "hidden", color: "#404040", count: 2},
                {type: "library", color: "#663300", count: 1}
            ],
            settlements: 5,
            cities: 4,
            roads: 15

        }, {
            color: "orange",
            name: "Adolf Eichmann",
            playerId: 3,
            longestTradingRoute: "/static/images/png/tradeRouteCard.png",
            largestArmy: "/static/images/png/armyCard.png",
            devCards: [
                {type: "knight", color: "beige", count: 3},
                {type: "hidden", color: "#404040", count: 2},
                {type: "library", color: "#663300", count: 1}
            ],
            settlements: 5,
            cities: 4,
            roads: 15
        }
    ]
}, {
    init: true,
    fieldBorderColor: "#f4deb5",
    fields: [
        {id: 0, col: 2, row: 1, imgRot: 0, number: 2},
        {id: 1, col: 3, row: 1, imgRot: 0, number: 3},
        {id: 2, col: 4, row: 1, type: "wood", imgSrc: "/static/images/png/BOS.png", imgRot: 0},
        {id: 3, col: 2, row: 2, type: "stone", imgSrc: "/static/images/png/HEUVEL.png", imgRot: 0, number: 4},
        {id: 4, col: 3, row: 2, type: "wool", imgSrc: "/static/images/png/WEIDE.png", imgRot: 0, number: 4},
        {id: 5, col: 4, row: 2, type: "grain", imgSrc: "/static/images/png/AKKER.png", imgRot: 0},
        {id: 6, col: 5, row: 2, type: "wool", imgSrc: "/static/images/png/WEIDE.png", imgRot: 0, number: 5},
        {id: 7, col: 1, row: 3, type: "wood", imgSrc: "/static/images/png/BOS.png", imgRot: 0, number: 6},
        {id: 8, col: 2, row: 3, type: "stone", imgSrc: "/static/images/png/HEUVEL.png", imgRot: 0},
        {id: 9, col: 3, row: 3, type: "desert", imgSrc: "/static/images/png/HAVEN.png", imgRot: 0},
        {id: 10, col: 4, row: 3, type: "grain", imgSrc: "/static/images/png/AKKER.png", imgRot: 0, number: 8},
        {id: 11, col: 5, row: 3, imgRot: 0},
        {id: 12, col: 2, row: 4, type: "wood", imgSrc: "/static/images/png/BOS.png", imgRot: 0, number: 9},
        {id: 13, col: 3, row: 4, type: "stone", imgSrc: "/static/images/png/HEUVEL.png", imgRot: 0},
        {id: 14, col: 4, row: 4, type: "ore", imgSrc: "/static/images/png/BERGEN.png", imgRot: 0, number: 10},
        {id: 15, col: 5, row: 4, type: "grain", imgSrc: "/static/images/png/AKKER.png", imgRot: 0, number: 10},
        {id: 16, col: 2, row: 5, type: "wood", imgSrc: "/static/images/png/BOS.png", imgRot: 0, number: 11},
        {id: 17, col: 3, row: 5, type: "wool", imgSrc: "/static/images/png/WEIDE.png", imgRot: 0},
        {id: 18, col: 4, row: 5, type: "ore", imgSrc: "/static/images/png/BERGEN.png", imgRot: 0, number: 12},

        {id: 19, col: 2, row: 0, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 0},
        {id: 20, col: 3, row: 0, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 60},
        {id: 21, col: 4, row: 0, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 60},
        {id: 22, col: 5, row: 0, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 60},
        {id: 23, col: 1, row: 1, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 0},
        {id: 24, col: 5, row: 1, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 120},
        {id: 25, col: 1, row: 2, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 0},
        {id: 26, col: 6, row: 2, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 120},
        {id: 27, col: 0, row: 3, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: -60},
        {id: 28, col: 6, row: 3, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 120},
        {id: 29, col: 1, row: 4, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: -60},
        {id: 30, col: 6, row: 4, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 180},
        {id: 31, col: 1, row: 5, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: -60},
        {id: 32, col: 5, row: 5, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 180},
        {id: 33, col: 2, row: 6, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: -120},
        {id: 34, col: 3, row: 6, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: -120},
        {id: 35, col: 4, row: 6, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: -120},
        {id: 36, col: 5, row: 6, type: "water", imgSrc: "/static/images/png/WATER.png", imgRot: 180},
    ],
    roads: [
        {player: "blue", fieldId: 10, side: 0},
        {player: "blue", fieldId: 10, side: 4},
        {player: "blue", fieldId: 10, side: 5},
        {player: "red", fieldId: 15, side: 0},
        {player: "red", fieldId: 15, side: 1},
        {player: "red", fieldId: 15, side: 2},
        {player: "white", fieldId: 12, side: 0},
        {player: "white", fieldId: 12, side: 1},
        {player: "orange", fieldId: 18, side: 1},
        {player: "orange", fieldId: 18, side: 2}
    ],
    settlements: [
        {player: "blue", fieldId: 10, vertex: 0},
        {player: "red", fieldId: 15, vertex: 2},
        {player: "white", fieldId: 12, vertex: 0},
        {player: "orange", fieldId: 18, vertex: 1}
    ],
    cities: [
        {player: "blue", fieldId: 10, vertex: 4},
        {player: "red", fieldId: 15, vertex: 0},
        {player: "white", fieldId: 12, vertex: 2},
        {player: "orange", fieldId: 18, vertex: 3}
    ],
    roadClickboxes: [
        {fieldId: 10, side: 1},
        {fieldId: 18, side: 3}
    ],
    crossingClickboxes: [
        {fieldId: 2, vertex: 2},
        {fieldId: 2, vertex: 4},
        {fieldId: 17, vertex: 0},
        {fieldId: 8, vertex: 2},
        {fieldId: 3, vertex: 0},
        {fieldId: 3, vertex: 2}
    ],
    robber: {fieldId: 9, imgSrc: "/static/images/png/robber_m6.png"},

    ownedCardsAndPieces: [
        {
            color: "blue",
            name: "Hans Heikneuter",
            playerId: 0,
            longestTradingRoute: "/static/images/png/tradeRouteCard.png",
            largestArmy: "/static/images/png/armyCard.png",
            devCards: [
                {type: "knight", color: "beige", count: 3},
                {type: "hidden", color: "#404040", count: 2},
                {type: "library", color: "#663300", count: 1}
            ],
            settlements: 5,
            cities: 4,
            roads: 15
        }, {
            color: "red",
            name: "Bert Bromkop",
            playerId: 1,
            longestTradingRoute: "/static/images/png/tradeRouteCard.png",
            largestArmy: "/static/images/png/armyCard.png",
            devCards: [
                {type: "knight", color: "beige", count: 3},
                {type: "hidden", color: "#404040", count: 2},
                {type: "library", color: "#663300", count: 1}
            ],
            settlements: 5,
            cities: 4,
            roads: 15
        }, {
            color: "white",
            name: "Hoofd Broodzaken",
            playerId: 2,
            longestTradingRoute: "/static/images/png/tradeRouteCard.png",
            largestArmy: "/static/images/png/armyCard.png",
            devCards: [
                {type: "knight", color: "beige", count: 3},
                {type: "hidden", color: "#404040", count: 2},
                {type: "library", color: "#663300", count: 1}
            ],
            settlements: 5,
            cities: 4,
            roads: 15

        }, {
            color: "orange",
            name: "Adolf Eichmann",
            playerId: 3,
            longestTradingRoute: "/static/images/png/tradeRouteCard.png",
            largestArmy: "/static/images/png/armyCard.png",
            devCards: [
                {type: "knight", color: "beige", count: 3},
                {type: "hidden", color: "#404040", count: 2},
                {type: "library", color: "#663300", count: 1}
            ],
            settlements: 5,
            cities: 4,
            roads: 15
        }
    ]
}];