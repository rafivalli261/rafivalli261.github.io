# rafivalli.com

Personal blog built with [Astro v5](https://astro.build), deployed to [rafivalli.com](https://rafivalli.com) via GitHub Pages.

## Tech Stack

- **Astro v5** — static site generator
- **Tailwind CSS v4** — utility-first CSS (configured in CSS, no config file needed)
- **@tailwindcss/typography** — prose styling for Markdown post content
- **GitHub Actions** — automated deployment on push to `main`

## Project Structure

```
src/
  content.config.ts        ← content collection schema (Astro v5 API)
  content/
    blog/                  ← put your .md blog posts here
  layouts/
    BaseLayout.astro       ← HTML shell, dark mode, global styles
    BlogPostLayout.astro   ← wraps individual post content
  components/
    Header.astro           ← site nav + dark mode toggle
    Footer.astro
    DarkModeToggle.astro   ← sun/moon button, persists to localStorage
    PostCard.astro         ← card shown in post listings
    TagBadge.astro         ← clickable tag pill
    ReadingTime.astro      ← displays estimated read time
  pages/
    index.astro            ← home page (5 most recent posts)
    blog/
      index.astro          ← all posts listing
      [slug].astro         ← individual post page
    tags/
      index.astro          ← all tags with post counts
      [tag].astro          ← posts filtered by a tag
  styles/
    global.css             ← Tailwind imports + dark mode config
  utils/
    readingTime.ts         ← word count → minutes utility
public/
  CNAME                    ← custom domain (rafivalli.com)
  robots.txt
```

## Running Locally

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:4321`.

## Adding a New Post

1. Create a new `.md` file inside `src/content/blog/`:

   ```bash
   touch src/content/blog/my-new-post.md
   ```

   The filename becomes the URL slug. For example:
   - `my-new-post.md` → `/blog/my-new-post`
   - `2026/rust-tips.md` → `/blog/2026/rust-tips`

2. Add the required frontmatter at the top of the file:

   ```markdown
   ---
   title: "My New Post"
   date: 2026-02-21
   description: "A short summary shown in post listings and meta tags."
   tags: ["tag-one", "tag-two"]
   draft: false
   ---

   Your post content goes here in Markdown.
   ```

3. Save the file. The dev server will hot-reload automatically.

## Frontmatter Fields

| Field         | Type              | Required | Description                                                   |
|---------------|-------------------|----------|---------------------------------------------------------------|
| `title`       | string            | Yes      | Post title shown in listings and the page heading             |
| `date`        | date (YYYY-MM-DD) | Yes      | Publication date used for sorting                             |
| `description` | string            | Yes      | Short summary for post cards and `<meta name="description">` |
| `tags`        | string[]          | No       | List of tags; defaults to `[]`                                |
| `draft`       | boolean           | No       | Set to `true` to hide from production builds; defaults to `false` |

## Dark Mode

The site respects the user's system preference on first visit (`prefers-color-scheme`). The user can override it with the sun/moon toggle in the header. The choice is stored in `localStorage` and restored on every page load without a flash.

## Deployment

Push to `main` — GitHub Actions handles the build and deploy automatically.

- Posts with `draft: true` are excluded from the production build.
- The site is deployed to `rafivalli.com` via GitHub Pages (CNAME already configured).

## Tailwind v4 Notes

Unlike Tailwind v3, there is **no `tailwind.config.mjs` file**. All configuration lives in `src/styles/global.css`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@custom-variant dark (&:where(.dark, .dark *));
```

- `@plugin "@tailwindcss/typography"` enables the `prose` classes for post content.
- `@custom-variant dark` enables `dark:` utility classes using the `.dark` class on `<html>`.
