document.addEventListener("DOMContentLoaded", () => {
    const btnHitung = document.querySelector(".btn-hitung");
    const btnReset = document.querySelector(".btn-reset");

    const selectJenis = document.querySelector(".Input-Data select:nth-of-type(1)");
    const inputNJKB = document.querySelector("#njkb");
    const selectProvinsi = document.querySelector(".Input-Data select:nth-of-type(2)");
    const selectKepemilikan = document.querySelector(".Input-Data select:nth-of-type(3)");
    const selectBobot = document.querySelector(".Input-Data select:nth-of-type(4)");
    const selectSWDKLLJ = document.querySelector("#swdkllj");

    const tarifPKB = document.querySelectorAll(".Hasil-Data input")[0];
    const pkbTerutang = document.querySelectorAll(".Hasil-Data input")[1];
    const opsenPKB = document.querySelectorAll(".Hasil-Data input")[2];
    const totalPKB = document.querySelectorAll(".Hasil-Data input")[3];

    function getTarifProvinsi(provinsi, kepemilikan) {
        let tarifDasar = 0.012; 
        if (kepemilikan > 1) {
            tarifDasar = 0.02 + (kepemilikan - 2) * 0.005; 
        }

        if (kepemilikan === 1 && tarifDasar > 0.012) tarifDasar = 0.012;
        if (kepemilikan > 1 && tarifDasar > 0.06) tarifDasar = 0.06;

        return tarifDasar;
    }

    function hitungPajak() {
        const njkb = parseFloat(inputNJKB.value) || 0;
        const provinsi = selectProvinsi.value;
        const kepemilikan = parseInt(selectKepemilikan.value);
        const bobot = parseFloat(selectBobot.value);
        let swdkllj = 0;

        switch (selectSWDKLLJ.value) {
            case "A": swdkllj = 3000; break;
            case "B": swdkllj = 23000; break;
            case "C1": swdkllj = 35000; break;
            case "C2": swdkllj = 83000; break;
            default: swdkllj = 0; 
        }

        swdkllj += 3000;

        let tarifFinal = getTarifProvinsi(provinsi, kepemilikan);
        const pkb = njkb * bobot * tarifFinal;
        const opsen = pkb * 0.66;
        const total = pkb + opsen + swdkllj;

        
        tarifPKB.value = (tarifFinal * 100).toFixed(2) + " %";
        pkbTerutang.value = pkb.toLocaleString("id-ID");
        opsenPKB.value = opsen.toLocaleString("id-ID");
        totalPKB.value = total.toLocaleString("id-ID");
    }

    function resetForm() {
        inputNJKB.value = "";
        selectJenis.selectedIndex = 0;
        selectProvinsi.selectedIndex = 0;
        selectKepemilikan.selectedIndex = 0;
        selectBobot.selectedIndex = 0;
        selectSWDKLLJ.selectedIndex = 0;

        tarifPKB.value = "";
        pkbTerutang.value = "";
        opsenPKB.value = "";
        totalPKB.value = "";
    }

    btnHitung.addEventListener("click", hitungPajak);
    btnReset.addEventListener("click", resetForm);
});
