var escapeElement = document.createElement('textarea');

function htmlEscape(toClean) {
	escapeElement.textContent = toClean;
	return escapeElement.innerHTML;
}

function htmlUnescape(toClean) {
	escapeElement.innerHTML = toClean;
	return escapeElement.textContent;
}

function handleErr(obj, type, msg) {
    if(obj.status == 0) {
        alert("Could not connect");
    } else if(obj.status == 404) {
        alert("Page not found");
    } else if(obj.status == 500) {
        alert("Internal server error");
    } else if(type === "parsererror") {
        alert("JSON parse failed");
    } else if(type === "timeout") {
        alert("Time out error");
    } else if(type === "abort") {
        alert("Ajax request aborted");
    } else {
        alert("Uncaught error");
    }
}

// Event handlers for the clickboxes
function highlightCb(evt) {
    // console.log("highlightCb called for " + evt.target.id);
    var cb = evt.target;

    cb.setAttribute("x", cb.widthHl / -2);
    cb.setAttribute("width", cb.widthHl);
    cb.setAttribute("y", cb.heightHl / -2);
    cb.setAttribute("height", cb.heightHl);
}

function removeCbHighlight(evt) {
    // console.log("removeCbHighlight called for " + evt.target.id);
    var cb = evt.target;

    cb.setAttribute("x", cb.widthDefault / -2);
    cb.setAttribute("width", cb.widthDefault);
    cb.setAttribute("y", cb.heightDefault / -2);
    cb.setAttribute("height", cb.heightDefault);
}

// Initializes all information needed for representing the board
function initBoard(radius, xOffset, yOffset) {
    var centralX, centralY, w;
    var tHeight = Math.sqrt(Math.pow(radius, 2) - Math.pow(radius*0.5, 2));
    var maxNumberFontSize = radius / 3;

    // Init the central coordinates of every field
    for(var i = 0; i < board.fields.length; i++) {
        field = board.fields[i];
        centralX = xOffset + field.col * 2 * tHeight;
        if(field.row % 2 == 1) {
            centralX += tHeight;
        }
        centralY = yOffset + radius + field.row * radius * 1.5;
        field.center = [centralX, centralY];
        // Init information needed for drawing the field's number
        if(field.number) {
            field.numberFontSize = (0.5 + (1 - (Math.abs(field.number - 7) / 5)) * 0.5) * maxNumberFontSize;
            if(field.number < 10) {
                field.numberOffsetX = field.numberFontSize / -3.2;
            } else {
                field.numberOffsetX = field.numberFontSize / -1.6;
            }
            field.numberOffsetY = field.numberFontSize / 2.75;
            field.numberSettings = {fontFamily: "Verdana", fontSize: field.numberFontSize, fill: "black"};
            if(field.number == 6 || field.number == 8) {
                field.numberSettings.fill = "red";
            }
        }
    }

    // Data used for drawing stuff
    board.hexagonVertices = [
        [0, -radius],
        [tHeight, -0.5 * radius],
        [tHeight, 0.5 * radius],
        [0, radius],
        [-tHeight, 0.5 * radius],
        [-tHeight, -0.5 * radius]
    ];
    board.numberCircleRadius = 0.3 * radius;
    // board.maxNumberFontSize = radius / 3;

    board.roadWidth = radius / 2;
    board.roadHeight = board.roadWidth / 5;
    board.rcbWidth = radius / 2;
    board.rcbHeight = board.rcbWidth / 4;
    board.rcbWidthHl = 1.2 * board.rcbWidth;
    board.rcbHeightHl = 2.5 * board.rcbHeight;

    // Temporary solution; eventually we should use neat-looking images for settlements and cities
    w = radius / 5;
    board.settlementVertices = [
        [w / -2, w / 2],
        [w / -2, w / -2],
        [0, -w],
        [w / 2, w / -2],
        [w / 2, w / 2]
    ];
    w = radius / 2.5;
    board.cityVertices = [
        [w / -2, w / 4],
        [w / -2, w / -4],
        [0, w / -4],
        [0, w / -2],
        [w / 4, -3 * w /4],
        [w / 2, w / -2],
        [w / 2, w / 4]
    ];
    board.ccbSize = radius / 3;
    board.ccbSizeHl = radius / 2;

    board.clickboxSettings = {
        class: "clickbox",
        fill: "rgba(0, 0, 0, 0.0)",
        onmousedown: "removeCbHighlight(evt)",
        onmouseenter: "highlightCb(evt)",
        onmouseleave: "removeCbHighlight(evt)",
        onmouseup: "highlightCb(evt)",
        stroke: "rgba(255, 0, 212, 0.8)",
        strokeDashArray: radius / 10,
        strokeWidth: 3
    };

    board.cbAnimStep = 20;
    board.cbAnimProgress = board.cbAnimStep;

    board.robberWidth = radius / 4;
    board.robberHeight = board.robberWidth * 2;
}

function highlightCard(evt) {
    var cardNr = evt.target.id.split("_")[0].split("d")[1];
    var cardHeight = $("#" + evt.target.id).attr("height");
    // console.log("highlightCard " + cardNr + " (" + cardHeight + ")");
    $(evt.target).animate({svgTransform: "translate(0, -" + cardHeight / 3 + ")"}, 250, "linear");
}

function removeCardHl(evt) {
    // console.log("removeCardHl");
    $(evt.target).animate({svgTransform: "translate(0, 0)"}, 250, "linear");
}

// Initialize the information needed to draw the cards
function initCards(cards, svgWidth, svgHeight) {
    // Formula based on trial and error for determining the angle the outer cards should make
    cards.spreadAngle = cards.cards.length == 0 ? 0 : 1 / (0.03 * -cards.cards.length) + 55;
    cards.spreadRadius = 0.5 * svgHeight; // ?
    cards.height = svgHeight / 2;
    cards.width = cards.height / 1.75;
    cards.rectSettings = {
        class: "card",
        onmousedown: "highlightCard(evt)",
        onmouseenter: "highlightCard(evt)",
        onmouseleave: "removeCardHl(evt)",
        onmouseup: "removeCardHl(evt)",
        stroke: "rgba(0, 0, 0, 0)"
    };
    for(var i = 0; i < cards.cards.length; i++) {
        cards.cards[i].rotation = (-0.5 + (i / (cards.cards.length - 1))) * cards.spreadAngle;
    }
}

// Bring this unique card in front if it is not already in front
function highlightUniqueCard(evt) {
    var imgGroup, parent, svg;

    // console.log("highlightUniqueCard " + evt.target.id);
    parent = $("#" + evt.target.id).parent();
    if(parent.attr("inFront") != evt.target.id) {
        svg = $("#upperGameplaySvg").svg("get");
        imgGroup = $("#" + evt.target.id);
        
        parent.attr("inFront", evt.target.id);
        svg.remove(imgGroup);
        svg.add(parent, imgGroup);
    }
}

function highlightName(evt) {
    $("#" + evt.target.id).attr("fill", "green");
    $("#" + evt.target.id).text($("#" + evt.target.id).attr("name") + " (trade)");
}

function removeNameHl(evt) {
    $("#" + evt.target.id).attr("fill", "black");
    $("#" + evt.target.id).text($("#" + evt.target.id).attr("name"));
}

// Initialize the information needed to draw the pieces/cards lying in front of the player
function initOwnedCardsAndPieces(ownedCardsAndPieces, svgWidth, svgHeight, xOffset, yOffset, canTrade) {
    var roadSpace, w;

    ownedCardsAndPieces.nameFontSize = svgHeight / 12;
    ownedCardsAndPieces.nameLeft = (svgWidth / 2) - (ownedCardsAndPieces.name.length * ownedCardsAndPieces.nameFontSize / 3);
    ownedCardsAndPieces.nameTop = ownedCardsAndPieces.nameFontSize;
    ownedCardsAndPieces.nameHeight = ownedCardsAndPieces.nameTop * 1.2;
    // ownedCardsAndPieces.nameBgColor = "rgba(255, 153, 51, 0.5)";
    ownedCardsAndPieces.nameSettings = {
        fill: "black",
        fontFamily: "Verdana",
        fontSize: ownedCardsAndPieces.nameFontSize,
        id: "name" + ownedCardsAndPieces.playerId,
        name: ownedCardsAndPieces.name,
    };
    if(canTrade) {
        ownedCardsAndPieces.nameSettings.onclick = "trade(" + ownedCardsAndPieces.playerId + ")";
        ownedCardsAndPieces.nameSettings.onmouseenter = "highlightName(evt)";
        ownedCardsAndPieces.nameSettings.onmouseleave = "removeNameHl(evt)";
    }

    ownedCardsAndPieces.uniqueCardLeft = svgWidth / 45;
    ownedCardsAndPieces.uniqueCardTop = ownedCardsAndPieces.nameHeight;
    ownedCardsAndPieces.uniqueCardWidth = svgWidth / 2;
    ownedCardsAndPieces.uniqueCardHeight = ownedCardsAndPieces.uniqueCardWidth * 1.19;
    ownedCardsAndPieces.uniqueCardSettings = {
        onmouseenter: "highlightUniqueCard(evt)"
    }

    ownedCardsAndPieces.piecesLeft = (9 * ownedCardsAndPieces.uniqueCardWidth / 8) + ownedCardsAndPieces.uniqueCardLeft;
    ownedCardsAndPieces.piecesTop = ownedCardsAndPieces.uniqueCardTop;

    roadSpace = ((svgWidth - ownedCardsAndPieces.piecesLeft) / 15);
    ownedCardsAndPieces.piecesDistance = roadSpace / 3;
    ownedCardsAndPieces.roadWidth =  roadSpace * 2 / 3;
    ownedCardsAndPieces.roadHeight = ownedCardsAndPieces.roadWidth * 5;

    w = ownedCardsAndPieces.roadWidth * 4;
    ownedCardsAndPieces.cityWidth = w;
    ownedCardsAndPieces.cityHeight = w;
    ownedCardsAndPieces.cityVertices = [
        [w / -2, w / 4],
        [w / -2, w / -4],
        [0, w / -4],
        [0, w / -2],
        [w / 4, -3 * w / 4],
        [w / 2, w / -2],
        [w / 2, w / 4]
    ];
    
    // Temporary solution; eventually we should use neat-looking images for settlements and cities
    w = ownedCardsAndPieces.roadWidth * 2;
    ownedCardsAndPieces.settlementWidth = w;
    ownedCardsAndPieces.settlementHeight = 1.5 * w;
    ownedCardsAndPieces.settlementVertices = [
        [w / -2, w / 2],
        [w / -2, w / -2],
        [0, -w],
        [w / 2, w / -2],
        [w / 2, w / 2]
    ];
    // Two card stacks next to each other; each of which has some space to expand on one side
    ownedCardsAndPieces.cardWidth = 0.9 * (((svgWidth - ownedCardsAndPieces.piecesLeft) / 3) - ownedCardsAndPieces.piecesDistance);
    ownedCardsAndPieces.cardHeight = 1.75 * ownedCardsAndPieces.cardWidth;
}

function getPolygonDimensions(vertices) {
    var minX, minY, maxX, maxY;

    // Extreme values start at the first vertex's coordinates
    minX = vertices[0][0];
    minY = vertices[0][1];
    maxX = vertices[0][0];
    maxY = vertices[0][1];

    // Redefine this field's path, collect the offsets and sizes needed to draw and scale the image
    for(var i = 1; i < vertices.length; i++) {
        minX = Math.min(minX, vertices[i][0]);
        minY = Math.min(minY, vertices[i][1]);
        maxX = Math.max(maxX, vertices[i][0]);
        maxY = Math.max(maxY, vertices[i][1]);
    }
    return {left: minX, top: minY, width: maxX - minX, height: maxY - minY};
}

/* Performs ray-casting from the point to the right
 * If the ray crosses an odd number of edges, the point is in
 */
function pointIsInPolygon(point, vertices) {
    var isInside = false;
    var i = 0, j = vertices.length - 1;

    // Check all edges
    for(i, j; i < vertices.length; j = i++) {
        // First checks if the point is in the y-scope of this edge
        // Then checks if the point lies to the left of this edge
        if((vertices[i].y > point.y) != (vertices[j].y > point.y) &&
            point.x < (vertices[j].x - vertices[i].x) * (point.y - vertices[i].y) / (vertices[j].y - vertices[i].y) + vertices[i].x ) {
            isInside = !isInside;
        }
    }
    return isInside;
}