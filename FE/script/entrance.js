const masukKelas = async () => {
  let masukElem = document.getElementById('idKelas');
  window.localStorage.setItem('idMasuk',masukElem.value)
  let urlPart = window.location.href.split('/');
  window.location = urlPart.splice(0, urlPart.length-1).join('/') + '/entrance.html';
};


const enterKelas = async () => {
  let tes = window.localStorage.getItem('idMasuk');
  console.log(tes)
};

const increaseCounter = async () => {
  let id = window.localStorage.getItem('idMasuk');
  console.log(id);
  let result = await fetch(`http://52.76.55.94:3000/api/v1/kelas/counter/${id}/increase`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'authorization': window.localStorage.getItem('token'),
    },
  });
  let resp = await result.json();
  console.log(resp);
};


const decreaseCounter = async () => {
  let id = window.localStorage.getItem('idMasuk');
  console.log(id);
  let result = await fetch(`http://52.76.55.94:3000/api/v1/kelas/counter/${id}/decrease`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'authorization': window.localStorage.getItem('token'),
    },
  });
  let resp = await result.json();
  console.log(resp);
};

const showCounter = async () => {
	let id = window.localStorage.getItem('idMasuk');
  let result = await fetch(`http://52.76.55.94:3000/api/v1/kelas/counter/${id}/show`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'authorization': window.localStorage.getItem('token'),
    },
  });
  let resp = await result.json();
  console.log(resp);
  let hasil = resp.Message;
  console.log(hasil.peoplecount);
  let tunjukCounterElem = document.getElementById('tunjukCounter');

  tunjukCounterElem.value = hasil.peoplecount;
};