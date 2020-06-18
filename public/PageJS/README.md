# PageJS
A simple JavaScript program that pages HTML content and produces high-quality output that can be printed to PDFs.
This is designed to be a suitable replacement to LaTeX typesetting, without the overhead and dependencies.

## Features
- **Zero Dependencies:** PageJS is a single `.js` (and a `.css`) file, with absolutely zero dependencies. This makes it incredibly small.
- **Fast:** Ultimately, it depends on your machine, but my benchmarks show that I can render large documents in well under 100 milliseconds.
- **Simple:** Just include a single script and set up a single `div` element (okay, maybe 4 or 5 if you're taking advantage of *all* headers and footers) and you're good to go. HTML and CSS are (in my experience) much easier than LaTeX typesetting.
- **Secure:** All processing is done in the browser. There's no server-side rendering, and no arbitrary resource loading. PageJS uses only the bare essentials, which are the simple stylesheet that ships with it, and the code contained within the project's main file.
- **Beautiful:** When used with EB Garamond (11.5pt, softer width), PageJS can produce pure HTML output that renders just as good as LaTeX.
- **Print-Friendly:** PageJS produces documents that are intended to be printed. While you can publish paged documents as HTML to the web, the main distribution target is supposed to be PDF or print.
- **Customizable:** Easily set the page size and content margins right in the script declaration. PageJS also plays well with your own custom stylesheets, fonts, and code.
- **Non-Breaking Releases:** Since PageJS is so small and so simple that most updates do not make any breaking changes. You can therefore update with confidence to the latest versions without having to worry about breaking your documents. Additionally, PageJS is considered stable, so if there's no major problems, there's no hurry to update; if it ain't broke, don't fix it.

## What You Need
- A modern browser (preferrably Firefox, as this supports MathML for natively rendering equations)
- A text editor (VSCode is my choice, but any editor will do. Syntax highlighting is especially beneficial)

## What You May Want
- Git (for cloning and updating PageJS)

## Getting Started
Download PageJS:
- With git: `git clone https://github.com/jordanbancino/PageJS`
- ZIP archive: [PageJS-master.zip](https://github.com/jordanbancino/PageJS/archive/master.zip)
- Source snapshots: [Releases](https://github.com/jordanbancino/PageJS/releases)

Take a look at `template.html`. It is highly recommended to just copy that and add your content to it, as its already all set up. Otherwise, see this reference.

## Documentation

Add this to the `head` node:

```html
<script src="PageJS/page.js"></script>
```

PageJS will automatically include its stylesheet, `page.css`, and sets up the page dimensions. These will format the DOM that PageJS builds to make it look just like a paged document. To specify custom page dimensions or margins (the default is 8.5inx11in with 1.5cm margins), manually call `pageSetup()` in the script's onload function:

```html
<!-- pageSetup() takes 3 optional parameters: width, height, margin. -->
<script src="PageJS/page.js" onload="pageSetup('11in', '8.5in', '1in');"></script>
```

The supported units are CSS `cm`, `in`, or `mm`. Any other units, or no units at all, will result in the default settings being loaded. Note that when printing non-standard page sizes, you will need to adjust your page sizes to match what you specify, otherwise things will be messed up.

All content should be placed in a `div` or `span` with the ID `continuous-content`:

```html
<div id="continuous-content">
  <!-- You document content here -->
</div>
```

Your content doesn't need any knowledge of PageJS, just write HTML like you normally would. PageJS tries to be smart and split things sensibly. But if something goes wrong, you can always manually insert a page break by placing this code **in the top level of the `continuous-content` element**:

```html
<span class="page-break"></span>
```

Headers and footers should be outside of the `continuous-content` element with these IDs:

```html
<div id="header">
  <table class="header-table">
    <tr>
      <td>Left header content</td>
      <td style="text-align: center;">Center header content</td>
      <td style="text-align: right;">Right header content</td>
    </tr>
  </table>
  <hr />
</div>
<div id="footer" style="text-align: center;">
  <span class="page-no">Error getting page number. Make sure JavaScript is enabled.</span>
</div>
<div id="first-page-footer" style="text-align: center;">
  <span class="page-no">Error getting page number. Make sure JavaScript is enabled.</span>
</div>
<div id="first-page-header">
   First Page header!
</div>
```

For optimum results, do not place anything outside of the headers, footers, and the `continuous-content` element.
