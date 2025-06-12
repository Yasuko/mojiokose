#!/usr/bin/env zx

import 'zx/globals'
import { config } from 'dotenv'
import { WhisperModel } from './src/_domain/_model/whisper.model.ts'
import { EncodeHelper } from './src/_domain/whisper/helper/encode.helper.ts'
import fs from 'fs'
import path from 'path'

// .envファイルを読み込み
config()

/**
 * 使用方法を表示
 */
function showUsage() {
    console.log('使用方法: node speech_to_text.mjs <audio_file> [--api-key <key>]')
    console.log('例: node speech_to_text.mjs audio.wav --api-key your_api_key')
    console.log('またはAPIキーを.envファイルのOPENAI_API_KEYに設定してください')
}

/**
 * メイン処理
 */
async function main() {
    try {
        // 引数の解析
        const args = process.argv.slice(2)
        
        if (args.length === 0) {
            showUsage()
            process.exit(1)
        }

        const audioFilePath = args[0]
        
        // APIキーの取得（引数 > 環境変数の順で優先）
        let apiKey = null
        const apiKeyIndex = args.indexOf('--api-key')
        if (apiKeyIndex !== -1 && apiKeyIndex + 1 < args.length) {
            apiKey = args[apiKeyIndex + 1]
        } else {
            apiKey = process.env.OPENAI_API_KEY
        }

        if (!apiKey) {
            console.error('エラー: OpenAI APIキーが指定されていません')
            console.error('--api-keyオプションまたは.envファイルのOPENAI_API_KEYを設定してください')
            process.exit(1)
        }

        // オーディオファイルの存在確認
        if (!fs.existsSync(audioFilePath)) {
            console.error(`エラー: オーディオファイルが見つかりません: ${audioFilePath}`)
            process.exit(1)
        }

        // ファイルパスを絶対パスに変換
        const absoluteAudioPath = path.resolve(audioFilePath)
        
        // ファイルの読み取り権限確認
        try {
            fs.accessSync(absoluteAudioPath, fs.constants.R_OK)
        } catch (accessError) {
            console.error(`エラー: ファイルの読み取り権限がありません: ${absoluteAudioPath}`)
            process.exit(1)
        }

        console.log(`音声ファイルを処理中: ${absoluteAudioPath}`)

        // ファイルサイズチェック (25MB制限)
        const stats = fs.statSync(absoluteAudioPath)
        const fileSizeInMB = stats.size / (1024 * 1024)
        if (fileSizeInMB > 25) {
            console.error(`エラー: ファイルサイズが大きすぎます (${fileSizeInMB.toFixed(1)}MB)。Whisper APIは25MB以下のファイルのみサポートしています。`)
            process.exit(1)
        }

        // ファイルをバッファとして読み込み
        const audioBuffer = fs.readFileSync(absoluteAudioPath)
        const fileName = path.basename(absoluteAudioPath)

        /*
        // オーディオファイルの拡張子を取得
        const ext = path.extname(audioFilePath).toLowerCase()
        const baseName = path.basename(audioFilePath, ext)

        // EncodeHelperを使用してファイルを処理
        const encoder = EncodeHelper.call()
        encoder.setup(audioFilePath, baseName)

        // mp3形式に変換（WhisperはMP3をサポート）
        if (ext !== '.mp3') {
            console.log('MP3形式に変換中...')
            await encoder.toMp3()
        }

        // 変換されたファイルのパスを取得
        const result = encoder.getResult()
        const processedFilePath = result.path || audioFilePath
        */

        console.log('Whisperで文字起こし中...')

        // ファイルバッファをFile APIのデータ形式に変換
        const mimeType = fileName.endsWith('.mp3') ? 'audio/mpeg' : 
                        fileName.endsWith('.wav') ? 'audio/wav' :
                        fileName.endsWith('.m4a') ? 'audio/mp4' :
                        fileName.endsWith('.ogg') ? 'audio/ogg' :
                        'audio/mpeg' // デフォルト

        const audioBlob = new Blob([audioBuffer], { type: mimeType })
        const audioFile = new File([audioBlob], fileName, { type: mimeType })

        // WhisperModelを使用して文字起こし（File APIのデータを渡す）
        const whisperModel = WhisperModel.call(apiKey)
        //const transcription = await whisperModel.callWhisper(processedFilePath)
        const transcription = await whisperModel.callWhisper(audioFile)

        if (transcription === false) {
            console.error('エラー: 文字起こしに失敗しました')
            process.exit(1)
        }

        console.log(transcription)

        // 結果をoutput.txtに保存
        const outputText = transcription.text || transcription
        const outputPath = 'output.txt'
        
        fs.writeFileSync(outputPath, outputText, 'utf8')
        
        console.log(`文字起こし完了！結果は ${outputPath} に保存されました`)
        console.log('---結果---')
        console.log(outputText)

    } catch (error) {
        console.error('エラーが発生しました:', error.message)
        if (error.stack) {
            console.error('詳細:', error.stack)
        }
        process.exit(1)
    }
}

// スクリプト実行
main()
