import _ from 'lodash'
import speedx from './animation'
import '../asserts/main.css'

function component() {
    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
}

document.body.appendChild(component());

speedx.start();