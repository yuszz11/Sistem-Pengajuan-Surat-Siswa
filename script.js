const URL_GOOGLE_APPS_SCRIPT ="https://script.google.com/macros/s/AKfycbxkulq0zKDZaGbK3iH1YcjltGBbGJOOk-_XLVBztklUjLRmIr0jPV_1pfijJPR3tpwVgw/exec";


// Ambil elemen form

const form = document.getElementById("suratForm");

const notification =
    document.getElementById("notification");

const submitBtn =
    document.getElementById("submitBtn");


// Saat form dikirim

form.addEventListener("submit", async function(event) {

    event.preventDefault();


    // Ambil data

    const data = {

        nama:
            document.getElementById("nama").value.trim(),

        nis:
            document.getElementById("nis").value.trim(),

        kelas:
            document.getElementById("kelas").value,

        jurusan:
            document.getElementById("jurusan").value,

        jenisSurat:
            document.getElementById("jenisSurat").value,

        keperluan:
            document.getElementById("keperluan").value.trim(),

        whatsapp:
            document.getElementById("whatsapp").value.trim()

    };


    // Validasi

    if (
        !data.nama ||
        !data.nis ||
        !data.kelas ||
        !data.jurusan ||
        !data.jenisSurat ||
        !data.keperluan ||
        !data.whatsapp
    ) {

        showNotification(
            "Harap lengkapi semua data!",
            "error"
        );

        return;
    }


    // Ubah tombol

    submitBtn.disabled = true;

    submitBtn.innerText =
        "Mengirim...";


    try {

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


        // Berhasil

        showNotification(
            "Pengajuan berhasil dikirim! Data telah tersimpan.",
            "success"
        );


        // Reset form

        form.reset();


    } catch (error) {

        console.error(error);

        showNotification(
            "Terjadi kesalahan saat mengirim data.",
            "error"
        );

    }


    submitBtn.disabled = false;

    submitBtn.innerText =
        "Kirim Pengajuan";

});


// Fungsi notifikasi

function showNotification(message, type) {

    notification.innerText = message;

    notification.className =
        "notification " + type;

    notification.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}
