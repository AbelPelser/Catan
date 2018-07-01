var escapeElement = document.createElement('textarea');

function htmlEscape(toClean) {
	escapeElement.textContent = toClean;
	return escapeElement.innerHTML;
}

function htmlUnescape(toClean) {
	escapeElement.innerHTML = toClean;
	return escapeElement.textContent;
}

function initVertices(board, radius, xOffset, yOffset) {
    var tHeight = Math.sqrt(Math.pow(radius, 2) - Math.pow(radius*0.5, 2));


    for(var i = 0; i < board.fields.length; i++) {
        field = board.fields[i];
        
        centralX = xOffset + field.col * 2 * tHeight;
        if(field.row % 2 == 1) {
            centralX += tHeight;
        }
        centralY = yOffset + field.row * radius * 1.5;

        vertices = [{x: centralX - tHeight, y: centralY - 0.5 * radius},
                    {x: centralX, y: centralY - radius},
                    {x: centralX + tHeight, y: centralY - 0.5 * radius},
                    {x: centralX + tHeight, y: centralY + 0.5 * radius},
                    {x: centralX, y: centralY + radius},
                    {x: centralX - tHeight, y: centralY + 0.5 * radius}];
        board.fields[i].vertices = vertices;
    }
}

function drawBoard(board) {
    var field;

    for(var i = 0; i < board.fields.length; i++) {
        field = board.fields[i];
        drawField(field.vertices, field.img_src);
    }
    loadImages(board);
}

function drawField(vertices, img_src) {
    // Draw a line around the hexagon
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    for(var i = 1; i < vertices.length; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y);
    }
    ctx.closePath();
    ctx.stroke();
}

function loadImages(board) {
    var imgSources = [];
    var img_src, imgObj;

    // Collect the various images to be loaded
    for(var i = 0; i < board.fields.length; i++) {
        img_src = board.fields[i].img_src;
        if(imgSources.indexOf(img_src) == -1) {
            imgSources.push(img_src);
        }
    }
    console.log(imgSources);

    // For each image, draw it in every field that requires it
    for(var i = 0; i < imgSources.length; i++) {
        imgObj = new Image();
        imgObj.src = imgSources[i];
        imgObj.onload = function() {
            var minX, minY, maxX, maxY;
            var vertices;

            // Iterate over all fields, check which image they need
            for(var j = 0; j < board.fields.length; j++) {
                // this.src is absolute, field.img_src is relative, hence this split is needed
                if(board.fields[j].img_src.split("static")[1] == this.src.split("static")[1]) {
                    minX = minY = 9999;
                    maxX = maxY = 0;
                    vertices = board.fields[j].vertices;
                    // Redefine this field's path, collect the offsets and sizes needed to draw and scale the image
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for(var k = 1; k < vertices.length; k++) {
                        ctx.lineTo(vertices[k].x, vertices[k].y);
                        minX = Math.min(minX, vertices[k].x);
                        minY = Math.min(minY, vertices[k].y);
                        maxX = Math.max(maxX, vertices[k].x);
                        maxY = Math.max(maxY, vertices[k].y);
                    }
                    // Make sure we don't draw past this field's border
                    ctx.clip();
                    ctx.drawImage(this, minX, minY, maxX - minX, maxY - minY);
                    // 'unclip' to the saved state
                    ctx.restore();
                }
            }            
        }
    }
}

/* Performs ray-casting from the point to the right
 * If the ray crosses an odd number of edges, the point is in
 */
function pointIsInField(point, field) {
    var isInside = false;
    var i = 0, j = field.vertices.length - 1;

    // Check all edges
    for (i, j; i < field.vertices.length; j = i++) {
        // First checks if the point is in the y-scope of this edge
        // Then checks if the point lies to the left of this edge
        if ((field.vertices[i].y > point.y) != (field.vertices[j].y > point.y) &&
            point.x < (field.vertices[j].x - field.vertices[i].x) * (point.y - field.vertices[i].y) / (field.vertices[j].y - field.vertices[i].y) + field.vertices[i].x ) {
            isInside = !isInside;
        }
    }
    return isInside;
}