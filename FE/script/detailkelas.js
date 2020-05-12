const createRowDetails = (i,idKuliah, mataKuliah,hari,jamMulai,jamSelesai) => {
	let id = window.localStorage.getItem('idClass');
	console.log(id);

	let numCell = document.createElement('td');
	numCell.innerText = i;

	let idKuliahCell = document.createElement('td');
	idKuliahCell.innerText = idKuliah;

	let mataKuliahCell = document.createElement('td');
	mataKuliahCell.innerText = mataKuliah;

	let hariCell = document.createElement('td');
	hariCell.innerText = hari;

	let jamMulaiCell = document.createElement('td');
	jamMulaiCell.innerText = jamMulai;

	let jamSelesaiCell = document.createElement('td');
	jamSelesaiCell.innerText = jamSelesai;

  let editCell = document.createElement('td');
  editCell.innerHTML = `<span class="label label-info pull-left">edit</span>`

	let deleteCell = document.createElement('td');
	deleteCell.innerHTML = `<span class="label label-danger pull-left">hapus</span>`

  editCell.addEventListener('click', () => getUpdateJadwal(idKuliah,hari));
	deleteCell.addEventListener('click', () => hapusJadwal(id,idKuliah,hari));
	
	
	let row = document.createElement('tr');
	row.appendChild(numCell);
	row.appendChild(idKuliahCell);
	row.appendChild(mataKuliahCell);
	row.appendChild(hariCell);
	row.appendChild(jamMulaiCell);
	row.appendChild(jamSelesaiCell);
  row.appendChild(editCell);
	row.appendChild(deleteCell);

	let table = document.getElementById('tabelDetailKelas');
	table.appendChild(row);
};

const getClassDetailsById = async () => {
	let id_kelas = localStorage.getItem('idClass');
    let result = await fetch(`http://52.76.55.94:3000/api/v1/jadwal/list?idkelas=${id_kelas}`,{
  	method: 'GET', // *GET, POST, PUT, DELETE, etc.
     mode: 'cors', // no-cors, *cors, same-origin
     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
     headers: ({
       'Content-Type': 'application/json',
       'authorization': window.localStorage.getItem('token'),
       // 'Content-Type': 'application/x-www-form-urlencoded',
     })
 	})
  let data = await result.json();
	console.log(data);
  let tes = data.Message[0];
  let item = data.Message;
  console.log(tes.idkuliah);
  let i = 1;
  console.log(tes.idkelas)
  if((typeof tes.idkelas !== 'undefined') &&(tes.idkuliah !="")){
    for (let item of data.Message) {
    	console.log(item.idkelas);
    	createRowDetails(i, item.idkuliah, item.namakuliah, item.hari, item.jammulai, item.jamselesai);
      i++;
    }
  }
  if(tes.idkuliah === ""){
    for(let i=1;i<item.length;i++){
      createRowDetails(i, item[i].idkuliah, item[i].namakuliah, item[i].hari, item[i].jammulai, item[i].jamselesai);
    }
  };
};

const hapusJadwal = async (idKelas,idKuliah,hari) => {
	let id = window.localStorage.getItem('idClass');
   window.localStorage.setItem('idMatkul',idKuliah);
   window.localStorage.setItem('hariMatkul',hari);
   let id_kuliah = window.localStorage.getItem('idMatkul');
   let hari_kuliah = window.localStorage.getItem('hariMatkul');
   let result = await fetch(`http://52.76.55.94:3000/api/v1/jadwal/remove/${id}/${id_kuliah}/${hari_kuliah}`, {
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
  window.location = urlPart.splice(0, urlPart.length-1).join('/') + '/detailkelas.html';
};

const getUpdateJadwal = async (idKuliah,hari) => {
  window.localStorage.setItem('idCourse',idKuliah);
  window.localStorage.setItem('hariMatkul',hari);
  let urlPart1 = window.location.href.split('/');
  window.location = urlPart1.splice(0, urlPart1.length-1).join('/') + '/editjadwal.html';
}

const getJadwalById = async () => {
  let idKelas = window.localStorage.getItem('idClass');
  let idKuliah = window.localStorage.getItem('idCourse');
  let hari = window.localStorage.getItem('hariMatkul');
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
  console.log(idKelas);
  console.log(idKuliah);
  console.log(hari);
  for(let item of data.Message){
    if(item.idkuliah == idKuliah && item.hari == hari){
      let idKuliahElem = document.getElementById('edit-idKuliah');
      let namaKuliahElem = document.getElementById('edit-namaKuliah');
      let hariElem = document.getElementById('edit-hari');
      let jamMulaiElem = document.getElementById('edit-jamMulai');
      let jamSelesaiElem = document.getElementById('edit-jamSelesai');
      
      idKuliahElem.value = item.idkuliah;
      namaKuliahElem.value = item.namakuliah;
      hariElem.value = item.hari;
      jamMulaiElem.value = item.jammulai;
      jamSelesaiElem.value = item.jamselesai;

      return;
    }
  }
};

const updateJadwal = async () => {
  let idKuliahElem = document.getElementById('edit-idKuliah');
  let namaKuliahElem = document.getElementById('edit-namaKuliah');
  let hariElem = document.getElementById('edit-hari');
  let jamMulaiElem = document.getElementById('edit-jamMulai');
  let jamSelesaiElem = document.getElementById('edit-jamSelesai');

  let id = window.localStorage.getItem('idClass');
  console.log(id);
   let id_kuliah = window.localStorage.getItem('idCourse');
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
  window.location = urlPart.splice(0, urlPart.length-1).join('/') + '/daftarkelas.html';
};

const isiIdKelas = async () => {
  let idKelas = window.localStorage.getItem('idClass');
  let idKelasElem = document.getElementById('isiKelas');
  idKelasElem.innerText = "CSLC "+idKelas;
};

async function getPetaLampuJson(){
  const idkelas = window.localStorage.getItem('idClass')
  const result = await fetch(`http://52.76.55.94:3000/api/v1/kelas/petalampu/${idkelas}`,{
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: ({
          'Content-Type': 'application/json',
          'authorization': window.localStorage.getItem('token'),
      // 'Content-Type': 'application/x-www-form-urlencoded',
   }),
   })
  const data = await result.json()
  console.log(data)
  return data
}

async function generatePetaMati(){
  const dataRaw = await getPetaLampuJson();
  if (dataRaw.Status == 'Success'){
    let ctx = document.getElementById('canvas').getContext('2d');
    const img = new Image();
    //const img_nyala = new Image();
    //img_mati.src = '../gambar/lampumati.png';
    //img_nyala.src = '../gambar/lampumenyala.png';
    const data_arr = dataRaw.Message; 
    console.log(data_arr)
    let count_lampu_nyala = 0;
    let count_lampu_mati = 0;
    for (let l = 0 ; l < data_arr.length; l++ ){
      if (data_arr[l] == 'ON'){
        count_lampu_nyala++
      }
      else {
        count_lampu_mati++
      }
    }
    console.log(count_lampu_mati)
    //img.src = './gambar/lampumenyala.png'
    img.onload = function(){
      for (let i = 0; i < 1; i++) {
        for (let j = 0; j < count_lampu_mati; j++  ){
          ctx.drawImage(img, j*20,i*20, 20, 20);
        }
      }
    };
    img.src = './gambar/lampumati.png'
  }
  else {
    alert(dataRaw.Message)
  }
}

async function generatePetaNyala(){
  const dataRaw = await getPetaLampuJson();
  if (dataRaw.Status == 'Success'){
    let ctx = document.getElementById('canvas_').getContext('2d');
    const img = new Image();
    //const img_nyala = new Image();
    //img_mati.src = '../gambar/lampumati.png';
    //img_nyala.src = '../gambar/lampumenyala.png';
    const data_arr = dataRaw.Message; 
    console.log(data_arr)
    let count_lampu_nyala = 0;
    let count_lampu_mati = 0;
    for (let l = 0 ; l < data_arr.length; l++ ){
      if (data_arr[l] == 'ON'){
        count_lampu_nyala++
      }
      else {
        count_lampu_mati++
      }
    }
    console.log(count_lampu_nyala)
    //img.src = './gambar/lampumenyala.png'
    img.onload = function(){
      for (let i = 0; i < 1; i++) {
        for (let j = 0; j < count_lampu_nyala; j++  ){
          ctx.drawImage(img, j*20,i*20, 20, 20);
        }
      }
    };
    img.src = './gambar/lampumenyala.png'
  }
  else {
    alert(dataRaw.Message)
  }
}