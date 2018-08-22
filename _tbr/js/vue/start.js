var v1 = new Vue({
    el: '#app',
    data: {
        message: '<script type="text/javascript">console.log("hello");</script>'
    }
});

var v2 = new Vue({
  el: '#app2',
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue.js' },
      { text: 'Build Something Awesome' }
    ]
  }
});
