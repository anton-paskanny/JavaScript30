document.addEventListener('DOMContentLoaded', e => {
  const canvas = document.querySelector("#draw");
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.strokeStyle = '#BADASS';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 100;

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;
  let direction = true;

  function draw(e) {
    if (!isDrawing) return;

    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    // beginPath must be invoked at the start of drawing with moveTo and lineTo methods
    ctx.beginPath();

    // moveTo only moves pen but doesn't draw anything on canvas
    ctx.moveTo(lastX, lastY);

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
    
    hue++;

    if(hue >= 360) {
      hue = 0;
    }

    // Change direction variable to make line smaller/bigger during drawing
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
      direction = !direction;
    }
    
    direction ? ctx.lineWidth++ : ctx.lineWidth--;
  }

  // Order:
  // 1. mousedown
  // 2. mousemove
  // 3. mouseup

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseout', () => isDrawing = false);
});