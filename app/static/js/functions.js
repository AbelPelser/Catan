var escapeElement = document.createElement('textarea');

function htmlEscape(toClean) {
	escapeElement.textContent = toClean;
	return escapeElement.innerHTML;
}

function htmlUnescape(toClean) {
	escapeElement.innerHTML = toClean;
	return escapeElement.textContent;
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

    // Init the central coordinates of every field
    for(var i = 0; i < board.fields.length; i++) {
        field = board.fields[i];
        centralX = xOffset + field.col * 2 * tHeight;
        if(field.row % 2 == 1) {
            centralX += tHeight;
        }
        centralY = yOffset + radius + field.row * radius * 1.5;
        board.fields[i].center = [centralX, centralY];
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

    board.roadWidth = radius / 2;
    board.roadHeight = board.roadWidth / 8;
    board.rcbWidth = radius / 2;
    board.rcbHeight = board.rcbWidth / 4;
    board.rcbWidthHl = 1.2 * board.rcbWidth;
    board.rcbHeightHl = 2.5 * board.rcbHeight;

    // Temporary solution; eventually we should use neat-looking images for settlements and cities
    w = radius / 6;
    board.settlementVertices = [
        [w / -2, w / 2],
        [w / -2, w / -2],
        [0, -w],
        [w / 2, w / -2],
        [w / 2, w / 2]
    ];
    w = radius / 3;
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
    console.log("removeCardHl");
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