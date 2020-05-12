const hapus = async (idKelas) => {
window.localStorage.setItem('id_class', idKelas);
let id = window.localStorage.getItem('id_class');
   let result = await fetch(` http://52.76.55.94:3000/api/v1/kelas/remove?idkelas=${id}`, {
    method: 'DELETE',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: ({
       'Content-Type': 'application/json',
       'authorization': window.localStorage.getItem('token'),
       // 'Content-Type': 'application/x-www-form-urlencoded',
     })
  })
  let resp = await result.json();
  console.log(resp);
  let urlPart = window.location.href.split('/');
  window.location = urlPart.splice(0, urlPart.length-1).join('/') + '/daftarkelas.html';
};