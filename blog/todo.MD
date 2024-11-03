## Features

### Big
- pane with images
- open image
- Floppy!

### Polish
- mobile:
    - should switcjer move to the right and hide the clock?
    - projects missing from menu?

- table of contents for boring view
- settings (change bg color, maybe more)
- [tooltip svelte?](https://dev.to/danawoodman/svelte-quick-tip-using-actions-to-integrate-with-javascript-libraries-tippy-tooltips-2m94)

### Fun:
- floppy assistant
- notifications

### I don't remember

- second item in top nav

# Chores
- navbar border bottom width through tailwind (5>4)

# Bugs
- obrazki w blogach: dodać globalna klase i style zeby sie dodawaly ladnie w linijce (`display:inline-block`) i przesuwaly do nastepnego wiersza jesli nie ma miejsca. Teraz psuja resize
- po zmianie strony okienko się animuje do rozmiaru jeśli było mniejsze (usuwać/dodawać klasę animacyjną przy expandzie?)
- polepsić wyniki https://pagespeed.web.dev/analysis/https-astroblog-five-vercel-app/s7yu3bac7t?form_factor=desktop
- cosmetic: scrollbar jest ciut przykryty buttonami, scrollowania do końca nie widać
- scrollbar breaks on some browsers (Edge)
- horizontal scrollbar sometimes appears, sometimes just for some elements
- Giscus
    - mobile reaction popup is transparent
- internet browser: when crashed it still opens new windows
