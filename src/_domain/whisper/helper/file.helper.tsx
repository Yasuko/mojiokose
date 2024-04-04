// import Library
import { DragService } from '../../../_lib/drag/drag.service'
import { FileService } from '../../../_lib/drag/file.service'
import { ImageHelper } from '../../../_lib/image/helper/image.helper'
import { MediaInfoService } from '../../../_lib/mediaInfo/mediainfo.service'

export class FileHelper {
    private static instance: FileHelper

    private file: any

    public constructor() {
        return this
    }

    public static call(): FileHelper {
        if (!FileHelper.instance) {
            FileHelper.instance = new FileHelper()
        }
        return FileHelper.instance;
    }

    public getFile(): any {
        return this.file[0].image;
    }

    public getDataFile(): any {
        return this.file[0];
    }

    public getImages(): any {
        return this.file;
    }

    public async dragStart(target = 'dragtarget'): Promise<FileHelper> {
        await DragService.call().setTarget(target);
        return this;
    }

    public async dragEnd(e: any, target = 'file'): Promise<FileHelper> {
        await DragService.call().onDrop(e);
        this.file =
            target === 'file'
                ? DragService.call().getFile()
                : DragService.call().getImage();
        return this;
    }

    public async selectFile(e:any): Promise<FileHelper> {
        await FileService.call().setFile(e, 'select');
        this.file = await FileService.call().getAllImage();
        return this;
    }

    public async toImageElement(image: string): Promise<HTMLImageElement> {
        await ImageHelper.call().setImage(image);
        return ImageHelper.call().getImageForElement();
    }

    public async getMediaInfo(file: any): Promise<any> {
        await MediaInfoService.call().setup(file)
        return MediaInfoService.call().getMediaInfo()
    }
}
