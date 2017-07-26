<template>
  <div class="text-center" v-if="marcados.length > 0">
    <ul>
      <li v-for="marcado in marcados">{{marcado}}</li>
    </ul>
    <button type="button" class="btn btn-primary" @click="clean()">Limpar Marcações</button>
  </div>
</template>

<script>
  export default {
    name: 'notes',
    computed: {
      marcados () {
        return this.$store.getters.values
      }
    },
    methods: {
      clean () {
        this.$store.dispatch('reset')
      }
    }
  }
</script>
