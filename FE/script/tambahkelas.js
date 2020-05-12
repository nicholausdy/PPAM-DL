let token = window.localStorage.getItem('token');
console.log(token);

const postKelas = async () => {

  let idKelasElem = document.getElementById('idKelas');
  let kapasitasKelasElem = document.getElementById('kapasitasKelas');
  let jumlahLampuElem = document.getElementById('jumlahLampu');
  let gedungElem = document.getElementById('gedung');
  let lantaiElem = document.getElementById('lantai');

   console.log(
    JSON.stringify({
        "idkelas": idKelasElem.value,
        "idgedung": gedungElem.value,
        "lantai": parseInt(lantaiElem.value),
        "jumlahlampu": parseInt(jumlahLampuElem.value),
        "kapasitaskelas": parseInt(kapasitasKelasElem.value),
      })
    )
  let id = idKelasElem.value;
  let result = await fetch(`http://52.76.55.94:3000/api/v1/kelas/add`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: ({
      'Content-Type': 'application/json',
      'authorization': window.localStorage.getItem('token'),
    }),
    body: JSON.stringify({
        "idkelas": idKelasElem.value,
        "idgedung": gedungElem.value,
        "lantai": parseInt(lantaiElem.value),
        "jumlahlampu": parseInt(jumlahLampuElem.value),
        "kapasitaskelas": parseInt(kapasitasKelasElem.value),
    }),
  }); 
    let res = await result.json();
    console.log(res);
    console.log(id);
    if(res.Message == "Gedung tidak terdaftar"){
      alert('Gedung tidak terdaftar, coba ulangi lagi');
      let urlPart1 = window.location.href.split('/');
      window.location = urlPart1.splice(0, urlPart1.length-1).join('/') + '/tambahkelas.html';
    }
     if(res.Message == "Lantai tidak valid, maksimum 4"){
      alert('Lantai tidak valid, maksimum 4, coba ulangi lagi');
      let urlPart1 = window.location.href.split('/');
      window.location = urlPart1.splice(0, urlPart1.length-1).join('/') + '/tambahkelas.html';
    }


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
    console.log(resp.idkuliah);
    let urlPart1 = window.location.href.split('/');
    window.location = urlPart1.splice(0, urlPart1.length-1).join('/') + '/daftarkelas.html';
};