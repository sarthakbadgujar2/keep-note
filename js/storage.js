function saveData(key,value) {
  if(localStorage) {
    localStorage.setItem(key,value);
  }else {
    alert("Your browser does not support localstorage APT");
  }
}

function saveData(key,value) {
  if(localStorage) {
    if(key in localStorage) {
      return localStorage.getItem(key);
    }
  }else {
    alert("Your browser does not support localstorage APT");
  }
}
