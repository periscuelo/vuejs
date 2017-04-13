// Relógio
var getAtime = function() {
  var date = new Date();
  var hour = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
  var minute = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
  var second = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
  var str_hour = hour + ':' + minute + ':' + second;
  return str_hour;
};

Vue.component('relogio', {
  template: `<div class="text-center">
              <h1>{{aTime}}</h1>
             </div>`,
  data: function() {
    return {
      time: '00:00:00'
    };
  },
  computed: {
    aTime: function() {
      var self = this;
      setInterval(function() {
        self.time = getAtime();
      }, 1000);
      return self.time;
    }
  }
});
// Fim Relógio

// Instância Vue
new Vue({
  el: '#app'
});
