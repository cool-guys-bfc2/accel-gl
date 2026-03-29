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
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

/**
 * Draws a 3D-style colored cube
 * @param {number} x - Center X coordinate
 * @param {number} y - Center Y coordinate
 * @param {number} s - Size/Scale
 * @param {Array} colors - Colors for [Top, Right, Left] faces
 */
function drawCube(x, y, s, colors = ['#eee', '#ccc', '#999']) {
  // Define the points for an isometric cube projection
  // These calculations create the "diamond" shapes for each face
  
  // 1. Top Face
  ctx.beginPath();
  ctx.fillStyle = colors[0];
  ctx.moveTo(x, y);
  ctx.lineTo(x + s, y - s * 0.5);
  ctx.lineTo(x, y - s);
  ctx.lineTo(x - s, y - s * 0.5);
  ctx.closePath();
  ctx.fill();

  // 2. Right Face
  ctx.beginPath();
  ctx.fillStyle = colors[1];
  ctx.moveTo(x, y);
  ctx.lineTo(x + s, y - s * 0.5);
  ctx.lineTo(x + s, y + s * 0.5);
  ctx.lineTo(x, y + s);
  ctx.closePath();
  ctx.fill();

  // 3. Left Face
  ctx.beginPath();
  ctx.fillStyle = colors[2];
  ctx.moveTo(x, y);
  ctx.lineTo(x - s, y - s * 0.5);
  ctx.lineTo(x - s, y + s * 0.5);
  ctx.lineTo(x, y + s);
  ctx.closePath();
  ctx.fill();
}

/* Draw a few colored cubes
drawCube(150, 100, 50, ['#FF5733', '#C70039', '#900C3F']); // Reddish
drawCube(300, 150, 40, ['#33FF57', '#28B463', '#1D8348']); // Greenish
drawCube(100, 250, 60, ['#3357FF', '#2E86C1', '#1B4F72']); // Bluish*/
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
