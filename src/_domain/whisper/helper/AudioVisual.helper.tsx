import { AudioService } from '../../../_lib/audio/audio.service'
import { AudioBufferService } from '../../../_lib/audio/audio.buffer.service'
import { MediaService } from '../../../_lib/mediaDevice/media.service'


export class AudioVisualHelper
{
    private static instance: AudioVisualHelper

    private callBack1:  Function = () => {}
    private callBack2:  Function = () => {}

    public static call(): AudioVisualHelper
    {
        if (!AudioVisualHelper.instance) {
            AudioVisualHelper.instance = new AudioVisualHelper()
        }
        return AudioVisualHelper.instance
    }

    /**
     * 
     * @param callback1 Function デシベル変換後の処理
     * @param callback2 Function MFCC変換後の処理
     * @returns 
     */
    public setCallback(
        callback1: Function, callback2: Function
    ): AudioVisualHelper {
        this.callBack1 = callback1
        this.callBack2 = callback2
        return this
    }

    public async setup()
    {
        // 使用可能なデバイスリスト作成
        await MediaService.call()
            .callDeviceListService()
            .SearchDeviceList()
    
        // オーディオデバイス一覧取得
        const devices = MediaService.call()
                            .callDeviceListService()
                            .getAudioInputDevices()

        // 生成するストリームの設定（ビデオ：無効、オーディオ：有効）
        MediaService.call()
            .callStreamModeService()
            .offVideo()
            .onAudio()

        // ストリーム設定を使用し、デバイスからストリームデータを取得
        await MediaService.call().getLocalStream(
            MediaService.call().callStreamModeService().getStreamMode()
        )

        // オーディオサービスにローカルストリームを渡す
        AudioService.call().setup(
            MediaService.call().getStream(),    // ローカルストリーム
            'whisper'                         // ストリーム管理用の識別子
        )

        // AudioタグとAudioContextを繋ぐ
        AudioService.call()
                .audioConnect('whisper', true)

    
        AudioService.call().setup(
            MediaService.call().getStream(),    // ローカルストリーム
            'whisper'                          // ストリーム管理用の識別子
        )
        AudioService.call().audioConnect('whisper')
                            
    }

    /**
     * リスニング開始
     * @return Promise<void>
     */
    public async start()
    {
        // AudioService.call().startMeydaAnalyse('test_audio',callback2);
        AudioService.call().startRecorder(
                        'whisper', this.callBack2, 5000, 'single'
                    )
        AudioService.call().showAnalyser('sin', 'whisper')
        // AudioService.call().startDecibelChecker('whisper2', this.callBack1);
    }

    public async stop()
    {
        AudioService.call().stopRecord()
        AudioService.call().delStream('whisper')
        MediaService.call().closeStream()
    }

    public getWav()
    {
        return AudioService.call().getRecord()
    }

    public async getPlayTime(file: any): Promise<number> {
        return new Promise((resolve, reject) => {
            var audio = new Audio(); // audioの作成
            audio.src = file.data; // 音声ファイルの指定
            audio.load(); // audioの読み込み
    
            audio.addEventListener('loadedmetadata', (e) => {
                resolve(audio.duration)
            })
        })
    }
    /**
     * 音再生準備
     * AudioContextベースの再生処理
     * 音データをサーバーから持ってくるので
     * 直ぐに再生を押すと若干タイムラグあり
     * @return Promise<any>
     */
    public async setupSound(): Promise<any>
    {
        const tag = 'forth'
        AudioBufferService.call().setup(tag)
        await AudioBufferService.call()
                .loadAudioFile(tag, 'http://localhost:3000/enter.wav')
        return
    }

    /**
      * 音再生
      */
    public async playSound(): Promise<any>
    {
        const tag = 'forth'
        AudioBufferService.call().play(tag)
        return
    }
}