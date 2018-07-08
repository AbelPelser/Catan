function drawCards(svg, svgWidth, svgHeight, cards) {
    var cardsGroup, xOffset, yOffset;

    xOffset = svgWidth / 2;
    yOffset = Math.max(svgHeight / 2, (4 / 3) * cards.height);
    cardsGroup = svg.group({transform: "translate(" + xOffset + ", " + yOffset + ")"});
    drawCardHelper(svg, cardsGroup, cards);
}

function drawTradeScreen(svg, svgWidth, svgHeight, cards, isTradeScreen) {
    var tradeCardsGroup, xOffset, yOffset;

    xOffset = svgWidth / 2;
    // yOffset = Math.max(svgHeight / 2, (4 / 3) * cards.height);
    yOffset = Math.min(svgHeight / 2, svgHeight - ((4 / 3) * cards.height));
    tradeCardsGroup = svg.group({transform: "translate(" + xOffset + ", " + yOffset + ") rotate(180)"});
    drawCardHelper(svg, tradeCardsGroup, cards);
}

// Draws a card deck in a given svg, in a given group (the group can have transhormations applied to it)
function drawCardHelper(svg, group, cards) {
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
