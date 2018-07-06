function drawBoard(board) {
    boardCtx.clearRect(0, 0, boardCanvas.width, boardCanvas.height);
    drawFieldBorders(board);
    drawRoads(board);
    drawSettlements(board);
    drawCities(board);
    loadFieldImages(board, 0);
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
    if(pointA.x == pointB.x) {
        return Math.PI / 2;
    } else {
        return Math.atan((pointB.y - pointA.y) / (pointB.x - pointA.x));
    }
}


function drawFieldBorders(board) {
    var field;

    for(var i = 0; i < board.fields.length; i++) {
        field = board.fields[i];
        drawFieldBorder(field.vertices, field.bordercolor);
    }
}

function drawFieldBorder(vertices, bordercolor) {
    // Draw a line around the hexagon
    boardCtx.beginPath();
    boardCtx.moveTo(vertices[0].x, vertices[0].y);
    for(var i = 1; i < vertices.length; i++) {
        boardCtx.lineTo(vertices[i].x, vertices[i].y);
    }
    boardCtx.closePath();

    // boardCtx.strokeStyle = "#f4deb5";
    boardCtx.strokeStyle = bordercolor;
    // boardCtx.strokeStyle = "#000000";
    boardCtx.lineWidth = 3;
    boardCtx.stroke();
}

// stretchPixels = the number of extra pixels to be clipped on each side of the images
function loadFieldImages(board, stretchPixels) {
    var imgSources = [];
    var imgSrc, imgObj;

    // Collect the various images to be loaded
    for(var i = 0; i < board.fields.length; i++) {
        imgSrc = board.fields[i].imgSrc;
        if(imgSources.indexOf(imgSrc) == -1) {
            imgSources.push(imgSrc);
        }
    }

    // For each image, draw it in every field that requires it
    for(var i = 0; i < imgSources.length; i++) {
        imgObj = new Image();
        imgObj.src = imgSources[i];
        imgObj.onload = function() {
            var minX, minY, maxX, maxY, imgWidth, imgHeight;
            var vertices;

            // Iterate over all fields, check which image they need
            for(var j = 0; j < board.fields.length; j++) {
                // this.src is absolute, field.imgSrc is relative, hence this split is needed
                if(board.fields[j].imgSrc.split("static")[1] == this.src.split("static")[1]) {
                    vertices = board.fields[j].vertices;
                    // Extreme values start at the first vertex's coordinates
                    // (Needed since this vertex is not included in the for-loop below)
                    minX = vertices[0].x;
                    minY = vertices[0].y;
                    maxX = vertices[0].x;
                    maxY = vertices[0].y;

                    // Redefine this field's path, collect the offsets and sizes needed to draw and scale the image
                    boardCtx.save();
                    boardCtx.globalCompositeOperation = "destination-over";
                    boardCtx.beginPath();
                    boardCtx.moveTo(vertices[0].x, vertices[0].y);
                    for(var k = 1; k < vertices.length; k++) {
                        boardCtx.lineTo(vertices[k].x, vertices[k].y);
                        minX = Math.min(minX, vertices[k].x);
                        minY = Math.min(minY, vertices[k].y);
                        maxX = Math.max(maxX, vertices[k].x);
                        maxY = Math.max(maxY, vertices[k].y);
                    }

                    imgWidth = maxX - minX + 2 * stretchPixels;
                    imgHeight = maxY - minY + 2 * stretchPixels;
                    boardCtx.translate(board.fields[j].center.x, board.fields[j].center.y);
                    boardCtx.rotate(board.fields[j].img_rot);
                    // Make sure we don't draw past this field's border
                    boardCtx.clip();
                    boardCtx.drawImage(this, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
                    // 'unclip' to the saved state
                    boardCtx.restore();
                }
            }
        }
    }
}

// Temporary solution; eventually we should use neat-looking images
function drawRoads(board) {
    var field, road;

    for(var i = 0; i < board.roads.length; i++) {
        // For each road, find out which field it belongs to
        road = board.roads[i];
        field = getFieldById(board.fields, road.fieldId);
        if(field == undefined) {
            console.log("Invalid fieldId found for road: " + board.roads[i].fieldId);
            continue;
        }
        // Pass the two points that are connected by this road's edge (and the road's color)
        drawRoad(field.vertices[road.side], field.vertices[(road.side + 1) % 6], board.roadWidth, board.roadHeight, road.player);
    }
}

// Temporary solution; eventually we should use neat-looking images
function drawRoad(pointA, pointB, width, height, playerColor) {
    var angle = getAngleToRotate(pointA, pointB);
    var location = {x: (pointA.x + pointB.x) / 2, y: (pointA.y + pointB.y) / 2};

    boardCtx.save();
    boardCtx.translate(location.x, location.y);
    boardCtx.rotate(angle);
    boardCtx.fillStyle = playerColor;
    boardCtx.fillRect(-(width / 2), -(height / 2), width, height);
    boardCtx.restore();
}

// Temporary solution; eventually we should use neat-looking images
function drawSettlements(board) {
    var field, settlement;

    for(var i = 0; i < board.settlements.length; i++) {
        settlement = board.settlements[i];
        field = getFieldById(board.fields, settlement.fieldId);
        drawSettlement(field.vertices[settlement.vertex], board.settlementWidth, settlement.player);
    }
}

// Temporary solution; eventually we should use neat-looking images
function drawSettlement(point, width, playerColor) {
    boardCtx.save();
    boardCtx.translate(point.x, point.y);
    boardCtx.fillStyle = playerColor;
    boardCtx.beginPath();
    // Draw a small 'house', consisting of a square with sides of length <width>, and a roof top angled at 90 degrees
    boardCtx.moveTo(width / -2, width / 2);
    boardCtx.lineTo(width / -2, width / -2);
    boardCtx.lineTo(0, -width);
    boardCtx.lineTo(width / 2, width / -2);
    boardCtx.lineTo(width / 2, width / 2);
    boardCtx.closePath();
    boardCtx.fill();
    boardCtx.restore();
}

// Temporary solution; eventually we should use neat-looking images
function drawCities(board) {
    var field, city;

    for(var i = 0; i < board.cities.length; i++) {
        city = board.cities[i];
        field = getFieldById(board.fields, city.fieldId);
        drawCity(field.vertices[city.vertex], board.cityWidth, city.player);
    }
}

// Temporary solution; eventually we should use neat-looking images
function drawCity(point, width, playerColor) {
    boardCtx.save();
    boardCtx.translate(point.x, point.y);
    boardCtx.fillStyle = playerColor;
    boardCtx.beginPath();
    // Draw a small 'church', consisting of a square with sides of length <width>, and a roof top angled at 90 degrees
    boardCtx.moveTo(width / -2, width / 2);
    boardCtx.lineTo(width / -2, 0);
    boardCtx.lineTo(0, 0);
    boardCtx.lineTo(0, width / -4);
    boardCtx.lineTo(width / 4, width / -2);
    boardCtx.lineTo(width / 2, width / -4);
    boardCtx.lineTo(width / 2, width / 2);
    boardCtx.closePath();
    boardCtx.fill();
    boardCtx.restore();
}



function drawClickboxes(board, roadClickboxes, townClickboxes) {
    var field, roadCb;

    // cbCtx.clearRect(0, 0, cbCanvas.width, cbCanvas.height);
    for(var i = 0; i < roadClickboxes.length; i++) {
        // For each road clickbox, find out which field it belongs to
        roadCb = roadClickboxes[i];
        field = getFieldById(board.fields, roadCb.fieldId);
        if(field == undefined) {
            console.log("Invalid fieldId found for road clickbox: " + board.roads[i].fieldId);
            continue;
        }
        // Pass the two points that are connected by this road's edge (and the road's color)
        drawRoadClickbox(field.vertices[roadCb.side], field.vertices[(roadCb.side + 1) % 6], board.roadWidth, 2 * board.roadHeight, roadCb.color);
    }
}

function drawRoadClickbox(pointA, pointB, width, height, color) {
    var angle = getAngleToRotate(pointA, pointB);
    var location = {x: (pointA.x + pointB.x) / 2, y: (pointA.y + pointB.y) / 2};

    cbCtx.save();
    cbCtx.translate(location.x, location.y);
    cbCtx.rotate(angle);
    cbCtx.fillStyle = color;
    cbCtx.fillRect(-(width / 2), -(height / 2), width, height);
    cbCtx.restore();
}
