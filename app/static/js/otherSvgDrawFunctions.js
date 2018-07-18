function drawCards(svg, svgWidth, svgHeight, cards) {
    var cardsGroup, xOffset, yOffset;

    xOffset = svgWidth / 2;
    yOffset = Math.max(svgHeight / 2, (4 / 3) * cards.height);
    cardsGroup = svg.group({transform: "translate(" + xOffset + ", " + yOffset + ")"});
    drawCardDeck(svg, cardsGroup, cards);
}

function drawTradeScreen(svg, svgWidth, svgHeight, cards, isTradeScreen) {
    var tradeCardsGroup, xOffset, yOffset;

    xOffset = svgWidth / 2;
    // yOffset = Math.max(svgHeight / 2, (4 / 3) * cards.height);
    yOffset = Math.min(svgHeight / 2, svgHeight - ((4 / 3) * cards.height));
    tradeCardsGroup = svg.group({transform: "translate(" + xOffset + ", " + yOffset + ") rotate(180)"});
    drawCardDeck(svg, tradeCardsGroup, cards);
}

// Draws a card deck in a given svg, in a given group (the group can have transformations applied to it)
function drawCardDeck(svg, group, cards) {
    var card, cardGroup, settings;

    for(var i = 0; i < cards.cards.length; i++) {
        card = cards.cards[i];
        settings = $.extend({}, cards.rectSettings);
        settings.id = "card" + i + "_" + card.type;
        settings.fill = card.color;
        cardGroup = svg.group(group, {transform: "translate(0, " + cards.spreadRadius + ") rotate(" + card.rotation + ") translate(0, -" + cards.spreadRadius + ")"});
        svg.rect(cardGroup, cards.width / -2, cards.height / -2, cards.width, cards.height, cards.width / 8, cards.width / 8, settings);
    }
}

// ocap = owned cards and pieces
function drawOwnedCardsAndPieces(svg, group, ocap) {
    drawName(svg, group, ocap);
    drawUniqueCards(svg, group, ocap);
    drawOwnedPieces(svg, group, ocap);
    drawDevCards(svg, group, ocap);
}

function drawName(svg, group, ocap) {
    // svg.rect(group, ocap.nameLeft, ocap.nameTop, ocap.nameWidth, ocap.nameHeight, {fill: ocap.nameBgColor});
    svg.text(group, ocap.nameLeft, ocap.nameTop, ocap.name, ocap.nameSettings);
}

// Draws the unique cards for drawOwnedCardsAndPieces
function drawUniqueCards(svg, group, ocap) {
    var g, img, settings, ucLeft, ucTop;

    ucLeft = ocap.uniqueCardLeft;
    ucTop = ocap.uniqueCardTop;
    // First draw the unique cards if applicable
    if(ocap.longestTradingRoute) {
        settings = $.extend({}, ocap.uniqueCardSettings);
        settings.transform = "translate(" + ucLeft + ", " + ucTop + ")";
        g = svg.group(group, "longestTradingRoute" + ocap.playerId, settings);
        img = svg.image(g, 0, 0, ocap.uniqueCardWidth, ocap.uniqueCardHeight, ocap.longestTradingRoute);
        svg.title(img, "You have the longest trading route!");
        // Register that this card is now in front - will be used in the onmouseenter event handler
        $("#ownedCardsAndPieces" + ocap.playerId).attr("inFront", "longestTradingRoute");
        // Make sure the cards are not drawn on top of each other
        ucLeft += ocap.uniqueCardWidth / 8;
        ucTop += ocap.uniqueCardHeight / 8;
    }
    if(ocap.largestArmy) {
        settings = $.extend({}, ocap.uniqueCardSettings);
        settings.transform = "translate(" + ucLeft + ", " + ucTop + ")";
        g = svg.group(group, "largestArmy" + ocap.playerId, settings);
        img = svg.image(g, 0, 0, ocap.uniqueCardWidth, ocap.uniqueCardHeight, ocap.largestArmy);
        svg.title(img, "You have the largest army!");
        $("#ownedCardsAndPieces" + ocap.playerId).attr("inFront", "largestArmy");
    }
}

function drawOwnedPieces(svg, group, ocap) {
    var g, left, settings, top;

    left = ocap.piecesLeft + ocap.piecesDistance + ocap.settlementWidth / 2;
    top = ocap.piecesTop + ocap.settlementHeight;
    settings = {fill: ocap.color};

    if(ocap.color == "white" || ocap.color == "#ffffff") {
        settings.stroke = "black";
    }
    // Settlements on top, then cities, finally roads
    for(var i = 0; i < ocap.settlements; i++) {
        g = svg.group(group, {transform: "translate(" + left + ", " + top + ")"});
        svg.polygon(g, ocap.settlementVertices, settings);
        left += ocap.settlementWidth + ocap.piecesDistance;
    }
    left = ocap.piecesLeft + ocap.piecesDistance + ocap.cityWidth / 2;
    top += ocap.cityHeight + ocap.piecesDistance;
    for(var i = 0; i < ocap.cities; i++) {
        g = svg.group(group, {transform: "translate(" + left + ", " + top + ")"});
        svg.polygon(g, ocap.cityVertices, settings);
        left += ocap.cityWidth + ocap.piecesDistance;
    }
    left = ocap.piecesLeft + ocap.piecesDistance;
    top += ocap.cityHeight / 4 + ocap.piecesDistance;
    for(var i = 0; i < ocap.roads; i++) {
        g = svg.group(group, {transform: "translate(" + left + ", " + top + ")"});
        svg.rect(g, 0, 0, ocap.roadWidth, ocap.roadHeight, settings);
        left += ocap.roadWidth + ocap.piecesDistance - 2;
    }
}

function drawDevCards(svg, group, ocap) {
    var cardGroup, left, spacingX, spacingY, top;

    left = ocap.piecesLeft + ocap.piecesDistance;
    top = ocap.piecesTop + ocap.settlementHeight + 1.25 * ocap.cityHeight + 3 * ocap.piecesDistance + ocap.roadHeight;

    for(var i = 0; i < ocap.devCards.length; i++) {
        spacingX = (1 / 9) * ocap.cardWidth / ocap.devCards[i].count;
        spacingY = 0.25 * ocap.cardHeight / ocap.devCards[i].count;
        for(var j = 0; j < ocap.devCards[i].count; j++) {
            cardGroup = svg.group(group, {transform: "translate(" + (left + j * spacingX) + ", " + (top + j * spacingY) + ")"});
            svg.rect(cardGroup, 0, 0, ocap.cardWidth, ocap.cardHeight, ocap.cardWidth / 8, ocap.cardWidth / 8, {fill: ocap.devCards[i].color, stroke: "black"});
        }
        left += (10 / 9) * ocap.cardWidth + ocap.piecesDistance;
    }
}