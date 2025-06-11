import { EncoderService } from '../../../_lib/encoder/encoder.service'
import { RecordType } from '../reducers/WhisperOption'
import { MediaTypes } from '../reducers/MediaDataMolded'

export class EncodeHelper {
    private static instance: EncodeHelper

    public static call() {
        if (!EncodeHelper.instance) {
            EncodeHelper.instance = new EncodeHelper()
        }
        return EncodeHelper.instance
    }

    public setup(file: string, name: string): EncodeHelper {
        console.log(file)
        EncoderService.call().setup(file, name)
        return this
    }
    
    /**
     * 結果を取得する
     * @returns {any} - returns the result of the encoder
     */
    public getResult(): any {
        //return EncoderService.call().getResult()
        return EncoderService.call().getBase64Result()
    }

    public download(
        file: string, extension: string, name: string
    ): void {
        EncoderService.call().saveAudio(file, extension, name)
        return
    }

    /**
     * mp3に変換する
     * @returns {Promise<EncodeHelper>} - returns the result of the encoder
     */
    public async toMp3(): Promise<EncodeHelper> {
        await EncoderService.call().wavToMp3()
        return this
    }

    public async separateAudio(extension: string): Promise<any>
    {
        await EncoderService.call().separateMp3(extension)
        return this
    }

    /**
     * wavに変換する
     * @param {string} file - base64 string
     * @returns {Promise<EncodeHelper>} - returns the result of the encoder
     */
    public async toBase64(file: File): Promise<string> {
        const str = await EncoderService.call().fileToBase64(file)
        return str
    }

    /**
     * 音声ファイルを分割する
     * @param {time} number
     * @returns Promise<RecordType[]>
     */
    public async split(
        time: number,
        type: 'base64' | 'file' = 'base64',
        splitTime: number = 600
    ): Promise<MediaTypes[]> {
        const files: MediaTypes[] = [];
        let stime: number = 0;
        let etime: number = 0;

        const count = Math.floor(time / splitTime) + 1;
        for (let i = 0 ; i <  count; i++) {
            stime = i * splitTime
            etime = (i + 1) * splitTime

            if (time < etime)
                etime = time
            
            await EncoderService.call().splitMp3(stime, etime)
            const f = (type === 'base64') 
                        ? EncoderService.call().getBase64Result()
                        : EncoderService.call().getResult()
            files.push({
                mediaData   : f.data,
                name        : `${f.name}_${stime}_${etime}.mp3`,
                playTime    : etime - stime,
                extension   : 'mp3',
                convText    : '',
                summaryText : '',
                adjustText1 : '',
                adjustText2 : '',
                transcription: false,
            })
        }
        
        return files
    }

}