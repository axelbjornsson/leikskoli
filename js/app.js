/* Tengir stjórnborðið við verkefnasmiðina og sér um prentun og vistun. */
(function (global) {
  "use strict";

  var app = global.Leikskoli;
  var form = document.getElementById("controls");
  var output = document.getElementById("output");
  var coloringOptions = document.getElementById("coloring-options");
  var letterOptions = document.getElementById("letter-options");
  var letterSelect = document.getElementById("letters");
  var printButton = document.getElementById("print");
  var downloadButton = document.getElementById("download");
  var sheets = [];

  function populateLetters() {
    app.alphabet.forEach(function (entry) {
      var option = document.createElement("option");
      option.value = entry.upper;
      option.textContent = entry.upper + " " + entry.lower;
      letterSelect.appendChild(option);
    });
  }

  function selectedType() {
    var checked = form.querySelector('input[name="type"]:checked');
    return checked ? checked.value : "coloring";
  }

  function updateVisibility() {
    var isColoring = selectedType() === "coloring";
    coloringOptions.hidden = !isColoring;
    letterOptions.hidden = isColoring;
  }

  function renderEmpty() {
    var message = document.createElement("p");
    message.className = "empty";
    message.textContent = "Engin verkefni enn. Veldu tegund og ýttu á „Búa til verkefni“.";
    output.replaceChildren(message);
  }

  function renderSheets() {
    var parser = new DOMParser();
    var nodes = sheets.map(function (sheet) {
      var figure = document.createElement("div");
      figure.className = "sheet";
      var parsed = parser.parseFromString(sheet.svg, "image/svg+xml");
      var svg = parsed.documentElement;
      svg.removeAttribute("width");
      svg.removeAttribute("height");
      figure.appendChild(document.importNode(svg, true));
      return figure;
    });
    output.replaceChildren.apply(output, nodes);
    printButton.disabled = nodes.length === 0;
    downloadButton.disabled = nodes.length === 0;
  }

  function chosenLetters() {
    return Array.prototype.filter
      .call(letterSelect.options, function (option) {
        return option.selected;
      })
      .map(function (option) {
        return option.value;
      });
  }

  function generate() {
    var type = selectedType();
    var count = Math.min(Math.max(parseInt(form.count.value, 10) || 1, 1), 10);
    var baseSeed = form.seed.value.trim() || String(Date.now());
    var letters = chosenLetters();

    sheets = [];
    for (var i = 0; i < count; i++) {
      var seed = baseSeed + "-" + type + "-" + i;
      if (type === "letters") {
        sheets.push(
          app.createLetterSheet({
            seed: seed,
            letter: letters.length ? letters[i % letters.length] : null
          })
        );
      } else {
        sheets.push(
          app.createColoringSheet({
            seed: seed,
            theme: form.theme.value,
            detail: form.detail.value
          })
        );
      }
    }

    renderSheets();

    if (form.autoprint.checked) {
      global.setTimeout(function () {
        global.print();
      }, 150);
    }
  }

  function download() {
    sheets.forEach(function (sheet, index) {
      var blob = new Blob([sheet.svg], { type: "image/svg+xml;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = url;
      link.download = sheet.title.replace(/[^\wÀ-ÿ]+/g, "-") + "-" + (index + 1) + ".svg";
      document.body.appendChild(link);
      link.click();
      link.remove();
      global.setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 1000);
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    generate();
  });

  form.addEventListener("change", function (event) {
    if (event.target.name === "type") {
      updateVisibility();
    }
  });

  printButton.addEventListener("click", function () {
    global.print();
  });

  downloadButton.addEventListener("click", download);

  populateLetters();
  updateVisibility();
  renderEmpty();
  printButton.disabled = true;
  downloadButton.disabled = true;
})(window);
