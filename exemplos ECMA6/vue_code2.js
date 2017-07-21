/*jshint esversion: 6 */
// tsc tsc
function ready(fn) {
  let interval = setInterval(() => {
    if (document.readyState === 'complete') {
      clearInterval(interval);
      fn();
    }
  }, 1);
}

// Carrega o Template
function loadTemplates(id) {
  let selector = document.querySelector(id);
  let scripts = selector.contentDocument.scripts;
  let ct = scripts.length;
  for (let i=0; i<ct; i++) {
    document.body.appendChild(scripts[0]);
  }
  selector.parentNode.removeChild(selector);
}

// Adiciona o zero quando necessário
function addZero(data) {
  return (data < 10) ? '0' + data : data;
}

// Relógio
function getAtime() {
  let date = new Date();
  let hour = addZero(date.getHours());
  let minute = addZero(date.getMinutes());
  let second = addZero(date.getSeconds());
  let str_hour = hour + ':' + minute + ':' + second;
  return str_hour;
}

Vue.component('relogio', {
  template: '#tmpl_relogio',
  data() {
    return {
      time: '00:00:00'
    };
  },
  computed: {
    aTime() {
      setInterval(() => {
        this.time = getAtime();
      }, 1000);
      return this.time;
    }
  }
});
// Fim Relógio

// Contador
Vue.component('contador', {
  template: '#tmpl_contador',
  data() {
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
      vcode: 2
    };
  },
  computed: {
    aCounter() {
      let hour = addZero(this.hour);
      let minute = addZero(this.minute);
      let second = addZero(this.second);
      let milisecond = addZero(this.milisecond);
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
    count() {
      this.started = true;

      switch (this.tipo) {
        case '1':
          this.stopCount();
          this.interval = setInterval(() => {
            this.chronometer();
          }, 10);
          break;
        case '2':
          if (this.mhour > 0 || this.mminute > 0 || this.msecond > 0) {
            this.stopCount();
            this.interval = setInterval(() => {
              this.temporizer();
            }, 1000);
          } else {
            this.started = false;
            alert('Informe quanto tempo deseja temporizar!');
          }
          break;
      }

      return this.counter;
    },
    stopCount() {
      if (this.interval !== '') {
        clearInterval(this.interval);
        this.interval = '';
      }
    },
    reset() {
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
    chronometer() {
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
    temporizer() {
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
    tipo() {
      this.reset();
    },
    mhour(val) {
      this.hour = parseInt(val, 10);
    },
    mminute(val) {
      this.minute = parseInt(val, 10);
    },
    msecond(val) {
      this.second = parseInt(val, 10);
    }
  }
});
// Fim Contador

// Instância Vue
ready(() => {
  loadTemplates('#templates');
  new Vue({
    el: '#app'
  });
});
