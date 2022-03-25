//author:daniellukonis

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const panelWidth = fxrand()
const rotateStep = fxrand() + 1
const panelHeight = fxrand() * 0.25

let r = Math.floor(255 * fxrand())
let b = Math.floor(255 * fxrand())
let g = Math.floor(255 * fxrand())

const shadeVar = ()=>{
  const rbgRand = fxrand()
  if(rbgRand < 0.33){
    r = 'random 0-255'
    return ()=>{
      const gradient = context.createLinearGradient(0,0,canvas.width,canvas.width)
      
      const xc = Math.floor(255 * fxrand())
      gradient.addColorStop(0,`rgba(${xc},${g},${b},0)`)
      gradient.addColorStop(0.25,`rgba(${xc},${g},${b},1)`)
      panelColor = gradient
    }
  }
  else if(rbgRand < 0.66 ){
    g = 'random 0-255'
    return ()=>{
      const gradient = context.createLinearGradient(0,0,canvas.width,canvas.width)

      const xc = Math.floor(255 * fxrand())
      gradient.addColorStop(0,`rgba(${r},${xc},${b},0)`)
      gradient.addColorStop(0.25,`rgba(${r},${xc},${b},1)`)
      panelColor = gradient
    }
  }
  else{
    b = 'random 0-255'
    return ()=>{
      const gradient = context.createLinearGradient(0,0,canvas.width,canvas.width)

      const xc = Math.floor(255 * fxrand())
      gradient.addColorStop(0,`rgba(${r},${g},${xc},0)`)
      gradient.addColorStop(0.25,`rgba(${r},${g},${xc},1)`)
      panelColor = gradient
    }
  }
}

let panelColor = 'rgba(0,0,100,0.25)'
const panelBorder = 'rgba(255,255,255,0)'
const backgroundColor = 'rgb(255,255,255)'

let canvasCenter = Math.floor(canvas.width * 0.5)
let radius = canvasCenter - 10
let angle = 0

function resizeCanvas(){
  const w = window.innerWidth - 10
  const h = window.innerHeight - 10
  w>h ? x = h : x = w;
  canvas.width = x
  canvas.height = x
  canvasCenter = Math.floor(canvas.width * 0.5)
}
resizeCanvas()

function fillCanvas(){
  context.save()
  context.fillStyle = backgroundColor
  context.fillRect(0,0,canvas.width,canvas.width)
  context.restore()
}
fillCanvas()

function drawPanel(){
  context.save()
  context.lineWidth = 1
  context.strokeStyle = panelBorder
  context.fillStyle = panelColor
  context.translate(canvasCenter,canvasCenter)
  context.rotate(angle)
  context.beginPath()
  context.arc(0,0,radius * panelWidth,0,panelHeight)
  context.arc(0,0,radius,panelHeight,-panelHeight,true)
  context.arc(0,0,radius * panelWidth,-panelHeight,0)
  context.fill()
  context.stroke()
  context.restore()
}

function rotatePanel(){
  angle += rotateStep;
}

function randomRadius(){
  radius = Math.floor(fxrand()*(canvasCenter-60))+50
}

const shade = shadeVar()

function drawScene(){
  for(let i=0; i<150; i++){
    shade()
    randomRadius()
    rotatePanel()
    drawPanel()    
  }
}
drawScene()

function loop(){
  shade()
  randomRadius()
  rotatePanel()
  drawPanel()

  window.requestAnimationFrame(loop)
}
// loop()

// window.addEventListener("contextmenu",e => e.preventDefault())
window.addEventListener("resize", () => resizeCanvas())

window.$fxhashFeatures = {
  "Panel Width": panelWidth,
  "Panel Height": panelHeight,
  "Rotation Speed": rotateStep,
  "Red":r,
  "Blue":b,
  "Green":g
}