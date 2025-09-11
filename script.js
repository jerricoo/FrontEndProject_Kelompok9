document.addEventListener("DOMContentLoaded", () => {
    const btnHitung = document.querySelector(".btn-hitung");
    const btnReset = document.querySelector(".btn-reset");

    const inputNJKB = document.querySelectorAll(".Input-Data input")[0];
    const selectProvinsi = document.querySelectorAll(".Input-Data select")[0];
    const selectKepemilikan = document.querySelectorAll(".Input-Data select")[1];
    const selectBobot = document.querySelectorAll(".Input-Data select")[2];

    const biayaSWDKLLJ = document.querySelectorAll(".Hasil-Data input")[0];
    const tarifPKB = document.querySelectorAll(".Hasil-Data input")[1];
    const pkbTerutang = document.querySelectorAll(".Hasil-Data input")[2];
    const opsenPKB = document.querySelectorAll(".Hasil-Data input")[3];
    const totalPKB = document.querySelectorAll(".Hasil-Data input")[4];

    function hitungPajak() {
        const njkb = parseFloat(inputNJKB.value) || 0;
        const kepemilikan = parseInt(selectKepemilikan.value);
        const bobot = parseFloat(selectBobot.value);
        let tarifDasar = 0.02;
        if (kepemilikan === 2) tarifDasar = 0.025;
        else if (kepemilikan === 3) tarifDasar = 0.03;
        else if (kepemilikan === 4) tarifDasar = 0.035;
        else if (kepemilikan === 5) tarifDasar = 0.04;
        else if (kepemilikan >= 6) tarifDasar = 0.045;

     
        const pkb = njkb * tarifDasar * bobot;
        
        const opsen = pkb * 0.66;
        let swdkllj = 143000; 

        const total = pkb + opsen + swdkllj;

        biayaSWDKLLJ.value = swdkllj.toLocaleString("id-ID");
        tarifPKB.value = (tarifDasar * 100).toFixed(2) + " %";
        pkbTerutang.value = pkb.toLocaleString("id-ID");
        opsenPKB.value = opsen.toLocaleString("id-ID");
        totalPKB.value = total.toLocaleString("id-ID");
    }

    function resetForm() {
        biayaSWDKLLJ.value = "";
        tarifPKB.value = "";
        pkbTerutang.value = "";
        opsenPKB.value = "";
        totalPKB.value = "";
    }

    btnHitung.addEventListener("click", hitungPajak);
    btnReset.addEventListener("click", resetForm);
});