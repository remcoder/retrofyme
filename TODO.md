# TODO

- [ ] Check the palettes against their sources
  - ZX Spectrum: `yellow0` is `[0,205,205]`, the same as `cyan0`; probably should be `[205,205,0]` (`js/Retrofy.Colors.ZXSpectrum.js`)
  - C64: `LightGreen` is `[160,160,160]`, a grey (`js/Retrofy.Colors.C64.js`, and `.LightGreen` / `$lightgreen` in `app/styles/_c64.scss`)
  - C64: compare the other 15 colors with a reference palette
  - NES: the split into `NES1`–`NES4` is by brightness row, each with black added; check it against the source in `js/Retrofy.Colors.NES.js`
