const getClassById = async () => {
  let idKelas = window.localStorage.getItem('idClass');
  console.log(idKelas);
  let result = await fetch(`http://52.76.55.94:3000/api/v1/kelas/list?idkelas=${idKelas}`,{
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
     mode: 'cors', // no-cors, *cors, same-origin
     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
     headers: ({
       'Content-Type': 'application/json',
       'authorization': window.localStorage.getItem('token'),
       // 'Content-Type': 'application/x-www-form-urlencoded',
     }),
     })
  let data = await result.json();
  console.log(data);
  let item = data.Message;
  console.log(item.kapasitaskelas);

  let kapasitasKelasElem = document.getElementById('edit-kapasitasKelas');
  let jumlahLampuElem = document.getElementById('edit-jumlahLampu');
  let gedungElem = document.getElementById('edit-gedung');
  let lantaiElem = document.getElementById('edit-lantai');
  
  kapasitasKelasElem.value = item.kapasitaskelas;
  jumlahLampuElem.value = item.jumlahlampu;
  gedungElem.value = item.idgedung;
  lantaiElem.value = item.lantai;
};

const updateKelas = async () => {
  let kapasitasKelasElem = document.getElementById('edit-kapasitasKelas');
  let jumlahLampuElem = document.getElementById('edit-jumlahLampu');
  let gedungElem = document.getElementById('edit-gedung');
  let lantaiElem = document.getElementById('edit-lantai');

  let id = window.localStorage.getItem('idClass');
  console.log(id);
  let result = await fetch(`http://52.76.55.94:3000/api/v1/kelas/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'authorization': window.localStorage.getItem('token'),
    },
    body: JSON.stringify({
	    "idkelas": id,
      "kapasitaskelas": parseInt(kapasitasKelasElem.value), 
      "jumlahlampu": parseInt(jumlahLampuElem.value), 
      "idgedung": gedungElem.value, 
      "lantai": parseInt(lantaiElem.value),
    }),
  });
  let resp = await result.json();
  console.log(resp);
  let urlPart = window.location.href.split('/');
  window.location = urlPart.splice(0, urlPart.length-1).join('/') + '/daftarkelas.html';
};