const getJadwalById = async () => {
  let idKelas = window.localStorage.getItem('idClass');
  console.log(idKelas);
  let result = await fetch(`http://52.76.55.94:3000/api/v1/jadwal/list?idkelas=${idKelas}`,{
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
  console.log(item.idKuliah);

  let idKuliahElem = document.getElementById('edit-idKuliah');
  let namaKuliahElem = document.getElementById('edit-namaKuliah');
  let hariElem = document.getElementById('edit-hari');
  let jamMulaiElem = document.getElementById('edit-jamMulai');
  let jamSelesaiElem = document.getElementById('edit-jamSelesai');
  
  idKuliahElem.value = item.idkuliah;
  namaKuliahElem.value = item.namaKuliah;
  hariElem.value = item.hari;
  jamMulaiElem.value = item.jammulai;
  jamSelesaiElem.value = item.jamSelesai;
};

const updateJadwal = async () => {
  let idKuliahElem = document.getElementById('edit-idKuliah');
  let namaKuliahElem = document.getElementById('edit-namaKuliah');
  let hariElem = document.getElementById('edit-hari');
  let jamMulaiElem = document.getElementById('edit-jamMulai');
  let jamSelesaiElem = document.getElementById('edit-jamSelesai');
  console.log(idKuliahElem)
  let id = window.localStorage.getItem('idClass');
  console.log(id);
  window.localStorage.setItem('idMatkul',idKuliah);
  window.localStorage.setItem('hariMatkul',hari);
   let id_kuliah = window.localStorage.getItem('idMatkul');
   let hari_kuliah = window.localStorage.getItem('hariMatkul');
  let result = await fetch(`http://52.76.55.94:3000/api/v1/jadwal/edit/${id}/${id_kuliah}/${hari_kuliah}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'authorization': window.localStorage.getItem('token'),
    },
    body: JSON.stringify({
      "idkelas":id,
	  "idkuliah": idKuliahElem.value,
      "namakuliah": namaKuliahElem.value, 
      "hari": hariElem.value, 
      "jammulai": jamMulaiElem.value, 
      "jamselesai": jamSelesaiElem.value,
    }),
  });
  let resp = await result.json();
  console.log(resp);
  let urlPart = window.location.href.split('/');
  window.location = urlPart.splice(0, urlPart.length-1).join('/') + '/detailkelas.html';
};