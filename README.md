# Personal Website — terminal-style portfolio

A static, dependency-free terminal-flavored personal portfolio website.

## Files

| File | What it is |
|---|---|
| `index.html` | Page structure (boot terminal, navbar, six snapped sections) |
| `style.css` | Design tokens + layout + animations |
| `app.js` | `CONFIG` object at the top (all editable content) + behavior |
| `fonts/iosevka-light.woff2` | Iosevka (SIL OFL licensed) terminal font |

## Run it

Just open `index.html` in a browser — it's fully static.
For nicest results serve it:

```
python -m http.server 5173
```

then visit http://localhost:5173

## Edit it

Open `app.js` and edit the `CONFIG` block at the top:

- `name`, `role` — hero and footer
- `boot` — terminal username/host, commands, outputs
- `roles` — rotating typed titles on the landing page
- `about.paragraphs`, `workIntro` — section prose
- `experiences` — work/timeline entries
- `skillsCol1/2` — skills with short tags
- `projects` — project cards with accent colors and glyphs
- `contact` — email, GitHub, LinkedIn links
- `footerLeft/right`

The Google Fonts link (Fira Sans / Comfortaa / Source Code Pro) needs internet the first time; everything still renders offline with mono fallbacks.

## Notes

- Design inspired by ddaniel.dev; everything here was written from scratch.
