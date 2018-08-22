export default {
    _el: null,
    _start: false,
    _clientX: -1,
    _clientY: -1,
    _startTime: -1,
    _speedX: 0,
    _speedY: 0,
    start(){
        this._el = document.querySelector('#speed')
        if(!this._el){
            this._el = document.createElement('div')
            this._el.id = 'speed'
            document.body.appendChild(this._el)
        }
        ['mousedown', 'mousemove', 'mouseup']
            .forEach(evtName => this.hasOwnProperty('on' + evtName) && window.addEventListener(evtName, this['on' + evtName].bind(this), false))
    },
    onmousedown(evt){
        this._start = true
        this._startTime = new Date().getTime()
        this._clientX = evt.clientX
        this._clientY = evt.clientY
    },
    onmousemove(evt){
        if(this._start){
            let currentTime = new Date().getTime()
            let currentX = evt.clientX
            let currentY = evt.clientY
            let time = currentTime - this._startTime
            this._speedX = Math.abs(this._clientX - currentX)/time
            this._speedY = Math.abs(this._clientY - currentY)/time
            console.log(`speed x: ${this._speedX}, speed y: ${this._speedY}`)

            this._startTime = currentTime
            this._clientX = currentX
            this._clientY = currentY

            let line = document.createElement('div')
            line.style.cssText = 'height: 0px'
            this._el.appendChild(line)
            this._el.scrollLeft = this._el.scrollWidth - this._el.offsetWidth
            setTimeout(function(_speedX, _speedY){
                return function(){
                    line.style.cssText = 'height: ' + (Math.max(_speedX, _speedY) * 100) + 'px' 
                }
            }(this._speedX, this._speedY), 0)
        }
    },
    onmouseup(evt){
        this._start = false
    }
}