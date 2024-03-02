## Features

### Big

- styling of lists in mdx
- Queryparams/links to open posts
- list of posts
- open post with fullscreen (astro layout? islands?)

### Polish

- remember position of windows/icons when moved
- settings (change bg color, maybe more)
- open legal
- [tooltip svelte?](https://dev.to/danawoodman/svelte-quick-tip-using-actions-to-integrate-with-javascript-libraries-tippy-tooltips-2m94)

### Fun:

- browser + popups
- browser style/animation/doodle: content showing a dummy page and dummy browser
- floppy assisntant
- notifications

### I don't remember

- second item in top nav

# Chores

- pane use tailwind
- navbar border bottom width through tailwind (5>4)
- kontrola gdzie otwiera się okienko, dzięki astro props
- save position of window to astroprop (zeby sie zapamiętał przy odświezeniu strony)
- wiggle okienka jeśli nacisniesz ikonke a okienko juz było otwarte

# Bugs
- nawigacja psuje panele ??
- expand trochę dziwnie animuje bo przesuwa w lewo blogpost
- doubleckick nie działa na mobile (change to click? add handler?) [SO topic](https://stackoverflow.com/questions/28940676/how-to-make-ondblclick-event-works-on-phone) -> temporarily changed to click()
- onhover na machającą rączkę zmienić na mousevent bo jak się z niej zjedzie to animacja się przerywa