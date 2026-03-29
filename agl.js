const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");

/**
 * Generic function to draw shapes on canvas
 * @param {string} type - 'rect', 'poly', 'line', 'point'
 * @param {Array} coords - Coordinates [[x,y], [x,y]...] or [x, y, w, h]
 * @param {Object} options - { fill: 'color', stroke: 'color', lineWidth: 2 }
 */
function drawShape(type, coords, options = {}) {
    ctx.beginPath();
    ctx.strokeStyle = options.stroke || "black";
    ctx.lineWidth = options.lineWidth || 2;
    ctx.fillStyle = options.fill || "transparent";
    if(type === 'clear') {
      // coords: [x, y, width, height]
      ctx.clearRect(...coords);
    }
    if (type === 'rect') {
        // coords: [x, y, width, height]
        ctx.rect(...coords);
    } 
    else if (type === 'poly' || type === 'line') {
        // coords: [[x,y], [x,y], ...]
        ctx.moveTo(coords[0][0], coords[0][1]);
        for (let i = 1; i < coords.length; i++) {
            ctx.lineTo(coords[i][0], coords[i][1]);
        }
        if (type === 'poly') ctx.closePath();
    } 
    else if (type === 'point') {
        // coords: [x, y]
        ctx.arc(coords[0], coords[1], 3, 0, Math.PI * 2);
        ctx.fillStyle = options.stroke || "black"; // Points usually solid
    }

    // Apply colors
    if (options.fill) ctx.fill();
    ctx.stroke();
}

// --- EXAMPLES ---
/*
// 1. A Rectangle (Filled)
drawShape('rect', [20, 20, 100, 50], { fill: 'gold', stroke: 'orange' });

// 2. Custom Shape / Polygon (No fill, just outline)
drawShape('poly', [[150, 20], [180, 50], [130, 80]], { stroke: 'blue' });

// 3. A Line
drawShape('line', [[20, 100], [180, 130]], { stroke: 'red', lineWidth: 5 });

// 4. A Point
drawShape('point', [100, 130], { stroke: 'green' });
*/
