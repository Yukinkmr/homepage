# SPEC.md — Personal Website (Astro + GitHub Pages)

## 0. Goal
GitHub Pages (user page) で公開する静的ポートフォリオサイトを Astro で構築する。

- Deploy target: https://<user>.github.io/
- Pages:
  - Home（ポートフォリオ）
  - Blog（日記）
- Language: Japanese / English（URLに言語を含める）
- Design: カード中心、プロフェッショナル、黒×青、ミニマルで洗練（Apple系の余白とタイポ感）
- Main blocks (Home + detail pages):
  - Soccer
  - Research
  - Development
  - Other（留学など）
- Home上部に「学歴 / インターン経験 / 資格」を LinkedIn 風に配置し、下にメインブロック（4カテゴリ）を配置する。
- 各カテゴリは Home では “目立つ実績トップ3” をカードで表示し、クリックでカテゴリ詳細ページに遷移して全実績を閲覧できる。
- Blog は Markdown を追加するだけで更新できる（Notionで下書き→貼り付け即公開運用）。
- Contact: 静的サイトで動作する問い合わせフォームを用意する。

## 1. Tech Stack
- Framework: Astro
- Language: TypeScript
- Styling: Tailwind CSS
- Blog: Astro Content Collections + Markdown
- Portfolio data: YAML or JSON（要件: 1ファイルに統合し、言語別フィールドを持つ）
- Deploy: GitHub Actions -> GitHub Pages
- Optional: RSS, sitemap, OGP, icons (lucide)

## 2. Information Architecture
### 2.1 Routing (i18n)
- URLに言語を含める: `/ja/...` と `/en/...`
- Default language: `/ja`
- Routes:
  - `/ja/` , `/en/` : Home
  - `/ja/blog` , `/en/blog` : Blog list
  - `/ja/blog/[slug]` , `/en/blog/[slug]` : Blog detail
  - `/ja/soccer` , `/en/soccer` : Soccer detail
  - `/ja/research` , `/en/research` : Research detail
  - `/ja/development` , `/en/development` : Development detail
  - `/ja/other` , `/en/other` : Other detail
  - `/ja/contact` , `/en/contact` : Contact

### 2.2 Navigation
- Header: Home / Blog / Soccer / Research / Development / Other / Contact + Language Switch
- Footer: Social links, email, copyright

## 3. Home Page Layout (priority order)
Homeは上から以下の構成。LinkedInっぽい並びを意識する。

1) Hero
- Name, short tagline, location (optional), primary links (GitHub / LinkedIn / X / Email)
- CTA: View Projects / Contact

2) Experience Summary (LinkedIn style, top area)
- Sections (cards or timeline):
  - Education（学歴）
  - Internship / Work Experience（インターン・業務経験）
  - Certifications（資格）
- Each item fields:
  - title_ja/en (学校名/会社名/資格名)
  - org_ja/en
  - period
  - description_ja/en (1-3 bullet)
  - links (optional)

3) Main Blocks (4 categories)
- Soccer / Research / Development / Other
- For each category:
  - Category intro (1-2 lines)
  - Featured top 3 cards
  - “View all” link to detail page

4) Blog preview
- 最新3件（現言語のみ）
- “View all posts” link

5) Contact CTA
- シンプルな誘導（フォームへ）

## 4. Detail Pages (categories)
Each category page shows:
- Header: title + short description
- Filter/sort (minimal):
  - Tag filter (optional)
  - Sort by date desc
- Grid list of all items (cards)
- Each card can open:
  - External link (paper/github) or
  - Internal detail page (optional; v1では不要、カード->外部リンクでもOK)

## 5. Content Model
### 5.1 Portfolio data (single source of truth)
Store in `src/data/portfolio.json` (or `.yaml`) with i18n fields.

- Categories: `soccer`, `research`, `development`, `other`
- Item schema:
  - `id` (string)
  - `category` (enum)
  - `title_ja`, `title_en`
  - `summary_ja`, `summary_en` (1-2 lines)
  - `date` or `period`
  - `tags` (string[])
  - `links` (array of { label, url })
  - `featured` (boolean)
  - `order` (number; featured ordering)
  - `type` (optional; e.g. paper, project, talk, analysis, internship, award)

### 5.2 LinkedIn-style sections
Store in `src/data/profile.json` (or same file, but分ける方が管理しやすい)

- `education[]`
- `experience[]` (internship/work)
- `certifications[]`

Each item:
- `id`
- `title_ja/en`
- `org_ja/en`
- `period`
- `bullets_ja[]`, `bullets_en[]`
- `links[]` (optional)

### 5.3 Blog (Markdown)
- Directory: `src/content/blog/*.md`
- Frontmatter:
  - `title`
  - `date` (YYYY-MM-DD)
  - `lang` ("ja" | "en")
  - `tags` (string[])
  - `description`
- Blog list shows only posts matching current language.
- Notion paste: Markdown renderingが崩れないように typographic styles を用意する。
- Images: `public/` に置く運用を README に明記。

## 6. i18n Implementation
- URL-based language routing: `/ja` `/en`
- UI strings:
  - `src/i18n/ja.ts`
  - `src/i18n/en.ts`
- Helper:
  - `t(key, lang)` + `getLangFromUrl()` + language switcher
- Portfolio/profile data:
  - `*_ja`, `*_en` を参照して表示言語を切り替える。

## 7. Contact Form (static compatible)
Implement with external form provider (recommended Formspree or Getform).

- Fields: name, email, message (required)
- Success / error message
- Honeypot for spam reduction
- Endpoint config:
  - `PUBLIC_CONTACT_ENDPOINT` (env)
- Add instructions to README: how to set endpoint + test

## 8. SEO / Social
- Basic:
  - title/description per page
  - canonical per language
  - `sitemap.xml`
  - `robots.txt`
- OGP:
  - default site image
  - blog post meta tags
- RSS (optional): language-specific feed `/{lang}/rss.xml` or single feed

## 9. Repo Structure (proposal)
- `src/pages/[lang]/index.astro`
- `src/pages/[lang]/blog/index.astro`
- `src/pages/[lang]/blog/[...slug].astro`
- `src/pages/[lang]/soccer/index.astro`
- `src/pages/[lang]/research/index.astro`
- `src/pages/[lang]/development/index.astro`
- `src/pages/[lang]/other/index.astro`
- `src/pages/[lang]/contact/index.astro`
- `src/components/*`
- `src/layouts/BaseLayout.astro`
- `src/styles/global.css`
- `src/i18n/*`
- `src/data/profile.json`
- `src/data/portfolio.json`
- `src/content/blog/*`
- `.github/workflows/deploy.yml`
- `README.md`

## 10. Acceptance Criteria
- GitHub Pagesで表示できる（user page）
- `/ja` `/en` で言語を切り替えられる（nav + URL反映）
- Home上部に Education / Experience / Certifications が表示される（LinkedIn風）
- Homeに4カテゴリの featured top3 がカードで表示され、詳細ページで全件見れる
- Blogは Markdown 追加で増やせ、一覧/詳細が動作する（言語別出し分け）
- Contactフォームが送信できる（外部サービス）
- リンク切れ、表示崩れなし
