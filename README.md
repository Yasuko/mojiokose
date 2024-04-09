# README 

ブラウザ完結型文字起こし
wave、mp3ファイル、マイクデバイスから直接録音、されたオーディオデータを
WhisperAPIに投げる事で文字起こしを行う

実行にはOpenAIのAPIKeyが必須です。
画面から入力したAPIKeyはLocalstorageに保存されます。

### Sample
[mojiokose](https://mojiokose.pages.dev/)




### Build

* npmパッケージのインストールを先に行って下さい
```javascript
npm install
```

ffmpegのバージョン0.12.6以降をインストールした場合に
エンコードが上手く機能しない場合があります。
その場合は0.12.6以下で試して下さい。


* 開発用ビルド
```javascript
npm run dev
```
