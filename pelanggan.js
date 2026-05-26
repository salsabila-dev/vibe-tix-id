let temporaryOrder = {};
let ticketIdCounter = 1;
let countdownInterval = null;

// Navigasi Utama
document.querySelectorAll('.nav-user-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        switchUserMenu(this.dataset.target, this);
    });
});

function switchUserMenu(menuName, element) {
    document.querySelectorAll('.user-section-content').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-user-item').forEach(i => i.classList.remove('active'));
    document.getElementById('user-content-' + menuName).classList.add('active');
    if (element) element.classList.add('active');
}

// Fitur Pemesanan
document.getElementById('orderTicketForm').addEventListener('submit', handleFormSubmit);
document.getElementById('orderConcertName').addEventListener('change', updateConcertDetails);

function quickBuy(concertName) {
    switchUserMenu('tiket', document.getElementById('nav-tiket'));
    document.getElementById('orderConcertName').value = concertName;
    document.getElementById('orderCustomerName').value = "Pelanggan Terpilih";
    document.getElementById('orderCategory').value = "Festival Arena";
    document.getElementById('orderDate').value = "2026-08-15";
    updateConcertDetails();
}

function updateConcertDetails() {
    const selected = document.getElementById('orderConcertName').value;
    const concertData = {
        "Summer Music Fest 2026": { title: "Summer Music Fest", venue: "Stadion Utama GBK", gate: "Gate A & B", quota: "500 Kursi" },
        "Galaxy EDM Night 2026": { title: "Galaxy EDM Night", venue: "ICE BSD Tangerang", gate: "Hall 3", quota: "350 Kursi" },
        "Neon Party Senandung": { title: "Neon Party Senandung", venue: "Kridosono Yogyakarta", gate: "Pintu Barat", quota: "200 Kursi" },
        "Seoul Wave In Jakarta": { title: "Seoul Wave In Jakarta", venue: "Ancol Beach City", gate: "Gate Utama", quota: "600 Kursi" }
    };

    const data = concertData[selected] || { title: "Belum Ada Konser Dipilih", venue: "-", gate: "-", quota: "-" };
    document.getElementById('preview-title').innerText = data.title;
    document.getElementById('preview-venue').innerText = data.venue;
    document.getElementById('preview-gate').innerText = data.gate;
    document.getElementById('preview-quota').innerText = data.quota;
}

function handleFormSubmit(event) {
    event.preventDefault();
    const editId = document.getElementById('editTicketId').value;
    temporaryOrder = {
        name: document.getElementById('orderCustomerName').value,
        concert: document.getElementById('orderConcertName').value,
        category: document.getElementById('orderCategory').value,
        date: document.getElementById('orderDate').value
    };

    if (editId !== "") {
        applyTicketUpdate(editId);
    } else {
        const qrisSection = document.getElementById('pembayaran-section');
        qrisSection.style.opacity = "1";
        qrisSection.style.pointerEvents = "auto";
        document.getElementById('qrisDetailText').innerHTML = `<strong>Konser:</strong> ${temporaryOrder.concert}<br><strong>Kategori:</strong> ${temporaryOrder.category}<br><strong>Tagihan:</strong> Rp550.000`;
        document.getElementById('qrisImage').src = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=Pay-${encodeURIComponent(temporaryOrder.concert)}`;
        startCountdown();
    }
}

function startCountdown() {
    clearInterval(countdownInterval);
    let time = 300;
    const display = document.getElementById('countdown-display');
    countdownInterval = setInterval(() => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        display.innerText = `${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}`;
        if (--time < 0) {
            clearInterval(countdownInterval);
            display.innerText = "EXPIRED";
            resetFormState();
        }
    }, 1000);
}

// Fungsi pendukung lainnya (simulatePaymentSuccess, resetFormState, dll.) 
// tetap dapat diletakkan di sini...