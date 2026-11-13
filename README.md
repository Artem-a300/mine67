# MC Helper

An interactive guide for Minecraft: Java Edition players on PC. The interface is in Ukrainian.

- **Рецепти крафту**: 49 recipes on a 3×3 grid, with categories, a filter and favourites. Each recipe has a resource calculator and a "Де використовується" list.
- **Виживання**: 33 tips, filterable by topic and experience level. Also includes a first-day checklist, ore heights and PC hotkeys.
- **Моди**: 24 mods with category and loader filters. Includes a "Підбір збірки" helper and installation steps.
- **Шейдери**: 10 shader packs grouped by PC power (weak / mid / high-end), with an Iris installation guide.
- **Пошук**: one search box covers recipes, tips, mods, shaders and hotkeys, in Ukrainian or English. Press `/` or `Ctrl+K` to open it, the arrow keys to move, and `Enter` to open a result.

## Running it

The site is plain HTML/CSS/JS, so there is nothing to build. Start a local server:

```bash
python3 -m http.server 8765
```

Then open http://localhost:8765.

## Structure

- `index.html`: page skeleton
- `css/style.css`: pixel-art styling (green palette, pixel buttons, inventory slots)
- `js/data.js`: data for recipes, tips, mods and shaders
- `js/icons.js`: generator for the 16×16 pixel icons (canvas, no external images)
- `js/app.js`: page rendering, routing, search, calculator and favourites
