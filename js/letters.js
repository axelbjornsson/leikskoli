/* Býr til stafaverkefni (æfingablöð) fyrir íslenska stafrófið sem SVG.
   Hvert blað inniheldur skriftaræfingu, leitarverkefni og orð með stafnum. */
(function (global) {
  "use strict";

  var ALPHABET = [
    { upper: "A", lower: "a", words: ["api", "andi", "appelsína"] },
    { upper: "Á", lower: "á", words: ["áll", "ás", "ávöxtur"] },
    { upper: "B", lower: "b", words: ["bolti", "bíll", "bók"] },
    { upper: "D", lower: "d", words: ["dúkka", "dós", "dýr"] },
    { upper: "Ð", lower: "ð", words: ["maður", "veður", "hraði"], inside: true },
    { upper: "E", lower: "e", words: ["epli", "egg", "eldur"] },
    { upper: "É", lower: "é", words: ["él", "éta", "ég"] },
    { upper: "F", lower: "f", words: ["fiskur", "fugl", "fótur"] },
    { upper: "G", lower: "g", words: ["gata", "gluggi", "gulur"] },
    { upper: "H", lower: "h", words: ["hús", "hestur", "hjól"] },
    { upper: "I", lower: "i", words: ["inni", "ilmur", "iða"] },
    { upper: "Í", lower: "í", words: ["ís", "íkorni", "íþrótt"] },
    { upper: "J", lower: "j", words: ["jól", "jakki", "jarðarber"] },
    { upper: "K", lower: "k", words: ["kaka", "köttur", "kanína"] },
    { upper: "L", lower: "l", words: ["lampi", "lauf", "lest"] },
    { upper: "M", lower: "m", words: ["mús", "matur", "mamma"] },
    { upper: "N", lower: "n", words: ["nál", "nef", "nótt"] },
    { upper: "O", lower: "o", words: ["ostur", "orka", "oddur"] },
    { upper: "Ó", lower: "ó", words: ["ós", "ósk", "óður"] },
    { upper: "P", lower: "p", words: ["penni", "peysa", "pabbi"] },
    { upper: "R", lower: "r", words: ["rós", "refur", "regn"] },
    { upper: "S", lower: "s", words: ["sól", "sími", "skór"] },
    { upper: "T", lower: "t", words: ["tré", "taska", "tunga"] },
    { upper: "U", lower: "u", words: ["ugla", "ull", "undir"] },
    { upper: "Ú", lower: "ú", words: ["úlpa", "úlfur", "úr"] },
    { upper: "V", lower: "v", words: ["vatn", "vasi", "vetur"] },
    { upper: "X", lower: "x", words: ["lax", "box", "sex"], inside: true },
    { upper: "Y", lower: "y", words: ["sykur", "lyf", "systir"], inside: true },
    { upper: "Ý", lower: "ý", words: ["ýsa", "ýta", "ýmis"] },
    { upper: "Þ", lower: "þ", words: ["þak", "þrír", "þvottur"] },
    { upper: "Æ", lower: "æ", words: ["æfing", "æði", "ær"] },
    { upper: "Ö", lower: "ö", words: ["önd", "öxl", "örn"] }
  ];

  var FONT = "Verdana, Geneva, sans-serif";

  function escapeText(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function findLetter(upper) {
    for (var i = 0; i < ALPHABET.length; i++) {
      if (ALPHABET[i].upper === upper) {
        return ALPHABET[i];
      }
    }
    return null;
  }

  function traceRow(letter, y) {
    var parts = [];
    parts.push('<path d="M 18 ' + y + ' L 192 ' + y + '" stroke="#000000" stroke-width="0.4" fill="none" />');
    parts.push(
      '<path d="M 18 ' +
        (y - 9) +
        " L 192 " +
        (y - 9) +
        '" stroke="#9aa3ad" stroke-width="0.3" stroke-dasharray="2 2" fill="none" />'
    );
    parts.push(
      '<path d="M 18 ' +
        (y - 18) +
        " L 192 " +
        (y - 18) +
        '" stroke="#000000" stroke-width="0.4" fill="none" />'
    );
    for (var i = 0; i < 7; i++) {
      var x = 24 + i * 24;
      parts.push(
        '<text x="' +
          x +
          '" y="' +
          y +
          '" font-family="' +
          FONT +
          '" font-size="18" fill="' +
          (i < 2 ? "#b7bec7" : "none") +
          '" stroke="#b7bec7" stroke-width="' +
          (i < 2 ? "0" : "0.4") +
          '" stroke-dasharray="' +
          (i < 2 ? "none" : "1.5 1.5") +
          '">' +
          escapeText(letter) +
          "</text>"
      );
    }
    return parts.join("");
  }

  function searchGrid(rnd, target, y) {
    var columns = 8;
    var rows = 3;
    var parts = [];
    var used = [];
    var total = columns * rows;
    var targetCount = rnd.int(5, 8);
    var i;
    for (i = 0; i < total; i++) {
      used.push(rnd.pick(ALPHABET).lower);
    }
    var placed = 0;
    var guard = 0;
    while (placed < targetCount && guard < 200) {
      var index = rnd.int(0, total - 1);
      guard++;
      if (used[index] !== target) {
        used[index] = target;
        placed++;
      }
    }
    for (i = 0; i < total; i++) {
      var column = i % columns;
      var row = Math.floor(i / columns);
      parts.push(
        '<text x="' +
          (26 + column * 22) +
          '" y="' +
          (y + row * 16) +
          '" text-anchor="middle" font-family="' +
          FONT +
          '" font-size="12" fill="#000000">' +
          escapeText(used[i]) +
          "</text>"
      );
    }
    return parts.join("");
  }

  function createLetterSheet(options) {
    var rnd = global.Leikskoli.createRandom(options.seed);
    var entry = (options.letter && findLetter(options.letter)) || rnd.pick(ALPHABET);
    var pair = entry.upper + " " + entry.lower;
    var words = entry.words.slice(0, 3);

    var svg = [];
    svg.push(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210mm" height="297mm" role="img" aria-label="Stafaverkefni: ' +
        escapeText(pair) +
        '">'
    );
    svg.push('<rect x="0" y="0" width="210" height="297" fill="#ffffff" />');
    svg.push(
      '<text x="105" y="22" text-anchor="middle" font-family="' +
        FONT +
        '" font-size="12" fill="#000000">Stafurinn ' +
        escapeText(pair) +
        "</text>"
    );

    svg.push(
      '<text x="105" y="78" text-anchor="middle" font-family="' +
        FONT +
        '" font-size="48" fill="none" stroke="#000000" stroke-width="0.8" stroke-dasharray="3 3">' +
        escapeText(pair) +
        "</text>"
    );
    svg.push(
      '<text x="18" y="92" font-family="' +
        FONT +
        '" font-size="9" fill="#000000">1. Dragðu blýant eftir punktalínunum.</text>'
    );

    svg.push(traceRow(entry.upper, 116));
    svg.push(traceRow(entry.lower, 146));
    svg.push(traceRow(pair, 176));

    svg.push(
      '<text x="18" y="196" font-family="' +
        FONT +
        '" font-size="9" fill="#000000">2. Settu hring utan um alla stafina ' +
        escapeText(entry.lower) +
        ".</text>"
    );
    svg.push(searchGrid(rnd, entry.lower, 210));

    svg.push(
      '<text x="18" y="262" font-family="' +
        FONT +
        '" font-size="9" fill="#000000">3. Orð ' +
        (entry.inside ? "með stafinn " : "sem byrja á ") +
        escapeText(entry.lower) +
        " – lestu og teiknaðu mynd af einu þeirra.</text>"
    );
    for (var i = 0; i < words.length; i++) {
      svg.push(
        '<text x="' +
          (22 + i * 62) +
          '" y="276" font-family="' +
          FONT +
          '" font-size="10" fill="#000000">' +
          escapeText(words[i]) +
          "</text>"
      );
    }

    svg.push(
      '<text x="18" y="290" font-family="' +
        FONT +
        '" font-size="8" fill="#000000">Nafn: ______________________</text>'
    );
    svg.push("</svg>");

    return {
      title: "Stafaverkefni – " + pair,
      svg: svg.join("")
    };
  }

  global.Leikskoli = global.Leikskoli || {};
  global.Leikskoli.alphabet = ALPHABET;
  global.Leikskoli.createLetterSheet = createLetterSheet;
})(window);
