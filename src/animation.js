// export default {
//     _el: null,
//     _start: false,
//     _clientX: -1,
//     _clientY: -1,
//     _startTime: -1,
//     _speedX: 0,
//     _speedY: 0,
//     _maxSpeedX: 0,
//     _maxSpeedY: 0,
//     start(){
//         this._el = document.querySelector('#speed')
//         this._ball = document.querySelector('#ball')
//         document.querySelector('#clear').addEventListener('click', () => {
//             this._el.innerHTML = '';
//         });
//         ['dragover']
//             .forEach(evtName => this.hasOwnProperty('on' + evtName) && window.addEventListener(evtName, this['on' + evtName].bind(this), false))
        
//         this._ball.addEventListener('mousedown', this.onmousedown.bind(this), false)
//         window.addEventListener('mousemove', this.onmousemove.bind(this), false)
//         document.addEventListener('mouseup', this.onmouseup.bind(this), false)
//     },
//     // onballdragstart(evt){
//     //     console.log(evt)
//     // },
//     // onballdragover(evt){
//     //     console.log(evt)
//     // },
//     // onballdragend(evt){
//     //     console.log(evt)
//     // },
//     onmousedown(evt){
//         console.log('onmousedown')
//         this._ball.classList.remove('forward')
//         this._start = true
//         this._startTime = new Date().getTime()
//         this._clientX = evt.clientX
//         this._clientY = evt.clientY
//         this._maxSpeed = -1;
//     },
//     onmousemove(evt){
//         if(this._start){
//             console.log(evt)
//             evt.preventDefault()
//             console.log('onmousemove')
//             let currentTime = new Date().getTime()
//             let currentX = evt.clientX
//             let currentY = evt.clientY
//             // actually the date.getTime() will not be so accurate, the time interval maybe zero, set 16 as the minimum time interval
//             let time = Math.max(16, currentTime - this._startTime)
//             this._speedX = Math.abs(this._clientX - currentX)/time
//             this._speedY = Math.abs(this._clientY - currentY)/time
            
//             this._startTime = currentTime
//             this._clientX = currentX
//             this._clientY = currentY
//             // this._ball.style.cssText = `left: ${this._clientX - 20}px;top: ${this._clientY - 20}px;`;
//             this._ball.style.cssText = `left: ${this._clientX - 20}px;top: ${this._clientY - 20}px;`;
            
//             console.log(`max speed: ${this._maxSpeed}, speed x: ${this._speedX}, speed y: ${this._speedY}`)
//             this._maxSpeed = Math.max(this._maxSpeed, this._speedX, this._speedY)
//             console.log(this._maxSpeed)
//         }
//     },
//     onmouseup(evt){
//         if(this._start === false){
//             return
//         }
//         let line = document.createElement('div')
//         line.style.cssText = 'height: 0px'
//         this._el.appendChild(line)
//         this._el.scrollLeft = this._el.scrollWidth - this._el.offsetWidth
//         setTimeout(function(_speed){
//             console.log('max speed: ' + _speed)
//             return function(){
//                 line.style.cssText = 'height: ' + _speed * 10 + 'px' 
//             }
//         }(this._maxSpeed), 0)
//         let distance = this._maxSpeed * 50
//         let distanceX = this._speedX >= 0?distance : -distance
//         let distanceY = this._speedY >= 0?-distance : distance
//         this._ball.classList.add('forward')
//         this._ball.style.cssText = `left: ${this._clientX - distanceX}px;top: ${this._clientY - distanceY}px;`;
//         this._start = false
//     }
// }

export default {
    _start: false,
    _startX: -1,
    _startTime: 0,
    _ball: document.querySelector('#ball'),
    _hammer: document.querySelector('#hammer-wrapper'),
    _score: document.querySelector('#score'),
    _zombie: document.querySelector('#zombie'),
    _maxDiff: 90,
    _ballMoving: false,
    _maxSpeed: -1,
    start(){
        window.addEventListener('mousedown', this.startHammer.bind(this), false)
        document.addEventListener('mouseup', this.endHammer.bind(this), false)
        window.addEventListener('mousemove', this.moveHammer.bind(this), false)
        // this._ball.addEventListener('transitionend', this.onballstopped())
        this._zombie.addEventListener('transitionend', this.zombiefall.bind(this), false)
    },
    startHammer(evt){
        this._start = true
        this._startX = evt.clientX
        this._startTime = new Date().getTime()
    },
    moveHammer(evt){
        if(this._start === false || this._ballMoving === true){
            return
        }
        evt.preventDefault()
        let currentX = evt.clientX
        let currentTime = new Date().getTime()
        if(this._startX === -1){
            this._startTime = currentTime
            this._startX = currentX
            return;
        }
        let diff = currentX - this._startX
        let time = currentTime - this._startTime
        let speed = diff/Math.max(16, time)
        console.log(`max speed: ${this._maxSpeed} speed: ${speed}`)
        this._maxSpeed = Math.max(this._maxSpeed, speed)
        if(diff >= this._maxDiff){
            this.moveBall(this._maxSpeed)
            diff = this._maxDiff
        }
        this._hammer.style.cssText = `transform: translate3d(${diff}px, 0px, 0px);`
    },
    endHammer(evt){
        this._start = false
        this._ballMoving = false
        this._maxSpeed = -1
        this._hammer.style.cssText = ''
        this._ball.style.cssText = ''
        this._score.innerHTML = ''
        this._score.classList.remove('show')
        this._zombie.classList.remove('hit')
    },
    moveBall(speed){
        if(this._ballMoving === true){
            return
        }
        this._ballMoving = true
        let distance = Math.ceil(speed * 150);
        if(this._ball.offsetLeft + distance >= this._zombie.offsetLeft){
            this.checkHit()
        }
        this._ball.style.cssText = `left: ${distance + 200}px;transform: rotateZ(1800deg);`
        this._score.innerHTML = `${distance}`
        this._score.classList.add('show')
    },
    checkHit(){
        setTimeout(() => {
            if(!this._ballMoving){
                return
            }
            console.log('check hit')
            if(this._ball.offsetLeft >= this._zombie.offsetLeft){
                this._zombie.classList.add('hit')
            }else{
                this.checkHit()
            }
        }, 50)
    },
    zombiefall(evt){
        if(this._zombie.classList.contains('hit')){
            this._zombie.classList.remove('hit')
        }
    }
}