# RBX Rush — parody generator

A responsive, multi-file prank website with animated counters, Robux amount selection, a simulated 64-second progress sequence, terminal-style status messages, and a final prank reveal.

**Important:** This is an unofficial parody. It does not generate, sell, or transfer Robux and is not affiliated with Roblox Corporation. It never asks for a Roblox password or account details. All displayed statistics and processing messages are local visual simulations.

## Project structure

```text
rbxrush-site/
├── index.html
├── README.md
├── .nojekyll
└── assets/
    ├── css/
    │   └── styles.css
    ├── img/
    │   └── brand-mark.svg
    └── js/
        └── app.js
```

## Run locally

Open `index.html` in a browser. No build tools, package installation, API keys, or backend are required.

## Publish with GitHub Pages

1. Create a public GitHub repository named `rbxrush-prank` (or another name you prefer).
2. Upload the **contents** of this folder to the repository root. `index.html` should be at the top level, alongside `README.md`.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. Wait for the Pages deployment to finish. GitHub will show the published URL in the Pages section.

The project uses relative asset paths, so it works from a GitHub Pages project URL as well as locally.

## Customise

- Change the simulated 64-second wait in `assets/js/app.js` by editing `GENERATION_DURATION_MS`.
- Change the selectable amounts in `index.html` (`data-amount` values).
- Adjust colours, layout, and responsive styling in `assets/css/styles.css`.
