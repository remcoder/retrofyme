# TODO

- [ ] Check the palettes against their sources
  - [x] ZX Spectrum: `yellow0` was `[0,205,205]` (cyan), now `[205,205,0]`
  - [x] C64: compared with the CCS64 palette (VICE `ccs64.vpl`); fixed `LightGreen` (was grey) and `Pink`/light red (was `250,160,160`)
  - [ ] C64: CCS64 has black as `10,10,10`; we use `0,0,0`. Keep?
  - [ ] ZX Spectrum: normal brightness is `205` (`0xCD`); other sources use about `215`. Check which is closest
  - [ ] NES: compare the colors with the source in `js/Retrofy.Colors.NES.js`, and check the split into `NES1`–`NES4` (by brightness row, each with black added)
