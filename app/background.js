chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create('../index.html', {
    bounds: {
      width: 940,
      height: 600
    }
  });
});
