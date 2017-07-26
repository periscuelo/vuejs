<template>
  <div>
    <hello></hello>
    <clock></clock>
    <stopwatch></stopwatch>
  </div>
</template>

<script>
  import Hello from '@/components/Hello'
  import Clock from '@/components/Clock'
  import Stopwatch from '@/components/Stopwatch'

  export default {
    name: 'all',
    components: {
      Hello,
      Clock,
      Stopwatch
    },
    data () {
      return {
        title: 'Tudo Junto'
      }
    },
    head: {
      title () {
        return {
          inner: this.title
        }
      },
      meta: [
        { name: 'description', content: 'Meu exemplo de tudo junto', id: 'desc' }
      ]
    }
  }
</script>
