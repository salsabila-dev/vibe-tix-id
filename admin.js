
        let rowCounter = 2;

        function handleAdminFormSubmit(event) {
            event.preventDefault();
            const editId = document.getElementById('editEventId').value;
            
            const name = document.getElementById('adminConcertName').value;
            const quota = document.getElementById('adminConcertQuota').value;
            const price = document.getElementById('adminConcertPrice').value;
            const status = document.getElementById('adminConcertStatus').value;

            if (editId !== "") {
                // Eksekusi Update Data
                const row = document.getElementById(editId);
                row.querySelector('.td-name').innerText = name;
                row.querySelector('.td-quota').innerText = quota + " Kursi";
                row.querySelector('.td-price').innerText = price.startsWith('Rp') ? price : 'Rp' + price;
                
                const statusTd = row.querySelector('.td-status');
                if(status === "BUKA") {
                    statusTd.innerHTML = `<span style="color:#2bc48a; background:rgba(43,196,138,0.1); padding:4px 8px; border-radius:5px; font-size:12px; font-weight:bold;">BUKA</span>`;
                } else if(status === "PENUH") {
                    statusTd.innerHTML = `<span style="color:#ff9f43; background:rgba(255,159,67,0.1); padding:4px 8px; border-radius:5px; font-size:12px; font-weight:bold;">PENUH</span>`;
                } else {
                    statusTd.innerHTML = `<span style="color:#ff4f4f; background:rgba(255,79,79,0.1); padding:4px 8px; border-radius:5px; font-size:12px; font-weight:bold;">TUTUP</span>`;
                }
                alert("✓ Event konser Berhasil diperbarui!");
            } else {
                // Eksekusi Create Data Baru
                rowCounter++;
                const newRowId = 'row-' + rowCounter;
                const tableBody = document.getElementById('admin-concert-table-body');
                
                let badgeColor = status === "BUKA" ? "#2bc48a" : (status === "PENUH" ? "#ff9f43" : "#ff4f4f");
                let bgBadge = status === "BUKA" ? "rgba(43,196,138,0.1)" : (status === "PENUH" ? "rgba(255,159,67,0.1)" : "rgba(255,79,79,0.1)");

                const newRowHTML = `
                    <tr id="${newRowId}" style="border-bottom: 1px solid #222; animation: fadeInMenu 0.4s ease;">
                        <td class="td-name" style="padding: 12px 10px; font-weight: 500;">${name}</td>
                        <td class="td-quota" style="padding: 12px 10px;">${quota} Kursi</td>
                        <td class="td-price" style="padding: 12px 10px;">${price.startsWith('Rp') ? price : 'Rp' + price}</td>
                        <td class="td-status" style="padding: 12px 10px;"><span style="color:${badgeColor}; background:${bgBadge}; padding:4px 8px; border-radius:5px; font-size:12px; font-weight:bold;">${status}</span></td>
                        <td style="padding: 12px 10px; text-align: center;">
                            <button onclick="prepareEditEvent('${newRowId}')" style="background:#2bc48a; color:#fff; border:none; padding:6px 12px; border-radius:4px; cursor:pointer; margin-right:5px; font-size:12px;">Edit</button>
                            <button onclick="deleteEvent('${newRowId}')" style="background:#ff4f4f; color:#fff; border:none; padding:6px 12px; border-radius:4px; cursor:pointer; font-size:12px;">Hapus</button>
                        </td>
                    </tr>
                `;
                tableBody.insertAdjacentHTML('beforeend', newRowHTML);
                alert("✓ Event konser musik baru berhasil diterbitkan!");
            }
            recalculateStats();
            resetAdminForm();
        }

        function prepareEditEvent(rowId) {
            const row = document.getElementById(rowId);
            const name = row.querySelector('.td-name').innerText;
            const quota = row.querySelector('.td-quota').innerText.replace(" Kursi", "");
            const price = row.querySelector('.td-price').innerText;
            const status = row.querySelector('.td-status').innerText;

            document.getElementById('adminConcertName').value = name;
            document.getElementById('adminConcertQuota').value = quota;
            document.getElementById('adminConcertPrice').value = price;
            document.getElementById('adminConcertStatus').value = status;

            document.getElementById('editEventId').value = rowId;
            document.getElementById('admin-form-title').innerText = "📝 Perbarui Data Modul Event";
            document.getElementById('adminSubmitBtn').innerText = "Simpan Perubahan";
            document.getElementById('adminCancelBtn').style.display = "inline-block";
        }

        function deleteEvent(rowId) {
            if (confirm("Apakah Anda yakin ingin menghapus data konser ini dari sistem utama?")) {
                document.getElementById(rowId).remove();
                recalculateStats();
                if(document.getElementById('editEventId').value === rowId) resetAdminForm();
            }
        }

        function recalculateStats() {
            const totalRows = document.getElementById('admin-concert-table-body').children.length;
            document.getElementById('admin-stat-events').innerText = totalRows + " Konser";
        }

        function resetAdminForm() {
            document.getElementById('adminEventForm').reset();
            document.getElementById('editEventId').value = "";
            document.getElementById('admin-form-title').innerText = "➕ Tambah / Edit Event Konser";
            document.getElementById('adminSubmitBtn').innerText = "Publish Event";
            document.getElementById('adminCancelBtn').style.display = "none";
        }
