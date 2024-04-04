import { RecorderService } from '../../../_lib/video/recorder.service';
import { MediaService } from '../../../_lib/mediaDevice/media.service'
import { EncoderService } from '../../../_lib/encoder/encoder.service';

export class VideoHelper
{
    private static instance: VideoHelper;
    private task: string = 'VideoAction/setMove';

    public static call(): VideoHelper
    {
        if (!VideoHelper.instance) {
            VideoHelper.instance = new VideoHelper();
        }
        return VideoHelper.instance;
    }

    /**
     * ビデオ録画の初期設定
     */
    public async setup()
    {
        // 使用可能なデバイスリスト作成
        await MediaService.call()
            .callDeviceListService()
            .SearchDeviceList();

        // 生成するストリームの設定（ビデオ：有効、オーディオ：有効）
        MediaService.call()
            .callStreamModeService()
            .onVideo()
            .onAudio();

        // ストリーム設定を使用し、デバイスからストリームデータを取得
        await MediaService.call().getLocalStream(
            MediaService.call().callStreamModeService().getStreamMode()
        );

        MediaService.call().setVideoTarget('whisper-cam').playVideo();

        RecorderService.call().checkMimeType()
        // console.log(RecorderService.call().getSupportMimeType())

        RecorderService.call()
            .setStream(
                MediaService.call().getStream()
            );
    }

    /**
     * 録画終了時のコールバックを設定
     * @param callback 
     * @returns 
     */
    public setCallback(callback: Function): VideoHelper {
        RecorderService.call().setCallback(callback)
        return this
    }

    /**
     * コールバックアクションの呼び出し名を設定
     * @param task 
     * @returns 
     */
    public setTask(task: string): VideoHelper {
        this.task = task
        return this
    }

    public getTask(): string {
        return this.task
    }

    /**
     * 録画開始
     * @return Promise<void>
     */
    public async start(): Promise<void>
    {
        RecorderService.call().start()
        return
    }

    /**
     * 録画停止
     * @returns {Promise<void>}
     */
    public async stop(): Promise<void>
    {
        RecorderService.call().stop()
        MediaService.call().closeStream()
        return
    }

    public pause(): void
    {
        RecorderService.call().pause()
        return
    }

    public async getMoves(): Promise<string[]>
    {
        return RecorderService.call().getRecorderDataToBase64()
    }

    /**
     * BlobをBase64に変換
     * @param {blob} Blob
     * @returns {Promise<string>}
     */
    public async convBlobToBase64(blob: Blob): Promise<string>
    {
        return await RecorderService.call().BlobToBase64(blob)
    }

}