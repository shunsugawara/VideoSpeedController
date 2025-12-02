document.addEventListener('DOMContentLoaded', function() {
  const speedSlider = document.getElementById('speedSlider');
  const speedValue = document.getElementById('speedValue');
  const presetBtns = document.querySelectorAll('.preset-btn');

  // Function to update speed
  function updateSpeed(speed) {
    speedValue.textContent = speed;
    speedSlider.value = speed;
    
    // Send message to active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "setSpeed",
          speed: parseFloat(speed)
        });
      }
    });
  }

  // Slider listener
  speedSlider.addEventListener('input', function() {
    updateSpeed(this.value);
  });

  // Preset buttons listener
  presetBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      updateSpeed(this.dataset.speed);
    });
  });

  // Initialize with current speed if possible (optional enhancement)
  // For now, default to 1.0 or whatever the slider is at
});
