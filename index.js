import './styles.css'
import RX from 'rx'

const canvas = document.getElementsByTagName('canvas')[0]

const drawDot = ([x,y]) => canvas.getContext('2d').fillRect(x, y, 1, 1)
const log = console.log.bind(log)

const mouseDown   = Rx.Observable.fromEvent(document, "mousedown")
const mouseUp     = Rx.Observable.fromEvent(document, "mouseup")
const coordinates = Rx.Observable.fromEvent(canvas, 'mousemove')
                      .map( ({clientX, clientY}) => [clientX, clientY] )

const drawing = mouseDown.flatMap(() => coordinates.takeUntil(mouseUp))

drawing.forEach(drawDot)
