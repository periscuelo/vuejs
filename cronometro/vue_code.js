// Equivalente ao document ready do jquery
var ready = function(fn) {
  var interval = setInterval(function(){
    if (document.readyState === 'complete') {
      clearInterval(interval);
      fn();
    }
  }, 1);
};

// Carrega o Template
var loadTemplates = function(id) {
  var selector = document.querySelector(id);
  var scripts = selector.contentDocument.scripts;
  var ct = scripts.length;
  for (var i=0; i<ct; i++) {
    document.body.appendChild(scripts[0]);
  }
  selector.parentNode.removeChild(selector);
};

// Adiciona o zero quando necessário
var addZero = function(data) {
  return (data < 10) ? '0' + data : data;
};

//Vuex
var store = new Vuex.Store({
  state: {
    values: []
  },
  mutations: {
    mark: function(state, obj) {
      var minute = addZero(obj.m);
      var second = addZero(obj.s);
      var milisecond = addZero(obj.ms);
      state.values.push(minute + ':' + second + '.' + milisecond);
      return state.values;
    },
    reset: function(state) {
      state.values = [];
      return state.values;
    }
  }
});
//Fim Vuex

// Contador
Vue.component('contador', {
  template: '#tmpl_contador',
  data: function() {
    return {
      tipo: 0,
      mhour: 0,
      mminute: 0,
      msecond: 0,
      hour: 0,
      minute: 0,
      second: 0,
      milisecond: 0,
      started: false,
      interval: '',
      counter: '',
      vcode: 3
    };
  },
  computed: {
    aCounter: function() {
      var hour = addZero(this.hour);
      var minute = addZero(this.minute);
      var second = addZero(this.second);
      var milisecond = addZero(this.milisecond);
      switch (this.tipo) {
        case '1':
          this.counter = minute + ':' + second + '.<span class="h3">' + milisecond + '</span>';
          break;
        case '2':
          this.counter = hour + ':' + minute + ':' + second;
          break;
        default:
          this.counter = '';
      }
      return this.counter;
    }
  },
  methods: {
    count: function() {
      var self = this;
      self.started = true;

      switch (self.tipo) {
        case '1':
          self.stopCount();
          self.interval = setInterval(function() {
            self.chronometer();
          }, 0.1);
          break;
        case '2':
          if (this.mhour > 0 || this.mminute > 0 || this.msecond > 0) {
            self.stopCount();
            self.interval = setInterval(function() {
              self.temporizer();
            }, 1000);
          } else {
            self.started = false;
            alert('Informe quanto tempo deseja temporizar!');
          }
          break;
      }

      return self.counter;
    },
    stopCount: function() {
      if (this.interval !== '') {
        clearInterval(this.interval);
        this.interval = '';
      }
    },
    reset: function() {
      this.stopCount();
      this.mhour = 0;
      this.mminute = 0;
      this.msecond = 0;
      this.hour = 0;
      this.minute = 0;
      this.second = 0;
      this.milisecond = 0;
      this.started = false;
    },
    mark: function() {
      store.commit('mark', { m: this.minute, s: this.second, ms: this.milisecond });
    },
    chronometer: function() {
      this.milisecond += 1;
      if (this.milisecond === 100) {
        this.milisecond = 0; 
        this.second += 1;
      }
      if (this.second === 60) {
        this.second = 0;
        this.minute += 1;
      }
    },
    temporizer: function() {
      if (this.hour > 0 || this.minute > 0 || this.second > 0) {
        if (this.second === 0 && this.minute === 0 && this.hour > 0) {
          this.minute = 60;
          this.hour -= 1;
        }
        if (this.second === 0 && this.minute > 0) {
          this.second = 60;
          this.minute -= 1;
        }
        this.second = (this.second === 0) ? 60 : this.second;
        this.second -= 1;
      }
      if (this.hour === 0 && this.minute === 0 && this.second === 0) this.reset();
    }
  },
  watch: {
    tipo: function() {
      this.reset();
    },
    mhour: function(val) {
      this.hour = parseInt(val, 10);
    },
    mminute: function(val) {
      this.minute = parseInt(val, 10);
    },
    msecond: function(val) {
      this.second = parseInt(val, 10);
    }
  }
});
// Fim Contador

// Marcador
Vue.component('marcador', {
  template: '#tmpl_marcador',
  computed: {
    marcados: function() {
      return store.state.values;
    }
  },
  methods: {
    clean: function() {
      store.commit('reset');
    }
  }
});
// Fim Marcador

// Instância Vue
ready(function(){
  loadTemplates('#templates');
  new Vue({
    el: '#app'
  });
});
