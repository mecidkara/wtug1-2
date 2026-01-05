const urunler = [
  {ad: 'Çay', stok: 5, kategori: 'İçecek', resim: 'img/cay.jpg'},
  {ad: 'Kahve', stok: 2, kategori: 'İçecek', resim: 'img/kahve.jpg'},
  {ad: 'Limonata', stok: 3, kategori: 'İçecek', resim: 'img/limonata.jpg'},
  {ad: 'Pasta', stok: 1, kategori: 'Tatlı', resim: 'img/pasta.jpg'},
  {ad: 'Tost', stok: 8, kategori: 'Atıştırmalık', resim: 'img/tost.jpg'}
];

const tableBody = document.querySelector('#urunTable tbody');
const searchInput = document.getElementById('search');
const addForm = document.getElementById('addForm');

function renderTable(filter = ''){
  tableBody.innerHTML = '';
  const q = filter.trim().toLowerCase();
  
  urunler.forEach(u => {
    // Arama Filtresi
    if(q && !u.ad.toLowerCase().includes(q)) return;
    
    const tr = document.createElement('tr');

    // Resim
    const tdImg = document.createElement('td');
    const img = document.createElement('img');
    img.src = u.resim || 'img/varsayilan.jpg';
    img.onerror = function(){ this.src = 'img/varsayilan.jpg'; }; // Resim yoksa hata vermesin
    tdImg.appendChild(img);

    // Diğer Bilgiler
    const tdAd = document.createElement('td');
    tdAd.textContent = u.ad;

    const tdKat = document.createElement('td');
    tdKat.textContent = u.kategori || '-';

    const tdStok = document.createElement('td');
    tdStok.textContent = u.stok;

    // Hücreleri satıra ekle
    tr.appendChild(tdImg);
    tr.appendChild(tdAd);
    tr.appendChild(tdKat);
    tr.appendChild(tdStok);

    tableBody.appendChild(tr);
  });

  // Tablo çizildikten sonra renkleri kontrol et
  updateRowColors();
}

function updateRowColors(){
  const rows = tableBody.querySelectorAll('tr');
  
  rows.forEach(row => {
    // 4. sıradaki hücre (Stok sütunu)
    const stokTd = row.children[3];
    if(!stokTd) return;

    const val = Number(stokTd.textContent);

    // STOK 3 VE ALTINDAYSA
    if(!isNaN(val) && val <= 3){
      row.classList.add('low'); // CSS'deki .low sınıfını tetikler
    } else {
      row.classList.remove('low');
    }
  });
}

// Olay Dinleyicileri
searchInput.addEventListener('input', (e) => renderTable(e.target.value));

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const ad = document.getElementById('ad').value.trim();
  const stok = Number(document.getElementById('stok').value);
  if(!ad) return;

  urunler.push({
    ad, 
    stok, 
    kategori: 'Genel', 
    resim: 'img/varsayilan.jpg'
  });
  
  renderTable(searchInput.value);
  e.target.reset();
});

// Başlat
document.addEventListener('DOMContentLoaded', () => renderTable());