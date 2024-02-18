# ForexChurch frontend using 11ty/Bootstrap/Alpine.js/Axios (and maybe Flowbite, GSAP, Swiper)

This boilerplate/skeleton uses bits and pieces from the [Minimal 11ty Starter](https://github.com/tomreinert/minimal-11ty-tailwind-starter), please check it out first for the basics.

## Getting started

1. git clone the repository
2. `cd forexchurch-11ty-alpinejs-bootstrap` (or the name of the folder you've cloned into)
3. install dependencies with `npm install`
4. watch for changes and serve locally on http://localhost:8080 with `npm run start`
5. compile the website with `npm run build` and serve it from the `_site` folder.

## UI Library

Take a look at the reusable snippets at http://localhost:8080/ui-library/

## Development notes

* the top navbar (and the footer) uses semantic, auto-generated nested navigation. It is based on the folder structure, the template `/src/_includes/components/navigation.njk` and the front matter in individual files, e.g.

```
---
title: Fibonacci Calculator
date: 2024-02-18
excerpt: "To use the Fibonacci Calculator, first determine whether the trend of the range that you want to derive the Fibonacci levels for is an UPTREND or DOWNTREND. Once you have determined the trend, enter in the High Price and Low Price for the desired range. You can also enter a Custom Price that is used in the determination of the extension Levels - if Custom is left blank, the High and Low values are used instead."
layout: layouts/post.njk
permalink: /tools/calculators/fibonacci-calculator/
eleventyNavigation:
  key: Fibonacci Calculator
  parent: Calculators
  url: /tools/calculators/fibonacci-calculator/
tags: ["tools", "calculators"]
---

<p>Lorem ipsum content...</p>
```

* For generic top/bottom section spacers use the `.py-section` class.
* Place individual SVG icons into the `/src/img/icons` folder and run `npm run svg` in order to generate `/src/img/icons/symbol/svg/sprite.css.svg`, use them as
```
<svg class="text-tertiary" aria-hidden="true" width="24" height="24">
  <use href="/img/icons/symbol/svg/sprite.css.svg#hamburger"></use>
</svg>
```

* All URLs must end with `/`, e.g. `permalink: "/forex-brokers/trickmill/"`
* The single most important way to group items is:

  ```
  ---
  tags: ["tools", "calculators"]
  ---
  ```

* ...this will create `collections.tools` and `collections.calculators` collections which you can iterate through later with e.g. `{% for item in collections.tools %}`.
* `src/sitemap.njk` is responsible for generating the `sitemap.xml`, double-check its conditions in case you want to exclude some pages, collections from it.
* `TODO`: Update the `robots.txt` once deployed to production.
* The main entry point for all CSS work is in `/src/sass/main.scss`. The order of `@import`-s is important.

## Search (optional, TODO)

Since this is 11ty, there are no API calls neither a DB to fetch posts, rather `collections.all`. We are fetching all posts with

```
<div id="search-all-posts">
    {# NOTE: the content comes from collections.all #}
    {% set posts = collections.all %}
    {% include "components/article-list-search-results.njk" %}
</div>
```

...and then show/hide them with the `.d-none` class from JS (all items all hidden by default, prior to the search).