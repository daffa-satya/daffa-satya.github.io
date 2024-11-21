document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const activeButton = document.querySelector("#content button");
      if (activeButton) {
        activeButton.click();
      }
    }
  });
  
  function selectOption(option) {
    const content = document.getElementById("content");
    const output = document.getElementById("output");
  
    content.innerHTML = "";
    output.style.display = "none";
  
    if (option === 1) {
      // Ketidakpastian Tunggal
      content.innerHTML = `
        <h2>Ketidakpastian Tunggal</h2>
        <label for="value">Nilai:</label>
        <input type="number" id="value" step="any">
        <label for="scale">Skala Terkecil:</label>
        <input type="number" id="scale" step="any">
        <button onclick="calculateSingleUncertainty()">Hitung</button>
      `;
    } else if (option === 2) {
      // Ketidakpastian Berulang
      content.innerHTML = `
        <h2>Ketidakpastian Berulang</h2>
        <label for="measurements">Masukkan Pengukuran (pisahkan dengan spasi):</label>
        <input type="text" id="measurements">
        <button onclick="calculateRepeatedUncertainty()">Hitung</button>
      `;
    } else if (option === 3) {
      // Angka Penting
      content.innerHTML = `
        <h2>Angka Penting</h2>
        <label for="significantValue">Nilai:</label>
        <input type="text" id="significantValue">
        <button onclick="calculateSignificantFigures()">Hitung</button>
      `;
    } else if (option === 4) {
      // Tutorial dan Credit
      content.innerHTML = `
        <h2>Tutorial dan Credit</h2>
        <p>Docs: <a href="https://github.com/not-robot-49/calc-ketidakpastian" target="_blank">GitHub</a></p>
        <p>YT: <a href="https://youtube.com" target="_blank">YouTube</a></p>
        <p>Made by Daffa Satya & Raihan Altaf</p>
        <p>Contact: ig: @rhn.alt / @sat1rya</p>
      `;
    } else if (option === 5) {
      // Exit
      content.innerHTML = `<h2>Terima kasih telah menggunakan program ini!</h2>`;
    }
  
    content.style.display = "block";
  }
  
  function calculateSingleUncertainty() {
    const value = parseFloat(document.getElementById("value").value);
    const scale = parseFloat(document.getElementById("scale").value);
  
    if (isNaN(value) || isNaN(scale)) {
      alert("Masukkan nilai yang valid!");
      return;
    }
  
    const uncertainty = scale / 2;
    const precision = Math.max(1, countDecimalPlaces(scale)); // Prefix 1 untuk desimal minimum
  
    const output = document.getElementById("output");
    output.innerHTML = `Hasil: ${value.toFixed(precision)} ± ${uncertainty.toFixed(precision)}`;
    output.style.display = "block";
  }
  
  function calculateRepeatedUncertainty() {
    const measurements = document.getElementById("measurements").value.split(" ").map(Number);
    if (measurements.some(isNaN)) {
      alert("Masukkan nilai yang valid!");
      return;
    }
  
    // Menentukan nilai maksimum dan minimum
    const max = Math.max(...measurements);
    const min = Math.min(...measurements);
  
    // Menghitung jangkauan (range) dan ketidakpastian range
    const range = (max - min) / 2;  // Ketidakpastian range = ½ x (nilai max - nilai min)
    const mean = (max + min) / 2;   // Nilai rata-rata = ½ x (nilai max + nilai min)
  
    // Menghitung standar deviasi sampel
    const stdDev = calculateSampleStdDev(measurements, mean);
  
    const precision = Math.max(1, countDecimalPlaces(range));
  
    const output = document.getElementById("output");
    output.innerHTML = `
      Nilai Rata-Rata: ${mean.toFixed(precision)}<br>
      Ketidakpastian (Range): ±${range.toFixed(precision)}<br>
      Standar Deviasi Sampel: ±${stdDev.toFixed(precision)}
    `;
    output.style.display = "block";
  }
  
  function calculateSignificantFigures() {
    const value = document.getElementById("significantValue").value.trim();
  
    if (!/^[0-9.]+$/.test(value)) {
      alert("Masukkan nilai yang valid!");
      return;
    }
  
    const significantFigures = countSignificantFigures(value);
    const precision = countDecimalPlaces(value);
  
    const output = document.getElementById("output");
    output.innerHTML = `
      Angka Penting: ${significantFigures}<br>
      Presisi: ${precision} angka di belakang koma
    `;
    output.style.display = "block";
  }
  
  function countDecimalPlaces(num) {
    const str = num.toString();
    if (str.includes(".")) {
      return str.split(".")[1].length;
    }
    return 0;
  }
  
  function calculateSampleStdDev(data, mean) {
    const variance =
      data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (data.length - 1);
    return Math.sqrt(variance);
  }
  
  function countSignificantFigures(value) {
    value = value.replace(/^0+/, ""); // Remove leading zeros
    const decimalIndex = value.indexOf(".");
    if (decimalIndex !== -1) {
      return value.replace(".", "").replace(/^0+|0+$/g, "").length; // Count significant figures correctly
    }
    return value.replace(/0+$/g, "").length; // Trailing zeros are not significant if no decimal
  }  