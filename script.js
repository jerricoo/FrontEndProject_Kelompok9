document.addEventListener("DOMContentLoaded", () => {
    const btnHitung = document.querySelector(".btn-hitung");
    const btnReset = document.querySelector(".btn-reset");

    // Ambil elemen input
    const jenisKendaraan = document.querySelector(".Input-Data select:nth-of-type(1)");
    const inputNJKB = document.querySelector(".Input-Data input[type='number']");
    const provinsi = document.querySelector(".Input-Data select:nth-of-type(2)");
    const kepemilikanKe = document.querySelector(".Input-Data input[type='number']");
    const koefisienBobot = document.querySelector(".Input-Data select:nth-of-type(3)");

    // Elemen hasil
    const swdklljSelect = document.querySelector("#swdkllj");
    const tarifPKB = document.querySelectorAll(".Hasil-Data input")[0];
    const pkbTerutang = document.querySelectorAll(".Hasil-Data input")[1];
    const opsenPKB = document.querySelectorAll(".Hasil-Data input")[2];
    const totalPKB = document.querySelectorAll(".Hasil-Data input")[3];

    // Mapping SWDKLLJ
    const swdklljMapping = {
        "A": 3000,
        "B": 23000,
        "C1": 35000,
        "C2": 83000
    };

    // Fungsi Hitung Pajak
    function hitungPajak() {
        const njkb = parseFloat(inputNJKB.value) || 0;
        const kepemilikan = parseInt(kepemilikanKe.value) || 1;
        const bobot = parseFloat(koefisienBobot.value) || 1;

        // Tentukan tarif dasar PKB (bisa disesuaikan per daerah)
        let tarifDasar = 0.02; // default kepemilikan pertama
        if (kepemilikan === 2) tarifDasar = 0.025;
        else if (kepemilikan === 3) tarifDasar = 0.03;
        else if (kepemilikan === 4) tarifDasar = 0.035;
        else if (kepemilikan === 5) tarifDasar = 0.04;
        else if (kepemilikan >= 6) tarifDasar = 0.045;

        // PKB terutang = NJKB × Tarif Dasar × Koefisien Bobot
        const pkb = njkb * tarifDasar * bobot;

        // Opsen PKB = 66% × PKB
        const opsen = pkb * 0.66;

        // SWDKLLJ
        const swdklljVal = swdklljMapping[swdklljSelect.value] || 0;

        // Total
        const total = pkb + opsen + swdklljVal;

        // Tampilkan hasil
        tarifPKB.value = (tarifDasar * 100).toFixed(2) + " %";
        pkbTerutang.value = pkb.toLocaleString("id-ID");
        opsenPKB.value = opsen.toLocaleString("id-ID");
        totalPKB.value = total.toLocaleString("id-ID");
    }

    // Fungsi Reset
    function resetForm() {
        tarifPKB.value = "";
        pkbTerutang.value = "";
        opsenPKB.value = "";
        totalPKB.value = "";
    }

    btnHitung.addEventListener("click", hitungPajak);
    btnReset.addEventListener("click", resetForm);
});
