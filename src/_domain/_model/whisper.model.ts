import { WhisperService } from '../../_lib/gpt/whisper.service'

export class WhisperModel {
    private static instance: WhisperModel

    private Whisper: WhisperService | undefined = undefined;

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

    public async callWhisper(audio: string): Promise<any>
    {
        await this.Whisper?.setAudioFile(audio)

        if (await this.Whisper?.do() === true) {
            return this.Whisper?.getResult()
        }
        return false
    }
}