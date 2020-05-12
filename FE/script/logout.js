const logout = () => {
  window.localStorage.clear();
  let urlPart = window.location.href.split('/');
  window.location = urlPart.splice(0, urlPart.length-1).join('/') + '/login.html';
};