// =====================================================
// URL GOOGLE APPS SCRIPT
// =====================================================

const URL_GOOGLE_APPS_SCRIPT =
    "https://script.google.com/macros/s/AKfycbz-WjJBG1VXFye3FrnOGpX37FBZlaA59W2mWoPUWVAyF_mPApzb3MNzsWPNoxdDqZ6OnA/exec";


// =====================================================
// AMBIL ELEMENT HTML
// =====================================================

const form = document.getElementById("suratForm");
const notification = document.getElementById("notification");
const submitBtn = document.getElementById("submitBtn");


// =====================================================
// EVENT SUBMIT FORM
// =====================================================

form.addEventListener("submit", async function (event) {

    event.preventDefault();


    // Ambil data dari form

    const data = {
        nama: document.getElementById("nama").value.trim(),

        nis: document.getElementById("nis").value.trim(),

        kelas: document.getElementById("kelas").value,

        jurusan: document.getElementById("jurusan").value,

        jenisSurat:
            document.getElementById("jenisSurat").value,

        keperluan:
            document.getElementById("keperluan").value.trim(),

        whatsapp:
            document.getElementById("whatsapp").value.trim()
    };


    // =================================================
    // VALIDASI DATA
    // =================================================

    if (
        data.nama === "" ||
        data.nis === "" ||
        data.kelas === "" ||
        data.jurusan === "" ||
        data.jenisSurat === "" ||
        data.keperluan === "" ||
        data.whatsapp === ""
    ) {

        showNotification(
            "❌ Semua data harus diisi!",
            "error"
        );

        return;
    }


    // =================================================
    // VALIDASI URL
    // =================================================

    if (
        URL_GOOGLE_APPS_SCRIPT ===
        "MASUKKAN_URL_WEB_APP_GOOGLE_APPS_SCRIPT_DI_SINI"
    ) {

        showNotification(
            "❌ URL Google Apps Script belum dimasukkan!",
            "error"
        );

        return;
    }


    // =================================================
    // TOMBOL LOADING
    // =================================================

    submitBtn.disabled = true;

    submitBtn.innerText = "Mengirim data...";


    try {

        // =================================================
        // KIRIM DATA KE GOOGLE APPS SCRIPT
        // =================================================

        await fetch(
            URL_GOOGLE_APPS_SCRIPT,
            {
                method: "POST",

                mode: "no-cors",

                headers: {
                    "Content-Type":
                        "text/plain;charset=utf-8"
                },

                body: JSON.stringify(data)
            }
        );


        // =================================================
        // NOTIFIKASI BERHASIL
        // =================================================

        showNotification(
            "✅ Pengajuan berhasil dikirim dan disimpan ke Google Sheets!",
            "success"
        );


        // Kosongkan form

        form.reset();


    } catch (error) {

        console.error(
            "Error:",
            error
        );


        showNotification(
            "❌ Gagal mengirim data. Silakan coba lagi.",
            "error"
        );

    }


    // =================================================
    // KEMBALIKAN TOMBOL
    // =================================================

    submitBtn.disabled = false;

    submitBtn.innerText =
        "Kirim Pengajuan";

});


// =====================================================
// FUNGSI NOTIFIKASI
// =====================================================

function showNotification(message, type) {

    notification.innerText = message;

    notification.className =
        "notification " + type;


    notification.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}
