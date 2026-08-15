/* Einfaldur endurtakanlegur slembitalnagjafi (mulberry32) svo hægt sé að
   endurskapa nákvæmlega sama verkefnablað út frá sama fræi. */
(function (global) {
  "use strict";

  function hashSeed(text) {
    var h = 2166136261;
    var value = String(text);
    for (var i = 0; i < value.length; i++) {
      h ^= value.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function createRandom(seed) {
    var state = hashSeed(seed);

    function next() {
      state = (state + 0x6d2b79f5) | 0;
      var t = Math.imul(state ^ (state >>> 15), 1 | state);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }

    return {
      next: next,
      int: function (min, max) {
        return Math.floor(next() * (max - min + 1)) + min;
      },
      pick: function (list) {
        return list[Math.floor(next() * list.length)];
      },
      chance: function (probability) {
        return next() < probability;
      }
    };
  }

  global.Leikskoli = global.Leikskoli || {};
  global.Leikskoli.createRandom = createRandom;
})(window);
