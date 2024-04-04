import { AjaxService } from '../_lib/http/ajax.service'

export class  ApiHelper {
    private static instance: ApiHelper
    private aj: AjaxService | undefined = undefined
    private URL: string = 'http://localhost:8080'

    public static call(): ApiHelper {
        if (!ApiHelper.instance) {
            ApiHelper.instance = new ApiHelper()
        }
        return ApiHelper.instance
    }

    public constructor() {
        if (this.aj !== undefined) return
        this.aj = new AjaxService()
    }

    public async callWhisperApi(audio: File): Promise<any> {
        if (this.aj === undefined) return
        return await this.aj
            .setURL(this.URL)
            .setMethod('POST')
            .setBody({audio: audio, job: 'whisper'})
            .buildRequestParam()
            .getResult()
    }

    public async callChatApi(
        message: string,
        history: [{user: string, system: string}] | undefined
    ): Promise<any> {
        if (this.aj === undefined) return
        return await this.aj
            .setURL(this.URL)
            .setMethod('POST')
            .setBody({message: message, history: history, job: 'chat'})
            .buildRequestParam()
            .getResult()
    }

}