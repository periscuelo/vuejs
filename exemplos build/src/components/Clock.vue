<template>
  <div>
    <h1>{{aTime}}</h1>
  </div>
</template>

<script>
  const getAtime = () => {
    const date = new Date()
    const hour = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours()
    const minute = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()
    const second = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds()
    const StrHour = hour + ':' + minute + ':' + second
    return StrHour
  }
  
  export default {
    name: 'relogio',
    data () {
      return {
        time: '00:00:00',
        title: 'relógio'
      }
    },
    head: {
      title () {
        return {
          inner: this.title
        }
      },
      meta: [
        { name: 'description', content: 'Meu exemplo de relógio', id: 'desc' }
      ]
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
