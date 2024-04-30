var isRainbowMode = true;
let rainbowAnimationFrameId;

// Update color RGB
function updateColor() {
  const time = performance.now();
  const frequency = 0.0005;
  const amplitude = 127;
  
  const red = Math.sin(frequency * time + 0) * amplitude + 128;
  // const green = Math.sin(frequency * time + 2) * 63 + 64;
  const green = 32;
  const blue = Math.sin(frequency * time + 3) * (63 + 31) + 128 + 32;

  const color = (Math.floor(red) << 16) | (Math.floor(green) << 8) | Math.floor(blue);
  
  vantaBackground.setOptions({ color: color });
  rainbowAnimationFrameId = requestAnimationFrame(updateColor);
}

const heading = document.querySelector('h1');
heading.addEventListener('click', function() {
  isRainbowMode = !isRainbowMode;

  if (isRainbowMode) {
    updateColor();
  } else {
    cancelAnimationFrame(rainbowAnimationFrameId);
    vantaBackground.setOptions({ color: 0x1f242f });
  }
});

