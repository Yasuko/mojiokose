import { WhisperService } from '../../_lib/gpt/whisper.service'

/**
 * WhisperModel クラス
 * このクラスは WhisperService へのインターフェースを提供するシングルトンです。
 * APIキーを設定し、音声ファイルで Whisper サービスを呼び出すことができます。
 */
export class WhisperModel {
    private static instance: WhisperModel

    private Whisper: WhisperService | undefined = undefined;

    /**
     * シングルトンインスタンスを取得するメソッド
     * @param key Whisper API キー
     * @returns WhisperModel のインスタンス
     */
    public static call(key: string): WhisperModel
    {
        if (!WhisperModel.instance) {
            WhisperModel.instance = new WhisperModel(key);
        }
        return WhisperModel.instance;
    }

    public constructor(key: string)
    {
        this.Whisper = WhisperService.call().setAPIKey(key)
    }

    /**
     * 音声ファイルを使用して Whisper サービスを呼び出すメソッド
     * @param audio 音声ファイルのパスまたはFileオブジェクト
     * @returns Whisper の結果または false
     */
    public async callWhisper(audio: string | File): Promise<any>
    {
        await this.Whisper?.setAudioFile(audio)

        if (await this.Whisper?.do() === true) {
            return this.Whisper?.getResult()
        }
        return false
    }
}