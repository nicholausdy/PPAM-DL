const createRow = (idgedung) => {
	let idGedungCell = document.createElement('td');
	idGedungCell.innerText = idgedung;

	let detailCell = document.createElement('td');
	detailCell.innerHTML = `<span class="label label-success pull-left" >lihat detail</span>`

	idGedungCell.addEventListener('click', () => seeDetailsGedung(idgedung));
	idGedungCell.style.cursor = "pointer";
	idGedungCell.style.textDecoration = "underline";

	let row = document.createElement('tr');
	row.appendChild(idGedungCell);

	let table = document.getElementById('tabelDaftarGedung');
	table.appendChild(row);

};

const loadDataGedung = async () => {
	let result = await fetch(`http://52.76.55.94:3000/api/v1/gedung/list`,{
	method: 'GET', // *GET, POST, PUT, DELETE, etc.
     mode: 'cors', // no-cors, *cors, same-origin
     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
     headers: ({
       'Content-Type': 'application/json',
       'authorization': window.localStorage.getItem('token'),
       // 'Content-Type': 'application/x-www-form-urlencoded',
     }),
     });
	let data = await result.json();
	console.log(data);
	let i = 1;
	for (let item of data.Message) {
		console.log(item.idgedung);
		createRow(item.idgedung);
		i++;
	}
};

const seeDetailsGedung = async (idgedung) => {
  window.localStorage.setItem('idGedung', idgedung);
  let tes = localStorage.getItem('idgedung');
  console.log(tes);
  let result = await fetch(` http://52.76.55.94:3000/api/v1/prediction?idgedung={tes}`,{
  	method: 'GET', // *GET, POST, PUT, DELETE, etc.
     mode: 'cors', // no-cors, *cors, same-origin
     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
     headers: ({
       'Content-Type': 'application/json',
       'authorization': window.localStorage.getItem('token'),
       // 'Content-Type': 'application/x-www-form-urlencoded',
     })
 	});
  let data = await result.json();
  console.log(data);
  let urlPart1 = window.location.href.split('/');
  window.location = urlPart1.splice(0, urlPart1.length-1).join('/') + '/today.html';
}