function drawBoard(svg) {
    drawFields(svg);
    drawRoads(svg);
    drawSettlements(svg);
    drawCities(svg);
    drawRobber(svg);

    drawRoadClickboxes(svg);
    drawCrossingClickboxes(svg);
    animateClickboxes();
}

// Helper functions
function getFieldById(fields, id) {
    for(var i = 0; i < fields.length; i++) {
        if(fields[i].id == id) {
            return fields[i];
        }
    }
    return undefined;
}

// Given two points, returns the angle a picture/rectangle should be rotated to line up
function getAngleToRotate(pointA, pointB) {
    if(pointA[0] == pointB[0]) {
        return 90;
    } else {
        return Math.atan((pointB[1] - pointA[1]) / (pointB[0] - pointA[0])) / Math.PI * 180;
    }
}


function drawFields(svg) {
    var dims, field, img, fieldBorderSettings, fieldGroupSettings;

    for(var i = 0; i < board.fields.length; i++) {
        field = board.fields[i];
        dims = getPolygonDimensions(board.hexagonVertices);
        
        fieldGroupSettings = $.extend({}, board.fieldGroupSettings);
        fieldGroupSettings.transform = "translate(" + field.center[0] + ", " + field.center[1] + ") rotate(" + field.imgRot + ")";
        field.svgGroup = svg.group("field_" + field.id, fieldGroupSettings);
        fieldBorderSettings = $.extend({}, board.hexagonSettings);
        fieldBorderSettings.id = "field_" + field.id + "_border";
        if(field.type || (!board.init)) {
            img = svg.image(field.svgGroup, dims.left, dims.top, dims.width, dims.height, field.imgSrc);
            svg.title(img, "Field " + field.id);
        }
        svg.polygon(field.svgGroup, board.hexagonVertices, fieldBorderSettings);
        if(field.number) {
            svg.circle(field.svgGroup, 0, 0, board.numberCircleRadius, {fill: board.fieldBorderColor});
            svg.text(field.svgGroup, field.numberOffsetX, field.numberOffsetY, field.number + "", field.numberSettings);
        }
    }
}

// Temporary solution; eventually we should use neat-looking images
function drawRoads(svg) {
    var absLoc, field, pointA, pointB, relLoc, road, rotAngle, settings;

    for(var i = 0; i < board.roads.length; i++) {
        // For each road, find out which field it belongs to
        road = board.roads[i];
        field = getFieldById(board.fields, road.fieldId);
        if(field == undefined) {
            console.log("Invalid fieldId found for road: " + board.roads[i].fieldId);
            continue;
        }
        // Determine the road"s location relative to one of its adjacent tiles
        pointA = board.hexagonVertices[road.side];
        pointB = board.hexagonVertices[(road.side + 1) % 6];
        relLoc = [(pointA[0] + pointB[0]) / 2, (pointA[1] + pointB[1]) / 2];
        rotAngle = getAngleToRotate(pointA, pointB);
        // Determine its absolute location on the board
        absLoc = [relLoc[0] + field.center[0], relLoc[1] + field.center[1]];
        settings = {fill: road.player,
                    id: "road_" + road.player + "_F" + road.fieldId + "S" + road.side,
                    transform: "translate(" + absLoc[0] + ", " + absLoc[1] + ") rotate(" + rotAngle + ")"};
        if(road.player == "white") {
            settings.stroke = "black";
            settings.strokeWidth = 1;
        }
        svg.rect(board.roadWidth / -2, board.roadHeight / -2, board.roadWidth, board.roadHeight, settings);
    }
}

function drawSettlements(svg) {
    for(var i = 0; i < board.settlements.length; i++) {
        drawHelper(svg, board.settlementVertices, board.settlements[i], "settlement");
    }
}

function drawCities(svg) {
    for(var i = 0; i < board.cities.length; i++) {
        drawHelper(svg, board.cityVertices, board.cities[i], "city");
    }
}

// Draws a city or a settlement
function drawHelper(svg, vertices, entity, idPrefix) {
    var absLoc, field, relLoc, settings;

    field = getFieldById(board.fields, entity.fieldId);
    if(field == undefined) {
        console.log("Invalid fieldId found for entity: " + entity.fieldId);
        return;
    }
    // Determine the entity's relative location to one of its adjacent tiles
    relLoc = board.hexagonVertices[entity.vertex];
    // Determine its absolute location on the board
    absLoc = [relLoc[0] + field.center[0], relLoc[1] + field.center[1]];
    settings = {fill: entity.player,
                id: idPrefix + "_" + entity.player + "_F" + entity.fieldId + "S" + entity.vertex,
                transform: "translate(" + absLoc[0] + ", " + absLoc[1] + ")"};
    if(entity.player == "white") {
        settings.stroke = "black";
        settings.strokeWidth = 1;
    }
    svg.polygon(vertices, settings);
}

function drawRoadClickboxes(svg) {
    var absLoc, field, pointA, pointB, rect, relLoc, rcb, rotAngle, settings;

    for(var i = 0; i < board.roadClickboxes.length; i++) {
        rcb = board.roadClickboxes[i];
        field = getFieldById(board.fields, rcb.fieldId);
        if(field == undefined) {
            console.log("Invalid fieldId found for road clickbox: " + board.roads[i].fieldId);
            continue;
        }
        // Determine the clickbox's location relative to one of its adjacent tiles
        pointA = board.hexagonVertices[rcb.side];
        pointB = board.hexagonVertices[(rcb.side + 1) % 6];
        relLoc = [(pointA[0] + pointB[0]) / 2, (pointA[1] + pointB[1]) / 2];
        rotAngle = getAngleToRotate(pointA, pointB);
        // Determine its absolute location on the board
        absLoc = [relLoc[0] + field.center[0], relLoc[1] + field.center[1]];
        
        // Retrieve and set up the settings needed for the html element
        settings = $.extend({}, board.clickboxSettings);
        settings.id = "roadCb_F" + rcb.fieldId + "S" + rcb.side;
        settings.transform = "translate(" + absLoc[0] + ", " + absLoc[1] + ") rotate(" + rotAngle + ")";
        rect = svg.rect(board.rcbWidth / -2, board.rcbHeight / -2, board.rcbWidth, board.rcbHeight, settings);
        rect.widthDefault = board.rcbWidth;
        rect.widthHl = board.rcbWidthHl;
        rect.heightDefault = board.rcbHeight;
        rect.heightHl = board.rcbHeightHl;
    }
}

function drawCrossingClickboxes(svg) {
    var absLoc, ccb, field, rect, relLoc, settings;

    for(var i = 0; i < board.crossingClickboxes.length; i++) {
        ccb = board.crossingClickboxes[i];
        field = getFieldById(board.fields, ccb.fieldId);
        if(field == undefined) {
            console.log("Invalid fieldId found for crossing clickbox: " + board.roads[i].fieldId);
            continue;
        }
        // Determine the clickbox's location relative to one of its adjacent tiles
        relLoc = board.hexagonVertices[ccb.vertex];
        // Determine its absolute location on the board
        absLoc = [relLoc[0] + field.center[0], relLoc[1] + field.center[1]];
        
        // Retrieve and set up the settings needed for the html element
        settings = $.extend({}, board.clickboxSettings);
        settings.id = "crossCb_F" + ccb.fieldId + "S" + ccb.vertex;
        settings.transform = "translate(" + absLoc[0] + ", " + absLoc[1] + ")";
        rect = svg.rect(board.ccbSize / -2, board.ccbSize / -2, board.ccbSize, board.ccbSize, settings);
        rect.widthDefault = board.ccbSize;
        rect.widthHl = board.ccbSizeHl;
        rect.heightDefault = board.ccbSize;
        rect.heightHl = board.ccbSizeHl;
    }
}

// Start clickbox animations
function animateClickboxes() {
    $(".clickbox").animate({svgStrokeDashOffset: board.cbAnimProgress}, 1000, "linear", animateCBLoop);
}

// Function that gets called recursively to animate the clickboxes
function animateCBLoop() {
    // The stuff below should only happen once, so make sure only the 'first' road clickbox executes it
    if(this == $(".clickbox")[0]) {
        board.cbAnimProgress += board.cbAnimStep;
        $(".clickbox").animate({svgStrokeDashOffset: board.cbAnimProgress}, 1000, 'linear', animateCBLoop);
    }
}

function drawRobber(svg) {
    var field, group;

    field = getFieldById(board.fields, board.robber.fieldId);
    group = svg.group("robber", {transform: "translate(" + field.center[0] + ", " + field.center[1] + ")", fill: "black"});
    // img = svg.image(group, board.robberWidth / -2, board.robberHeight / -2, board.robberWidth, board.robberHeight, board.robber.imgSrc);
    // svg.title(img, "Robber");
    svg.ellipse(group, 0, 0, board.robberWidth / 2.2, board.robberHeight * 0.375, {});
    svg.circle(group, 0, board.robberHeight / -2.5, board.robberWidth * 0.35, {});
    svg.polygon(group, 
                [[board.robberWidth / -2, board.robberHeight / 2],
                 [board.robberWidth / -2, 3 * board.robberHeight / 8],
                 [0, (board.robberHeight / 4) - board.robberWidth / 2],
                 [board.robberWidth / 2, 3 * board.robberHeight / 8],
                 [board.robberWidth / 2, board.robberHeight / 2]], {});
}