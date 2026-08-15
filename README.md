# leikskoli

Vefsíða sem býr sjálfkrafa til prentanleg verkefni fyrir leikskólabörn.

## Hvað er í boði

- **Litamyndir** – einfaldar svart-hvítar útlínumyndir (dýr, farartæki, náttúra, form) í þremur
  smáatriðastigum svo hægt sé að velja léttari blöð fyrir yngstu börnin.
- **Stafaverkefni** – æfingablað fyrir hvern staf íslenska stafrófsins með
  skriftaræfingu (punktalínur), leitarverkefni þar sem barnið hringar stafinn og orðum
  sem byrja á (eða innihalda) stafinn.
- **Prentun** – blöðin eru sniðin fyrir A4 og prentast eitt á hverja síðu. Hægt er að ýta á
  „Prenta“ eða haka við að prentglugginn opnist sjálfkrafa um leið og verkefnin eru búin til.
- **Vistun** – hvert blað má vista sem SVG-skrá til að prenta síðar eða breyta.
- **Fræ** – með því að slá inn sama „fræ“ fást nákvæmlega sömu blöð aftur.

## Að skoða síðuna

### 1. Á netinu (GitHub Pages)

Síðan birtist sjálfkrafa á GitHub Pages þegar ýtt er á `main`:

**https://axelbjornsson.github.io/leikskoli/**

Til að kveikja á þessu í fyrsta skipti: farðu í **Settings → Pages** í hugbúnaðarsafninu og
veldu **Source: GitHub Actions**. Eftir það sér `.github/workflows/pages.yml` um birtinguna.
Hægt er líka að keyra hana handvirkt undir **Actions → Birta á GitHub Pages → Run workflow**.

### 2. Á eigin tölvu

Þetta er hrein kyrrstæð vefsíða án byggingarskrefa og án ytri pakka. Einfaldast er að
tvísmella á `index.html` og opna hana beint í vafra. Til að líkja betur eftir vefþjóni:

```bash
python3 -m http.server 8000
# opnaðu http://localhost:8000
```

eða, ef Node.js er uppsett:

```bash
npx serve .
```

Síðan virkar án nettengingar og engin gögn eru send neitt.

## Skráaskipan

| Skrá | Hlutverk |
| --- | --- |
| `index.html` | Notendaviðmót (á íslensku) |
| `styles.css` | Útlit skjásins og prentstílar (`@page A4`, ein síða á blað) |
| `js/random.js` | Endurtakanlegur slembitalnagjafi (fræ) |
| `js/coloring.js` | Teiknar litamyndir sem SVG |
| `js/letters.js` | Býr til stafaverkefni fyrir íslenska stafrófið |
| `js/app.js` | Tengir viðmótið, prentun og vistun |
| `.github/workflows/pages.yml` | Birtir síðuna sjálfkrafa á GitHub Pages |

## Prentari

Vafrar leyfa ekki beina tengingu við prentara af öryggisástæðum. Það sem hægt er að gera er:

- opna prentgluggann sjálfkrafa (`window.print()`) – það er útfært hér með valkostinum
  „Opna prentglugga sjálfkrafa“,
- velja sjálfgefinn prentara í stýrikerfinu og sleppa staðfestingu ef vafrinn býður upp á það
  (t.d. `--kiosk-printing` í Chrome),
- eða vista sem SVG/PDF og senda á prentara í gegnum prentþjónustu.

Fullkomlega sjálfvirk prentun (án nokkurs glugga) krefst þess að keyra lítinn þjón á
staðnum, t.d. með CUPS/IPP, sem er utan umfangs þessarar kyrrstæðu síðu.

## Á að nota gervigreind?

Stutta svarið: **ekki nauðsynlegt fyrir grunnvirknina, en gagnlegt sem viðbót.**

Rök gegn því að byggja á gervigreind:

- Verkefnin hér eru reglubundin (stafir, form, einfaldar myndir) og teiknast fullkomlega með
  reiknuðum SVG-línum – það er ókeypis, samstundis, virkar án nettengingar og gefur alltaf
  hreinar útlínur sem prentast vel.
- Myndgerð með gervigreind kostar peninga, krefst API-lykils (sem má aldrei setja í kóða á
  kyrrstæðri síðu) og skilar oft gráskölum eða smáatriðum sem henta illa í litabók.
- Efni fyrir börn þarf yfirlestur; sjálfvirkt myndefni þyrfti alltaf handvirka skoðun.

Hvar gervigreind gæti bætt við síðar (þá með bakenda sem geymir lykilinn):

- fjölbreyttari litamyndir út frá lýsingu barnsins („teiknaðu dreka á hjóli“),
- sjálfvirk orðalistagerð og einfaldar sögur tengdar stafnum,
- aðlögun erfiðleikastigs eftir aldri eða getu.

Þangað til er allt efni búið til án gervigreindar og því hægt að nota síðuna í leikskóla
án persónuverndaráhyggja.
