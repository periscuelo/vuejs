<template>
  <div>
    <img src="../assets/logo.png">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Olá VueJs 2. Sou um componente buildado :)'
      }
    }
  }
</script>