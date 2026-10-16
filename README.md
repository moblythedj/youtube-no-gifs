<p align="center">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://files.catbox.moe/ek701n.svg">
      <img alt="Youtube-NO_GIF Logo" src="https://files.catbox.moe/md5e9n.svg" width="200">
    </picture>
</p>

# YouTube: No Comment GIFs

YouTube now lets people post GIFs in comments. This repository removes them, using
either a **uBlock Origin** filter list or a **Tampermonkey** userscript. You only need one.

Both options:

- hide the GIF box under comments, so only the comment text is left
- stop the GIF files from downloading
- work on every YouTube page, including when you move between videos without reloading

| File | Use with |
| --- | --- |
| [`ublock-filters.txt`](ublock-filters.txt) | uBlock Origin |
| [`youtube-no-gifs.user.js`](youtube-no-gifs.user.js) | Tampermonkey (or Violentmonkey) |

---

> [!IMPORTANT]
> **These scripts were written with the help of AI**.
> The code is simple and contains nothing malicious, but **if you don't feel comfortable running AI-generated code, that's completely fine. Just don't use them.**

## Option 1: uBlock Origin

If you already use uBlock Origin, this is the simplest choice.

### Method A: subscribe to the list (updates automatically)

1. Click the uBlock Origin icon in your browser toolbar, then the **gear icon** (⚙) to open the dashboard.
2. Open the **Filter lists** tab.
3. Scroll to the bottom and expand **Import…**.
4. Paste this address into the box:

   ```
   https://raw.githubusercontent.com/moblythedj/youtube-no-gifs/main/ublock-filters.txt
   ```

5. Click **Apply changes** at the top.
6. Reload any YouTube tabs you already have open.

The list now appears under **Custom** in the Filter lists tab. uBlock Origin checks it
for updates every few days.

### Method B: paste the filters by hand

1. Open the uBlock Origin dashboard (toolbar icon, then ⚙).
2. Open the **My filters** tab.
3. Paste these lines at the end:

   ```
   www.youtube.com##ytw-comment-image-attachment-view-model
   ||i.ytimg.com/c_exp/*_webp_animated_$image
   ```

4. Click **Apply changes**.
5. Reload any YouTube tabs you already have open.

Filters pasted this way do not update on their own.

---

## Option 2: Tampermonkey

### 1. Install Tampermonkey

- [Chrome / Chromium browsers](https://chromewebstore.google.com/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- [Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/iikmkjmpaadaobahmlepeloendndfphd)
- [Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/)

**Chrome and Edge only:** userscripts don't run until you allow them. Open
`chrome://extensions` (or `edge://extensions`), click **Details** on Tampermonkey, and
turn on **Allow user scripts**. On older browser versions, turn on **Developer mode** at
the top right of the extensions page instead.

### 2. Install the script

**Method A: one-click install (updates automatically)**

1. Open this link:

   ```
   https://raw.githubusercontent.com/moblythedj/youtube-no-gifs/main/youtube-no-gifs.user.js
   ```

2. Tampermonkey opens an install page. Click **Install**.
3. Reload any YouTube tabs you already have open.

**Method B: paste it by hand**

1. Click the Tampermonkey icon, then **Create a new script**.
2. Delete all the template code in the editor.
3. Paste the full contents of [`youtube-no-gifs.user.js`](youtube-no-gifs.user.js).
4. Press **Ctrl+S** (**Cmd+S** on macOS) to save.
5. Reload any YouTube tabs you already have open.

### 3. Check that it's running

Open a YouTube video. The Tampermonkey icon should show a red **1**, and clicking it
should list **YouTube: No Comment GIFs** with its switch turned on.

---

## How it works

YouTube puts each comment GIF in its own element,
`<ytw-comment-image-attachment-view-model>`, and loads the animation as an animated WebP
file from an address like:

```
https://i.ytimg.com/c_exp/<comment-id>/<image-id>_webp_animated_original_aspect_ratio.webp
```

- **uBlock Origin:** the `##` rule hides that element. The `||` rule blocks the animated
  files from `i.ytimg.com/c_exp/`, so they never download.
- **Tampermonkey:** the script adds a CSS rule that hides the element. It also removes
  the image address as soon as the GIF appears, because a hidden image would otherwise
  still download.

## Limitations

- Desktop site (`www.youtube.com`) only. The mobile site, `m.youtube.com`, is not covered.
- The **GIF button** in the comment box is not hidden. You can still post GIFs; you just
  won't see other people's.
- If YouTube renames the element, the hiding will stop working until the filters are
  updated. Please [open an issue](../../issues) if GIFs come back.

## Uninstall

- **uBlock Origin:** remove the list from **Filter lists → Custom**, or delete the two
  lines from **My filters**, then click **Apply changes**.
- **Tampermonkey:** open the Tampermonkey dashboard and click the bin icon next to the script.

## License

[MIT](LICENSE)
