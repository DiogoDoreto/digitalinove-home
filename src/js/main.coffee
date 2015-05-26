(->
  bars = document.querySelectorAll '#jumbo .bar'

  changeHeight = (i) ->
    newHeight = Math.random() * 70 + 30
    bars[i].style.height = newHeight + '%'

  currentBar = 0

  changeBars = ->
    currentBar = 0 if currentBar >= bars.length
    changeHeight currentBar
    currentBar++
    setTimeout changeBars, 2000

  changeBars()
)()

