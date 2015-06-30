(function() {
  (function() {
    var bars, changeBars, changeHeight, currentBar;
    bars = document.querySelectorAll('#top-bars .bar');
    changeHeight = function(i) {
      var newHeight;
      newHeight = Math.random() * 70 + 30;
      return bars[i].style.height = newHeight + '%';
    };
    currentBar = 0;
    changeBars = function() {
      if (currentBar >= bars.length) {
        currentBar = 0;
      }
      changeHeight(currentBar);
      currentBar++;
      return setTimeout(changeBars, 2000);
    };
    return changeBars();
  })();

}).call(this);

//# sourceMappingURL=dist/js/main.js.map