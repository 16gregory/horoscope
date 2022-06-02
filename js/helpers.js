var Helpers = {
  getParameterByName: function(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  },
  getDate: function() {
    var today = new Date();

    return {
      'minutes': today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes(),
      'hours': today.getHours() < 10 ? '0' + today.getHours() : today.getHours(),
      'day': today.getDate() < 10 ? '0' + today.getDate() : today.getDate(),
      'month': (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1),
      'year': today.getFullYear().toString()
    }
  }
}