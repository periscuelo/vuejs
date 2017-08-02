/*jshint esversion: 6 */
// Relógio
const getAtime = () => {
  const date = new Date();
  const hour = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
  const minute = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
  const second = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
  const str_hour = hour + ':' + minute + ':' + second;
  return str_hour;
};

Vue.component('relogio', {
  template: `<div class="text-center">
              <h1>{{aTime}}</h1>
             </div>`,
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

// Instância Vue
new Vue({
  el: '#app'
});
