/* Býr til einfaldar litamyndir (svartar útlínur, engin fylling) sem SVG.
   Allar myndir eru teiknaðar í A4 hlutföllum, mælt í millimetrum. */
(function (global) {
  "use strict";

  var MOTIFS = {
    animals: ["kottur", "fiskur", "fidrildi", "fugl", "snigill"],
    vehicles: ["bill", "batur", "eldflaug", "lest"],
    nature: ["blom", "tre", "hus", "sol"],
    shapes: ["form"]
  };

  var TITLES = {
    kottur: "Köttur",
    fiskur: "Fiskur",
    fidrildi: "Fiðrildi",
    fugl: "Fugl",
    snigill: "Snigill",
    bill: "Bíll",
    batur: "Bátur",
    eldflaug: "Eldflaug",
    lest: "Lest",
    blom: "Blóm",
    tre: "Tré",
    hus: "Hús",
    sol: "Sól",
    form: "Form og mynstur"
  };

  function motifNames(theme) {
    if (theme && MOTIFS[theme]) {
      return MOTIFS[theme];
    }
    return Object.keys(MOTIFS).reduce(function (all, key) {
      return all.concat(MOTIFS[key]);
    }, []);
  }

  var draw = {
    kottur: function (rnd, detail) {
      var parts = [
        '<circle cx="0" cy="0" r="26" />',
        '<path d="M -22 -16 L -26 -34 L -8 -24" />',
        '<path d="M 22 -16 L 26 -34 L 8 -24" />',
        '<circle cx="-9" cy="-4" r="3.5" />',
        '<circle cx="9" cy="-4" r="3.5" />',
        '<path d="M -4 6 L 0 9 L 4 6 Z" />',
        '<path d="M 0 9 C 0 15 -8 15 -9 10" />',
        '<path d="M 0 9 C 0 15 8 15 9 10" />'
      ];
      if (detail >= 2) {
        parts.push('<path d="M -12 6 L -30 2" /><path d="M -12 10 L -30 12" />');
        parts.push('<path d="M 12 6 L 30 2" /><path d="M 12 10 L 30 12" />');
      }
      if (detail >= 3) {
        parts.push('<path d="M -26 26 C -18 44 18 44 26 26" />');
        parts.push('<path d="M 26 34 C 40 34 42 20 34 18" />');
      }
      return parts.join("");
    },

    fiskur: function (rnd, detail) {
      var parts = [
        '<path d="M -34 0 C -18 -22 18 -22 34 0 C 18 22 -18 22 -34 0 Z" />',
        '<path d="M 34 0 L 50 -14 L 50 14 Z" />',
        '<circle cx="-18" cy="-4" r="3" />'
      ];
      if (detail >= 2) {
        parts.push('<path d="M 0 -14 L 6 -26 L 14 -12" />');
        parts.push('<path d="M -2 14 L 4 24 L 12 12" />');
      }
      if (detail >= 3) {
        for (var i = 0; i < 4; i++) {
          var x = -14 + i * 12;
          parts.push('<path d="M ' + x + ' -12 C ' + (x + 8) + ' 0 ' + (x + 8) + ' 0 ' + x + ' 12" />');
        }
      }
      return parts.join("");
    },

    fidrildi: function (rnd, detail) {
      var parts = [
        '<ellipse cx="0" cy="0" rx="4" ry="24" />',
        '<path d="M -3 -14 C -34 -40 -46 -6 -22 4 C -12 8 -5 4 -3 -2 Z" />',
        '<path d="M 3 -14 C 34 -40 46 -6 22 4 C 12 8 5 4 3 -2 Z" />',
        '<path d="M -3 6 C -26 12 -26 34 -8 26 C -4 24 -3 18 -3 12 Z" />',
        '<path d="M 3 6 C 26 12 26 34 8 26 C 4 24 3 18 3 12 Z" />',
        '<path d="M -2 -24 C -8 -34 -14 -34 -18 -30" />',
        '<path d="M 2 -24 C 8 -34 14 -34 18 -30" />'
      ];
      if (detail >= 2) {
        parts.push('<circle cx="-22" cy="-12" r="5" /><circle cx="22" cy="-12" r="5" />');
      }
      if (detail >= 3) {
        parts.push('<circle cx="-13" cy="18" r="3.5" /><circle cx="13" cy="18" r="3.5" />');
        parts.push('<circle cx="-30" cy="-2" r="3" /><circle cx="30" cy="-2" r="3" />');
      }
      return parts.join("");
    },

    fugl: function (rnd, detail) {
      var parts = [
        '<ellipse cx="0" cy="6" rx="26" ry="20" />',
        '<circle cx="-20" cy="-16" r="13" />',
        '<path d="M -32 -16 L -46 -11 L -32 -7 Z" />',
        '<circle cx="-22" cy="-19" r="2.5" />',
        '<path d="M -10 20 L -10 32" /><path d="M 8 20 L 8 32" />',
        '<path d="M -16 32 L -4 32" /><path d="M 2 32 L 14 32" />'
      ];
      if (detail >= 2) {
        parts.push('<path d="M -8 0 C 4 -10 20 -6 22 6 C 14 14 0 12 -8 0 Z" />');
      }
      if (detail >= 3) {
        parts.push('<path d="M 24 0 L 44 -10" /><path d="M 25 6 L 46 2" /><path d="M 24 12 L 44 16" />');
      }
      return parts.join("");
    },

    snigill: function (rnd, detail) {
      var parts = [
        '<path d="M -40 22 C -46 8 -30 2 -20 8" />',
        '<path d="M -44 22 L 30 22" />',
        '<circle cx="8" cy="4" r="26" />',
        '<path d="M 8 4 m 0 -16 a 16 16 0 1 1 -11 27 a 10 10 0 1 1 14 -16" />',
        '<path d="M -34 4 C -36 -8 -30 -14 -26 -18" />',
        '<path d="M -24 6 C -22 -6 -16 -10 -12 -14" />',
        '<circle cx="-26" cy="-20" r="3" /><circle cx="-11" cy="-16" r="3" />'
      ];
      if (detail >= 3) {
        parts.push('<path d="M -44 30 C -20 26 10 26 34 30" />');
      }
      return parts.join("");
    },

    bill: function (rnd, detail) {
      var parts = [
        '<path d="M -46 12 L -46 -4 L -24 -4 L -14 -20 L 20 -20 L 30 -4 L 46 -4 L 46 12 Z" />',
        '<circle cx="-26" cy="12" r="11" />',
        '<circle cx="26" cy="12" r="11" />',
        '<path d="M -10 -6 L -10 -18 L -2 -18 L -2 -6 Z" />',
        '<path d="M 4 -6 L 4 -18 L 16 -18 L 22 -6 Z" />'
      ];
      if (detail >= 2) {
        parts.push('<circle cx="-26" cy="12" r="4" /><circle cx="26" cy="12" r="4" />');
        parts.push('<path d="M -46 2 L -38 2" /><path d="M 38 2 L 46 2" />');
      }
      if (detail >= 3) {
        parts.push('<path d="M -60 24 L 60 24" />');
      }
      return parts.join("");
    },

    batur: function (rnd, detail) {
      var parts = [
        '<path d="M -40 10 L 40 10 L 28 28 L -28 28 Z" />',
        '<path d="M 0 10 L 0 -34" />',
        '<path d="M 4 -30 L 30 6 L 4 6 Z" />'
      ];
      if (detail >= 2) {
        parts.push('<path d="M -4 -26 L -26 6 L -4 6 Z" />');
      }
      if (detail >= 3) {
        parts.push('<path d="M -56 36 C -48 30 -40 42 -32 36" />');
        parts.push('<path d="M -24 40 C -16 34 -8 46 0 40" />');
        parts.push('<path d="M 8 36 C 16 30 24 42 32 36" />');
      }
      return parts.join("");
    },

    eldflaug: function (rnd, detail) {
      var parts = [
        '<path d="M 0 -46 C 14 -28 16 -4 14 18 L -14 18 C -16 -4 -14 -28 0 -46 Z" />',
        '<circle cx="0" cy="-14" r="7" />',
        '<path d="M -14 2 L -30 22 L -14 18 Z" />',
        '<path d="M 14 2 L 30 22 L 14 18 Z" />'
      ];
      if (detail >= 2) {
        parts.push('<path d="M -10 18 C -6 32 6 32 10 18" />');
      }
      if (detail >= 3) {
        parts.push('<path d="M -36 -30 L -30 -30" /><path d="M -33 -33 L -33 -27" />');
        parts.push('<path d="M 30 -20 L 36 -20" /><path d="M 33 -23 L 33 -17" />');
        parts.push('<circle cx="34" cy="-40" r="4" />');
      }
      return parts.join("");
    },

    lest: function (rnd, detail) {
      var parts = [
        '<path d="M -48 14 L -48 -10 L -8 -10 L -8 14 Z" />',
        '<path d="M -4 14 L -4 -24 L 26 -24 L 26 14 Z" />',
        '<path d="M 14 -24 L 14 -36 L 22 -36 L 22 -24" />',
        '<circle cx="-36" cy="18" r="7" /><circle cx="-16" cy="18" r="7" />',
        '<circle cx="4" cy="18" r="7" /><circle cx="20" cy="18" r="7" />'
      ];
      if (detail >= 2) {
        parts.push('<path d="M 2 -18 L 2 -6 L 12 -6 L 12 -18 Z" />');
        parts.push('<path d="M -42 -4 L -14 -4" />');
      }
      if (detail >= 3) {
        parts.push('<circle cx="20" cy="-46" r="6" /><circle cx="30" cy="-56" r="8" />');
        parts.push('<path d="M -60 26 L 46 26" />');
      }
      return parts.join("");
    },

    blom: function (rnd, detail) {
      var petals = detail >= 3 ? 8 : 6;
      var parts = ['<circle cx="0" cy="-16" r="9" />'];
      for (var i = 0; i < petals; i++) {
        var angle = (i / petals) * Math.PI * 2;
        var cx = Math.cos(angle) * 18;
        var cy = -16 + Math.sin(angle) * 18;
        parts.push('<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="9" />');
      }
      parts.push('<path d="M 0 -4 L 0 40" />');
      parts.push('<path d="M 0 12 C -14 4 -24 12 -22 22 C -10 26 -2 20 0 12 Z" />');
      if (detail >= 2) {
        parts.push('<path d="M 0 22 C 14 14 24 22 22 32 C 10 36 2 30 0 22 Z" />');
      }
      if (detail >= 3) {
        parts.push('<path d="M -34 40 L 34 40" />');
      }
      return parts.join("");
    },

    tre: function (rnd, detail) {
      var parts = [
        '<path d="M -8 40 L -8 4 L 8 4 L 8 40 Z" />',
        '<circle cx="0" cy="-14" r="26" />'
      ];
      if (detail >= 2) {
        parts.push('<circle cx="-20" cy="4" r="14" /><circle cx="20" cy="4" r="14" />');
      }
      if (detail >= 3) {
        parts.push('<circle cx="-10" cy="-18" r="5" /><circle cx="12" cy="-6" r="5" />');
        parts.push('<path d="M -40 40 L 40 40" />');
      }
      return parts.join("");
    },

    hus: function (rnd, detail) {
      var parts = [
        '<path d="M -34 34 L -34 -6 L 34 -6 L 34 34 Z" />',
        '<path d="M -42 -6 L 0 -38 L 42 -6 Z" />',
        '<path d="M -8 34 L -8 8 L 10 8 L 10 34 Z" />'
      ];
      if (detail >= 2) {
        parts.push('<path d="M -26 4 L -26 -2 L -14 -2 L -14 4 Z" />');
        parts.push('<path d="M 18 4 L 18 -2 L 30 -2 L 30 4 Z" />');
        parts.push('<circle cx="6" cy="20" r="1.8" />');
      }
      if (detail >= 3) {
        parts.push('<path d="M 18 -22 L 18 -38 L 26 -38 L 26 -16" />');
        parts.push('<path d="M -50 34 L 50 34" />');
      }
      return parts.join("");
    },

    sol: function (rnd, detail) {
      var rays = detail >= 3 ? 12 : 8;
      var parts = ['<circle cx="0" cy="0" r="22" />'];
      for (var i = 0; i < rays; i++) {
        var angle = (i / rays) * Math.PI * 2;
        var x1 = Math.cos(angle) * 28;
        var y1 = Math.sin(angle) * 28;
        var x2 = Math.cos(angle) * 42;
        var y2 = Math.sin(angle) * 42;
        parts.push(
          '<path d="M ' + x1.toFixed(1) + " " + y1.toFixed(1) + " L " + x2.toFixed(1) + " " + y2.toFixed(1) + '" />'
        );
      }
      if (detail >= 2) {
        parts.push('<circle cx="-8" cy="-4" r="2.5" /><circle cx="8" cy="-4" r="2.5" />');
        parts.push('<path d="M -9 6 C -4 12 4 12 9 6" />');
      }
      return parts.join("");
    },

    form: function (rnd, detail) {
      var shapes = [
        '<circle cx="0" cy="0" r="16" />',
        '<rect x="-15" y="-15" width="30" height="30" />',
        '<path d="M 0 -17 L 17 14 L -17 14 Z" />',
        '<path d="M 0 -17 L 17 0 L 0 17 L -17 0 Z" />',
        '<path d="M 0 -16 L 5 -5 L 17 -5 L 7 3 L 11 15 L 0 8 L -11 15 L -7 3 L -17 -5 L -5 -5 Z" />'
      ];
      var columns = detail >= 3 ? 3 : 2;
      var rows = detail >= 2 ? 3 : 2;
      var parts = [];
      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
          var x = (c - (columns - 1) / 2) * 46;
          var y = (r - (rows - 1) / 2) * 46;
          parts.push('<g transform="translate(' + x + "," + y + ')">' + rnd.pick(shapes) + "</g>");
        }
      }
      return parts.join("");
    }
  };

  function background(rnd, detail) {
    if (detail < 2) {
      return "";
    }
    var parts = [];
    parts.push('<g transform="translate(38,58) scale(0.45)">' + draw.sol(rnd, 1) + "</g>");
    if (detail >= 3) {
      parts.push(
        '<path d="M 140 56 C 134 46 150 40 156 48 C 166 42 178 52 172 60 Z" />'
      );
      parts.push('<path d="M 16 236 C 60 228 150 228 194 236" />');
    }
    return parts.join("");
  }

  function createColoringSheet(options) {
    var rnd = global.Leikskoli.createRandom(options.seed);
    var detail = Number(options.detail) || 2;
    var names = motifNames(options.theme === "random" ? null : options.theme);
    var motif = rnd.pick(names);
    var strokeWidth = detail === 1 ? 2.6 : detail === 2 ? 2 : 1.5;
    var scale = detail === 1 ? 1.5 : 1.3;

    var svg = [];
    svg.push(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210mm" height="297mm" role="img" aria-label="Litamynd: ' +
        TITLES[motif] +
        '">'
    );
    svg.push('<rect x="0" y="0" width="210" height="297" fill="#ffffff" />');
    svg.push(
      '<text x="105" y="26" text-anchor="middle" font-family="Verdana, Geneva, sans-serif" font-size="12" fill="#000000">Litaðu myndina: ' +
        TITLES[motif] +
        "</text>"
    );
    svg.push(
      '<g fill="none" stroke="#000000" stroke-width="' +
        strokeWidth +
        '" stroke-linecap="round" stroke-linejoin="round">'
    );
    svg.push(background(rnd, detail));
    svg.push('<g transform="translate(105,150) scale(' + scale + ')">' + draw[motif](rnd, detail) + "</g>");
    svg.push("</g>");
    svg.push(
      '<text x="18" y="284" font-family="Verdana, Geneva, sans-serif" font-size="8" fill="#000000">Nafn: ______________________</text>'
    );
    svg.push(
      '<text x="192" y="284" text-anchor="end" font-family="Verdana, Geneva, sans-serif" font-size="8" fill="#000000">Dags: ____________</text>'
    );
    svg.push("</svg>");

    return {
      title: "Litamynd – " + TITLES[motif],
      svg: svg.join("")
    };
  }

  global.Leikskoli = global.Leikskoli || {};
  global.Leikskoli.createColoringSheet = createColoringSheet;
})(window);
