function getCookie(name,defaultValue) {
    debugger
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return defaultValue;
  }
  
  export default{
    getCookie
  }