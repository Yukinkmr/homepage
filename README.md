# Personal Portfolio Website

Astro + TypeScript + Tailwind CSS で構築した静的ポートフォリオサイトです。  
日英のURLベースi18n、ブログ（Content Collections）、経歴・経験・資格のタブ表示、4カテゴリのポートフォリオなどを備えています。

## 技術スタック

- **Framework**: Astro 4.15.7
- **Language**: TypeScript 5.6.3
- **Styling**: Tailwind CSS 3.4.17
- **Blog**: Astro Content Collections + Markdown
- **Deploy**: GitHub Actions → GitHub Pages
- **Fonts**:
  - 日本語: Hiragino Kaku Gothic ProN
  - 英語: Inter (Google Fonts)
- **Form**: Formspree（外部サービス）

## 実装のポイント

### UI/UX
- **ダークテーマ + 蛍光水色アクセント**: 黒基調でshadcn/ui風のアクセント
- **宇宙風グラデーション背景**: 固定背景のradial/linearグラデーション
- **スクロールアニメーション**: Intersection Observer によるフェードイン
- **レスポンシブ**:
  - スマホ: 横スクロール＋スナップのカード
  - PC: 3列グリッド
- **タブUI**: 経歴・経験・資格の切り替え
- **画像**: 1920×1080（16:9）想定のアスペクト比

### 技術
- **URLベースi18n**: `/ja` と `/en` で言語切り替え
- **静的サイト生成**: `getStaticPaths` による事前レンダリング
- **コンポーネント化**: Card / Section / ProfileSection の再利用
- **型安全性**: TypeScript の厳密な型チェック
- **パフォーマンス**: 固定背景、CSSアニメーションの整理
- **アクセシビリティ**: セマンティックHTML、ARIAの利用

## ライセンス

MIT
