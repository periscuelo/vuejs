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
    }
  }
</script>
