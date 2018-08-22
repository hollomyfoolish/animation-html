export default {
    _el: null,
    _start: false,
    _clientX: -1,
    _clientY: -1,
    _startTime: -1,
    _speedX: 0,
    _speedY: 0,
    _maxSpeedX: 0,
    _maxSpeedY: 0,
    start(){
        this._el = document.querySelector('#speed')
        this._ball = document.querySelector('#ball')
        if(!this._el){
            this._el = document.createElement('div')
            this._el.id = 'speed'
            document.body.appendChild(this._el)
        }
        document.querySelector('#clear').addEventListener('click', () => {
            this._el.innerHTML = '';
        });
        ['dragover']
            .forEach(evtName => this.hasOwnProperty('on' + evtName) && window.addEventListener(evtName, this['on' + evtName].bind(this), false))
        
        this._ball.addEventListener('dragstart', this.ondragstart.bind(this), false)
        this._ball.addEventListener('dragend', this.ondragend.bind(this), false)
    },
    // onballdragstart(evt){
    //     console.log(evt)
    // },
    // onballdragover(evt){
    //     console.log(evt)
    // },
    // onballdragend(evt){
    //     console.log(evt)
    // },
    ondragstart(evt){
        console.log('ondragstart')
        this._ball.classList.remove('forward')
        this._start = true
        this._startTime = new Date().getTime()
        this._clientX = evt.clientX
        this._clientY = evt.clientY
        this._maxSpeed = -1;
    },
    ondragover(evt){
        evt.preventDefault()
        if(this._start){
            console.log('onmousemove')
            let currentTime = new Date().getTime()
            let currentX = evt.clientX
            let currentY = evt.clientY
            // actually the date.getTime() will not be so accurate, the time interval maybe zero, set 16 as the minimum time interval
            let time = Math.max(16, currentTime - this._startTime)
            this._speedX = Math.abs(this._clientX - currentX)/time
            this._speedY = Math.abs(this._clientY - currentY)/time
            
            this._startTime = currentTime
            this._clientX = currentX
            this._clientY = currentY
            this._ball.style.cssText = `left: ${this._clientX - 20}px;top: ${this._clientY - 20}px;`;
            
            console.log(`max speed: ${this._maxSpeed}, speed x: ${this._speedX}, speed y: ${this._speedY}`)
            this._maxSpeedX = Math.max(this._maxSpeed, this._speedX, this._speedY)
            console.log(this._maxSpeed)
        }
    },
    ondragend(evt){
        let line = document.createElement('div')
        line.style.cssText = 'height: 0px'
        this._el.appendChild(line)
        this._el.scrollLeft = this._el.scrollWidth - this._el.offsetWidth
        setTimeout(function(_speed){
            console.log('max speed: ' + _speed)
            return function(){
                line.style.cssText = 'height: ' + _speed * 10 + 'px' 
            }
        }(this._maxSpeed), 0)
        let distance = this._maxSpeed * 50
        let distanceX = this._speedX >= 0?distance : -distance
        let distanceY = this._speedY >= 0?-distance : distance
        this._ball.classList.add('forward')
        this._ball.style.cssText = `left: ${this._clientX - distanceX}px;top: ${this._clientY - distanceY}px;`;
        this._start = false
    }
}