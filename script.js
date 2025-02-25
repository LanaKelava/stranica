// Niz sa slikama i ispravnim odgovorima
const slike = [
    { src: "ishihara_test.jpeg", tocanOdgovor: "12" },
    { src: "ishihara2.jpg", tocanOdgovor: "74" },
    { src: "ishihara3.jpg", tocanOdgovor: "6" },
    { src: "ishihara4.jpg", tocanOdgovor: "16" },
    { src: "ishihara5.jpg", tocanOdgovor: "2" },
    { src: "ishihara6.jpg", tocanOdgovor: "29" },
    { src: "ishihara7.jpg", tocanOdgovor: "7" },
    { src: "ishihara8.jpg", tocanOdgovor: "45" },
    { src: "ishihara9.jpg", tocanOdgovor: "5" },
    { src: "ishihara10.jpg", tocanOdgovor: "97" },
    { src: "ishihara11.jpg", tocanOdgovor: "8" },
    { src: "ishihara12.jpg", tocanOdgovor: "42" },
    { src: "ishihara13.jpg", tocanOdgovor: "3" }
];

let trenutnaSlika = 0;
let tocanBroj = 0;

// Funkcija za provjeru odgovora i prelazak na sljedeću sliku
function provjeriOdgovor() {
    const korisnikovOdgovor = document.getElementById('korisnikov-odgovor').value;

    // Provjeravamo je li korisnikov odgovor točan
    if (korisnikovOdgovor == slike[trenutnaSlika].tocanOdgovor) {
        tocanBroj++;
    }

    // Prelazak na sljedeću sliku
    trenutnaSlika++;

    if (trenutnaSlika < slike.length) {
        // Postavljanje nove slike
        document.getElementById('test-slika').src = slike[trenutnaSlika].src;
        document.getElementById('korisnikov-odgovor').value = '';
        // Resetiraj unos i vrati fokus na polje za unos
        const unos = document.getElementById('korisnikov-odgovor');
        unos.value = '';
        unos.focus();  // Postavljanje fokusa na polje za unos
    } else {
        // Prikaz konačnog rezultata nakon posljednje slike
        prikaziRezultat();
    }
}


// Funkcija za prikaz rezultata
function prikaziRezultat() {
    let rezultat = document.getElementById('rezultat');
    rezultat.innerHTML = `<h2>Vaš rezultat: ${tocanBroj}/${slike.length}</h2>`;

    // Sakrij unos i gumb nakon završetka testa
    document.getElementById('korisnikov-odgovor').style.display = 'none';
    document.querySelector('button').style.display = 'none';
}
// Funkcija za prikaz forme za unos podataka
function prikaziFormu() {
    document.getElementById('forma').style.display = 'block';
}

// Funkcija za spremanje podataka
function spremiPodatke() {
    const spol = document.getElementById('spol').value;
    const daltonizamRoditelji = document.querySelector('input[name="daltonizam-roditelji"]:checked').value;

    // Spremanje podataka u lokalnu pohranu (simulacija baze podataka)
    let podaci = JSON.parse(localStorage.getItem('rezultati')) || [];
    podaci.push({
        rezultat: tocanBroj,
        spol: spol,
        daltonizamRoditelji: daltonizamRoditelji
    });

    localStorage.setItem('rezultati', JSON.stringify(podaci));

    // Sakrij formu nakon spremanja
    document.getElementById('forma').style.display = 'none';
    alert('Rezultat uspješno spremljen!');
}

// Funkcija za prikaz statistike
function prikaziStatistiku() {
    const podaci = JSON.parse(localStorage.getItem('rezultati')) || [];
    let statistikaElement = document.getElementById('statistika');
    statistikaElement.innerHTML = '<h2>Statistika:</h2>';

    podaci.forEach((podatak, index) => {
        statistikaElement.innerHTML += `<p>Učenik ${index + 1}: Rezultat: ${podatak.rezultat}, Spol: ${podatak.spol}, Roditelji pate od daltonizma: ${podatak.daltonizamRoditelji}</p>`;
    });
}



