const POINTS = 100;
function fromCircle ({ cx, cy, r }) {
  const circle = [];
  const i0 = -3 / 8 * POINTS;
  const i1 = 5 / 8 * POINTS;
  for (let i = i0; i < i1; i++) {
    circle.push([
      cx + r * Math.cos(i / POINTS * 2 * Math.PI),
      cy + r * Math.sin(i / POINTS * 2 * Math.PI)
    ]);
  }
  return toPath(circle);
}

function fromRect ({ width, height }) {
  const rect = [];
  const pointsPerSide = POINTS / 4;
  let dx = 0;
  let dy = 0;
  let x = 0;
  let y = 0;
  for (let s = 0; s < 4; s++) {
    if (s === 0) {
      dx = width / pointsPerSide;
      dy = 0;
    } else if (s === 1) {
      dx = 0;
      dy = height / pointsPerSide;
    } else if (s === 2) {
      dx = -width / pointsPerSide;
      dy = 0;
    } else {
      dx = 0;
      dy = -1 * height / pointsPerSide;
    }
    for (let i = 0; i < pointsPerSide; i++) {
      rect.push([x, y]);
      x += dx;
      y += dy;
    }
  }
  return toPath(rect);
}

function toPath (coordinates) {
  return 'M' + coordinates.map(c => `${c[0]},${c[1]}`).join('L') + 'Z';
}

export {
  fromCircle, fromRect
};
