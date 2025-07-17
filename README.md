<p align="center">
  <img src="/static/silentYak-logo.webp" width="300px" alt="" />
</p>

---

<p align="center">
  a collection of ideas, and other uncommon things
</p>

---

This repository contains the source code and content of [silentYak](https://silentyak.com). Content
created or updated in this repository automatically gets published.

To create a new post, you must:

- Become a collaborator on this repository.
- Clone the repository.
- For each post, create a new folder structure with:
  - `mkdir -p content/posts/{POST-NAME}
- Create a new Markdown file `index.md` [1] in the new post directory.
- Provide the necessary frontmatter in the new Markdown file.
- Provide the content of the new post.
- Validate [2] a draft of the new post.
- Commit and push the change to GitHub.

[1] The new Markdown file should have content that looks like the template below. Anything in braces
is a placeholder and must be replaced. You may have more than 1 author and any number of tags (even
zero). The `[extra]` section and its contents are optional (default values are shown below).

```
+++
title = "{TITLE}"
date = {YYYY}-{MM}-{DD}
[taxonomies]
authors = ["{AUTHOR-1}", "{AUTHOR-2}"]
tags = ["{TAG-1}", "{TAG-2}"]
[extra]
hide_authors = true
hide_date = true
+++

{CONTENT}
```

[2] To validate a draft, you need to install [Zola](https://getzola.org) locally and run its server. On a macOS system, you can follow these steps:

- Run `brew install zola`.
- In the repository root, run `zola serve`.

In case you want to set up a *new* static website just like silentYak, you may do so by following
the [(very brief) instructions here](https://optimix.dev/2023/12/23/static-website/).
