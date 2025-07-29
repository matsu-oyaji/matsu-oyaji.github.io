# 松ケ丘小学校おやじの会 - 公式ウェブサイト

守谷市立松ケ丘小学校「おやじの会」の公式ウェブサイトです。
VitePressを使用して構築されています。

## 概要

「できる時に、できる事を、できる人が」を合言葉に、児童、地域にかかわりながら、和気あいあい、楽しく活動している会です。

## 技術仕様

- **フレームワーク**: VitePress v1.6.3
- **デプロイ**: 静的サイト生成
- **Node.js**: 18.x以上推奨

## 開発環境のセットアップ

### 必要な環境
- Node.js 18.x以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build

# プレビュー
npm run preview
```

## プロジェクト構造

```
├── .vitepress/
│   ├── config.ts          # VitePress設定ファイル
│   └── theme/
│       ├── index.js       # カスタムテーマ
│       └── custom.css     # カスタムスタイル
├── public/                # 静的ファイル（画像、PDF等）
│   ├── img/              # 画像ファイル
│   ├── docs/             # PDFドキュメント
│   └── favicon/          # ファビコン
├── index.md              # トップページ
├── letters.md            # おやじの会通信
├── minutes.md            # 会則
└── inquiry.md            # お問い合わせ
```

## デプロイ

### GitHub Pages

このサイトはGitHub Pagesで自動的にデプロイされます。

- **公開URL**: https://matsu-oyaji.github.io/matsu-oyaji-web-vite/
- **自動デプロイ**: `main`ブランチへのpushで自動実行
- **手動デプロイ**: GitHubのActionsタブから手動実行可能

#### デプロイの流れ
1. `main`ブランチにコードをpush
2. GitHub Actionsが自動的にビルドを実行
3. 生成されたファイルがGitHub Pagesにデプロイ
4. 数分後にサイトが更新される

### ローカルビルド

ビルドコマンドでVitePressが静的サイトを生成します：

```bash
npm run build
```

生成されたファイルは `.vitepress/dist/` に出力されます。

## ライセンス

Copyright (c) 松ケ丘小学校おやじの会
