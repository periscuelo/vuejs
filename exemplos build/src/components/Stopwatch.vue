<template>
  <div class="row text-center">
    <div class="col-md-4">
      <label>Contador</label>
      <select class="form-control" v-model="tipo">
        <option value="0">Selecione o Contador</option>
        <option value="1">Cronômetro</option>
        <option value="2">Temporizador</option>
      </select>
    </div>
    <div class="col-md-2" v-if="tipo=='2'">
      <label>Hora(s)</label>
      <input type="number" class="form-control" min="0" max="99" v-model="mhour" :disabled="started">
    </div>
    <div class="col-md-2" v-show="tipo!='0'">
      <label>Minuto(s)</label>
      <input type="number" class="form-control" min="0" max="59" v-model="mminute" :disabled="started">
    </div>
    <div class="col-md-2" v-show="tipo!='0'">
      <label>Segundo(s)</label>
      <input type="number" class="form-control" min="0" max="59" v-model="msecond" :disabled="started">
    </div>
    <div class="col-md-2" v-show="tipo!='0'">
      <label>Ação</label><br>
      <button type="button" class="btn btn-success" v-show="interval === ''" @click="count()">Iniciar</button>
      <button type="button" class="btn btn-danger" v-show="interval !== ''" @click="stopCount()">Parar</button>
      <button type="button" class="btn btn-default" v-show="tipo === '1' && interval !== ''" @click="mark()">Marcar</button>
      <button type="button" class="btn btn-primary" v-show="started" @click="reset()">Reset</button>
    </div>
    <div class="col-md-12">
      <h1 v-html="aCounter"></h1>
    </div>
    <div class="col-md-12">
      <marcador></marcador>
    </div>
  </div>
</template>

<script>
  import Notes from '@/components/Notes'

  let addZero = data => {
    return (data < 10) ? '0' + data : data
  }

  export default {
    name: 'cronometro',
    components: {
      'marcador': Notes
    },
    data () {
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
        counter: ''
      }
    },
    computed: {
      aCounter () {
        let hour = addZero(this.hour)
        let minute = addZero(this.minute)
        let second = addZero(this.second)
        let milisecond = addZero(this.milisecond)
        switch (this.tipo) {
          case '1':
            this.counter = minute + ':' + second + '.<span class="h3">' + milisecond + '</span>'
            break
          case '2':
            this.counter = hour + ':' + minute + ':' + second
            break
          default:
            this.counter = ''
        }
        return this.counter
      }
    },
    methods: {
      count () {
        this.started = true

        switch (this.tipo) {
          case '1':
            this.stopCount()
            this.interval = setInterval(() => {
              this.chronometer()
            }, 10)
            break
          case '2':
            if (this.mhour > 0 || this.mminute > 0 || this.msecond > 0) {
              this.stopCount()
              this.interval = setInterval(() => {
                this.temporizer()
              }, 1000)
            } else {
              this.started = false
              alert('Informe quanto tempo deseja temporizar!')
            }
            break
        }

        return this.counter
      },
      stopCount () {
        if (this.interval !== '') {
          clearInterval(this.interval)
          this.interval = ''
        }
      },
      reset () {
        this.stopCount()
        this.mhour = 0
        this.mminute = 0
        this.msecond = 0
        this.hour = 0
        this.minute = 0
        this.second = 0
        this.milisecond = 0
        this.started = false
      },
      mark () {
        this.$store.commit('mark', { m: this.minute, s: this.second, ms: this.milisecond })
      },
      chronometer () {
        this.milisecond += 1
        if (this.milisecond === 100) {
          this.milisecond = 0
          this.second += 1
        }
        if (this.second === 60) {
          this.second = 0
          this.minute += 1
        }
      },
      temporizer () {
        if (this.hour > 0 || this.minute > 0 || this.second > 0) {
          if (this.second === 0 && this.minute === 0 && this.hour > 0) {
            this.minute = 60
            this.hour -= 1
          }
          if (this.second === 0 && this.minute > 0) {
            this.second = 60
            this.minute -= 1
          }
          this.second = (this.second === 0) ? 60 : this.second
          this.second -= 1
        }
        if (this.hour === 0 && this.minute === 0 && this.second === 0) this.reset()
      }
    },
    watch: {
      tipo () {
        this.reset()
      },
      mhour (val) {
        this.hour = parseInt(val, 10)
      },
      mminute (val) {
        this.minute = parseInt(val, 10)
      },
      msecond (val) {
        this.second = parseInt(val, 10)
      }
    }
  }
</script>
