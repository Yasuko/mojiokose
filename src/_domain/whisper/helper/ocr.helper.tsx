import * as OCR from '../../../_lib/ocr/ocr.service'
import { AjaxService } from '../../../_lib/http/ajax.service'

const ocrUrl = 'http://localhost:8000'
const ajax = new AjaxService()

export const ocrTest = async(file: any): Promise<any> => {
    await OCR.setup()
    console.log(file)
    return await OCR.doOcr(file)
}

export const ocrTest2 = async(file: any): Promise<any> => {
    ajax.setURL(ocrUrl + '/ocr')
        .setMethod('POST')
        .setBody({
            file_name: file.name,
            file_type: 'image',
            file_size: file.size,
            file_content: file.image
        })
        .buildRequestParam()

    return await ajax.getResult()
}

export const ocrTest5 = async(file: any): Promise<any> => {
    ajax.setURL(ocrUrl + '/pdf')
        .setMethod('POST')
        .setBody({
            file_name: file.name,
            file_type: 'image',
            file_size: file.size,
            file_content: file.data
        })
        .buildRequestParam()

    return await ajax.getResult()
}

export const ocrTest3 = async(): Promise<any> => {
    ajax.setURL(ocrUrl + '/test')
        .setMethod('GET')
        .buildRequestParam()

    return await ajax.getResult()
}


export const ocrTextConvert = (
    texts: {text: string, position: {x: number, y: number}}[],
): string => {
    let result = ''
    texts.forEach((text) => {
        result += '(' + text.position.x + ',' + text.position.y + '): ' + text.text + '\n'
    })
    return result
}


