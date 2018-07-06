function drawBoard(svg) {
    drawFields(svg);
    drawRoads(svg);
    drawSettlements(svg);
    drawCities(svg);
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
    var cp, dims, field, g, img, path;

    for(var i = 0; i < board.fields.length; i++) {
        field = board.fields[i];
        dims = getPolygonDimensions(board.hexagonVertices);
        
        field.svgGroup = svg.group("field_" + field.id, {transform: "translate(" + field.center[0] + ", " + field.center[1] + ") rotate(" + field.imgRot + ")"});
        img = svg.image(field.svgGroup, dims.left, dims.top, dims.width, dims.height, field.imgSrc);
        svg.title(img, "Field " + field.id);
        svg.polygon(field.svgGroup, board.hexagonVertices, {fill: "none", stroke: field.bordercolor, strokeWidth: 5});
    }
}

// Temporary solution; eventually we should use neat-looking images
function drawRoads(svg) {
    var absLoc, field, pointA, pointB, relLoc, road, rotAngle;

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
        svg.rect(board.roadWidth / -2, board.roadHeight / -2, board.roadWidth, board.roadHeight,
            {fill: road.player,
             id: "road_" + road.player + "_F" + road.fieldId + "S" + road.side,
             transform: "translate(" + absLoc[0] + ", " + absLoc[1] + ") rotate(" + rotAngle + ")"}
        );
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

function drawHelper(svg, vertices, entity, idPrefix) {
    var absLoc, field, relLoc;

    field = getFieldById(board.fields, entity.fieldId);
    if(field == undefined) {
        console.log("Invalid fieldId found for entity: " + entity.fieldId);
        return;
    }
    // Determine the entity's relative location to one of its adjacent tiles
    relLoc = board.hexagonVertices[entity.vertex];
    // Determine its absolute location on the board
    absLoc = [relLoc[0] + field.center[0], relLoc[1] + field.center[1]];
    svg.polygon(vertices,
        {fill: entity.player,
         id: idPrefix + "_" + entity.player + "_F" + entity.fieldId + "S" + entity.vertex,
         transform: "translate(" + absLoc[0] + ", " + absLoc[1] + ")"}
    );
}

// Functions for changing a clickbox's appearance when hovering over them
function highlightCb(evt) {
    console.log("highlightCb called for " + evt.target.id);
    var cb = evt.target;

    cb.setAttribute("x", cb.widthHl / -2);
    cb.setAttribute("width", cb.widthHl);
    cb.setAttribute("y", cb.heightHl / -2);
    cb.setAttribute("height", cb.heightHl);
}
function removeCbHighlight(evt) {
    console.log("removeCbHighlight called for " + evt.target.id);
    var cb = evt.target;

    cb.setAttribute("x", cb.widthDefault / -2);
    cb.setAttribute("width", cb.widthDefault);
    cb.setAttribute("y", cb.heightDefault / -2);
    cb.setAttribute("height", cb.heightDefault);
}

function drawRoadClickboxes(svg, roadClickboxes) {
    var absLoc, field, pointA, pointB, rect, relLoc, rcb, rotAngle, settings;

    for(var i = 0; i < roadClickboxes.length; i++) {
        rcb = roadClickboxes[i];
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

function drawCrossingClickboxes(svg, crossingClickboxes) {
    var absLoc, ccb, field, rect, relLoc, settings;

    for(var i = 0; i < crossingClickboxes.length; i++) {
        ccb = crossingClickboxes[i];
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

// Function that gets called recursively to animate the clickboxes
function animateRoadCBLoop() {
    // The stuff below should only happen once, so make sure only the 'first' road clickbox executes it
    if(this == $(".clickbox")[0]) {
        board.cbAnimProgress += board.cbAnimStep;
        $(".clickbox").animate({svgStrokeDashOffset: board.cbAnimProgress}, 1000, 'linear', animateRoadCBLoop);
    }
}