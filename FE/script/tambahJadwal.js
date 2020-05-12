let id = window.localStorage.getItem('idClass');
console.log(id);

const postJadwal = async () => {
	let id = window.localStorage.getItem('idClass');
	console.log(id);

    let idKuliahElem = document.getElementById('idKuliah');
    let namaKuliahElem = document.getElementById('namaKuliah');
    let hariElem = document.getElementById('hari');
    let jamMulaiElem = document.getElementById('jamMulai');
    let jamSelesaiElem = document.getElementById('jamSelesai');


    let hasil = await fetch(`http://52.76.55.94:3000/api/v1/jadwal/add`,{
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: ({
        'Content-Type': 'application/json',
        'authorization': window.localStorage.getItem('token'),
      }),
      body: JSON.stringify({
          "idkelas": id,
          "idkuliah": idKuliahElem.value,
          "namakuliah": namaKuliahElem.value,
          "hari": hariElem.value,
          "jammulai": jamMulaiElem.value,
          "jamselesai": jamSelesaiElem.value,
      })
    })
    const resp = await hasil.json();
    console.log(resp);
    let urlPart1 = window.location.href.split('/');
    window.location = urlPart1.splice(0, urlPart1.length-1).join('/') + '/daftarkelas.html';
};