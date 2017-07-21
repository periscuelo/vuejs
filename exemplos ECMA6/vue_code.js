/*jshint esversion: 6 */
// Relógio
function getAtime() {
  let date = new Date();
  let hour = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
  let minute = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
  let second = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
  let str_hour = hour + ':' + minute + ':' + second;
  return str_hour;
}

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
