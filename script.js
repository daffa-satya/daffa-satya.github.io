function selectOption(option) {
    const content = document.getElementById("content");
    const output = document.getElementById("output");
  
    content.innerHTML = "";
    output.style.display = "none";
  
    if (option === 1) {
      content.innerHTML = `
        <h2>Ketidakpastian Tunggal</h2>
        <label for="value">Nilai:</label>
        <input type="number" id="value" class="form-control" step="any">
        <label for="scale" class="mt-2">Skala Terkecil:</label>
        <input type="number" id="scale" class="form-control" step="any">
        <button class="btn btn-success mt-2" onclick="calculateSingleUncertainty()">Hitung</button>
      `;
    } else if (option === 2) {
      content.innerHTML = `
        <h2>Ketidakpastian Berulang</h2>
        <label for="measurements">Masukkan Pengukuran (pisahkan dengan spasi):</label>
        <input type="text" id="measurements" class="form-control">
        <button class="btn btn-success mt-2" onclick="calculateRepeatedUncertainty()">Hitung</button>
      `;
    } else if (option === 3) {
      content.innerHTML = `
        <h2>Angka Penting</h2>
        <label for="significantValue">Nilai:</label>
        <input type="text" id="significantValue" class="form-control">
        <button class="btn btn-success mt-2" onclick="calculateSignificantFigures()">Hitung</button>
      `;
    } else if (option === 4) {
      content.innerHTML = `
        <h2>Tutorial dan Credit</h2>
        <p>Docs: <a href="https://github.com/not-robot-49/calc-ketidakpastian" target="_blank">GitHub</a></p>
        <p>YT: <a href="https://youtube.com" target="_blank">YouTube</a></p>
        <p>Made by Daffa Satya & Raihan Altaf</p>
        <p>Contact: ig: @rhn.alt / @sat1rya</p>
      `;
    } else if (option === 5) {
      content.innerHTML = `<h2>Terima kasih telah menggunakan program ini!</h2>`;
    }
  
    content.style.display = "block";
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
    const range = (max - min) / 2;
    const mean = (max + min) / 2;
  
    // Menghitung standar deviasi sampel
    const stdDev = calculateSampleStdDev(measurements, mean);
  
    const precision = Math.max(1, countDecimalPlaces(range));
  
    const output = document.getElementById("output");
    output.style.display = "block";
    output.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Hasil Ketidakpastian Berulang</h5>
          <p class="card-text">Nilai Rata-Rata: ${mean.toFixed(precision)}</p>
          <p class="card-text">Ketidakpastian (Range): ±${range.toFixed(precision)}</p>
          <p class="card-text">Standar Deviasi Sampel: ±${stdDev.toFixed(precision)}</p>
        </div>
      </div>
    `;
  }
  
  // Fungsi lainnya tetap sama
  