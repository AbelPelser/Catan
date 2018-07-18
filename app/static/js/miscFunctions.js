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