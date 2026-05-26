        let temporaryOrder = {};
        let ticketIdCounter = 1;
        let countdownInterval = null;

        function switchUserMenu(menuName, element) {
            document.querySelectorAll('.user-section-content').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.nav-user-item').forEach(i => i.classList.remove('active'));
            document.getElementById('user-content-' + menuName).classList.add('active');
            if (element) element.classList.add('active');
        }

        function quickBuy(concertName) {
            switchUserMenu('tiket', document.getElementById('nav-tiket'));
            document.getElementById('orderConcertName').value = concertName;
            document.getElementById('orderCustomerName').value = "Pelanggan Terpilih";
            document.getElementById('orderCategory').value = "Festival Arena";
            document.getElementById('orderDate').value = "2026-08-15";
            updateConcertDetails();
            alert("✓ Berhasil memilih " + concertName + ". Silakan klik tombol 'Proses Pemesanan' untuk memunculkan QRIS!");
        }

        function updateConcertDetails() {
            const selected = document.getElementById('orderConcertName').value;
            const title = document.getElementById('preview-title');
            const venue = document.getElementById('preview-venue');
            const gate = document.getElementById('preview-gate');
            const quota = document.getElementById('preview-quota');

            if(selected === "Summer Music Fest 2026") {
                title.innerText = "Summer Music Fest"; venue.innerText = "Stadion Utama GBK"; gate.innerText = "Gate A & B"; quota.innerText = "500 Kursi";
            } else if(selected === "Galaxy EDM Night 2026") {
                title.innerText = "Galaxy EDM Night"; venue.innerText = "ICE BSD Tangerang"; gate.innerText = "Hall 3"; quota.innerText = "350 Kursi";
            } else if(selected === "Neon Party Senandung") {
                title.innerText = "Neon Party Senandung"; venue.innerText = "Kridosono Yogyakarta"; gate.innerText = "Pintu Barat"; quota.innerText = "200 Kursi";
            } else if(selected === "Seoul Wave In Jakarta") {
                title.innerText = "Seoul Wave In Jakarta"; venue.innerText = "Ancol Beach City"; gate.innerText = "Gate Utama"; quota.innerText = "600 Kursi";
            } else {
                title.innerText = "Belum Ada Konser Dipilih"; venue.innerText = "-"; gate.innerText = "-"; quota.innerText = "-";
            }
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
                alert("Komponen QRIS & Countdown Aktif! Selesaikan pembayaran di kolom kanan.");
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

        function simulatePaymentSuccess() {
            clearInterval(countdownInterval);
            document.getElementById('countdown-display').innerText = "05 : 00";
            
            const container = document.getElementById('ticket-list-container');
            ticketIdCounter++;
            const newId = 'ticket-kustom-' + ticketIdCounter;

            const html = `
                <div class="ticket-card-user" id="${newId}" style="border-left: 4px solid #ff4fd8;">
                    <div class="ticket-info">
                        <span class="badge badge-success">E-Tiket Siap</span>
                        <h4 class="t-concert" style="font-size: 20px; margin-top: 8px;">${temporaryOrder.concert}</h4>
                        <p style="margin: 5px 0;">📆 Tanggal: <span class="t-date" data-raw="${temporaryOrder.date}">${temporaryOrder.date}</span></p>
                        <p style="margin: 2px 0;">👤 Pemesan: <span class="t-name">${temporaryOrder.name}</span></p>
                        <p style="margin: 2px 0;">🎫 Kategori: <strong class="t-category" style="color: #ff4fd8;">${temporaryOrder.category}</strong></p>
                        <div style="margin-top: 15px;">
                            <button class="btn-action btn-edit" onclick="prepareEditTicket('${newId}')" style="background: #ff4fd8; color:#100516; font-weight:bold; margin-right: 5px;">Ubah Detail</button>
                            <button class="btn-action btn-delete" onclick="cancelTicket('${newId}')">Batalkan Tiket</button>
                        </div>
                    </div>
                    <div class="ticket-qr-preview">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${newId}" class="t-qr" alt="QR">
                        <div style="color:#100516; font-size:10px; margin-top:5px; font-weight:600;">Gate Scan Masuk</div>
                    </div>
                </div>`;
            
            container.insertAdjacentHTML('afterbegin', html);

            const table = document.getElementById('history-table-body');
            const randTx = 'TX-' + Math.floor(10000 + Math.random() * 90000);
            table.insertAdjacentHTML('afterbegin', `<tr style="border-bottom: 1px solid #331640; color: #fff;"><td style="padding:12px; color:#bcbcbc;">${randTx}</td><td style="padding:12px;">${temporaryOrder.concert}</td><td style="padding:12px;">${temporaryOrder.category}</td><td style="padding:12px;">QRIS Elektronik</td><td style="padding:12px;"><span style="color:#ff4fd8; background:rgba(255,79,216,0.1); padding:4px 8px; border-radius:5px;">TERDAFTAR</span></td></tr>`);
            
            document.getElementById('trending-concert-name').innerText = temporaryOrder.concert;
            alert("✓ Sukses! Komponen pendaftaran berhasil mencatat data pembayaran baru.");
            resetFormState();
        }

        function prepareEditTicket(cardId) {
            const ticket = document.getElementById(cardId);
            document.getElementById('orderCustomerName').value = ticket.querySelector('.t-name').innerText;
            document.getElementById('orderConcertName').value = ticket.querySelector('.t-concert').innerText;
            document.getElementById('orderCategory').value = ticket.querySelector('.t-category').innerText;
            document.getElementById('orderDate').value = ticket.querySelector('.t-date').getAttribute('data-raw') || "2026-06-20";

            updateConcertDetails();
            document.getElementById('editTicketId').value = cardId;
            document.getElementById('form-title').innerText = "📝 Edit Detail Pilihan Tiket Anda";
            document.getElementById('submitBtn').innerText = "Simpan Perubahan";
            document.getElementById('cancelEditBtn').style.display = "inline-block";
        }

        function applyTicketUpdate(cardId) {
            const ticket = document.getElementById(cardId);
            ticket.querySelector('.t-concert').innerText = temporaryOrder.concert;
            ticket.querySelector('.t-name').innerText = temporaryOrder.name;
            ticket.querySelector('.t-category').innerText = temporaryOrder.category;
            ticket.querySelector('.t-date').innerText = temporaryOrder.date;
            ticket.querySelector('.t-date').setAttribute('data-raw', temporaryOrder.date);
            
            alert("✓ Perubahan komponen detail tiket berhasil disimpan!");
            resetFormState();
        }

        function resetFormState() {
            document.getElementById('orderTicketForm').reset();
            document.getElementById('editTicketId').value = "";
            document.getElementById('form-title').innerText = "🎟️ Form Pemesanan Tiket Baru";
            document.getElementById('submitBtn').innerText = "Proses Pemesanan";
            document.getElementById('cancelEditBtn').style.display = "none";
            updateConcertDetails();
            
            const qrisSection = document.getElementById('pembayaran-section');
            qrisSection.style.opacity = "0.5";
            qrisSection.style.pointerEvents = "none";
        }

        function cancelTicket(cardId) {
            if(confirm("Batalkan tiket aktif ini?")) {
                document.getElementById(cardId).remove();
            }
        }

        function updateProfile(event) {
            event.preventDefault();
            alert("Profil berhasil diperbarui!");
        }
