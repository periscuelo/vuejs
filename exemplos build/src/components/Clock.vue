<template>
  <div>
    <h1>{{aTime}}</h1>
  </div>
</template>

<script>
  let getAtime = () => {
    let date = new Date()
    let hour = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours()
    let minute = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()
    let second = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds()
    let StrHour = hour + ':' + minute + ':' + second
    return StrHour
  }
  
  export default {
    name: 'relogio',
    data () {
      return {
        time: '00:00:00'
      }
    },
    computed: {
      aTime () {
        setInterval(() => {
          this.time = getAtime()
        }, 1000)
        return this.time
      }
    }
  }
</script>
