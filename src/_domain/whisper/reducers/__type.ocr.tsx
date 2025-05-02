import { ChatOptionsType } from '../../../_lib/gpt/_helper/chat.helper'

/**
 * チャットの型
 * @param role    : 'user' | 'system' | 'assistant' | 'null'
 * @param message : string
 * 
 */
export type Chat = {
    role    : 'user' | 'system' | 'assistant' | 'null',
    message : string,
}

/**
 * ChatReducerの型
 * @param options   : ChatOptions
 * @param newChat   : string
 * @param chatBlock : [Chat]
 * @param saveBlock : { [key: string]: [Chat] }
 * @param chatStack : string
 * 
 */
export type OCRType = {
    options     : ChatOptionsType
    ocr         : string
    ocr_result  : string
}

const functions = [
    {
        "name": "invoice_information_extraction",
        "description": `これは領収書の画像をOCRにかけたものから情報を抽出するための処理です。
        OCRで抽出されたテキストは以下の形式に従います
        (x座標, y座標): {OCRで抽出されたテキスト}

        また、領収書は以下の配置ルールがあります。
        - 領収先企業名、郵便番号、住所、担当、担当者は近い位置にある
        - 領収先は「御中」や「様」などの左に書かれる
        - 発行日、番号は近い位置にある
        - 郵便番号、住所は近い位置にある
        - 領収金額は中央付近にある
        - 内訳、但し書き、領収金額は近い位置にある
        - 領収元企業名、郵便番号、住所、電話番号、FAXは近い位置にある
        `,
        "parameters": {
            "type": "object",
            "properties": {
                "invoice_date": {
                    "type": "string",
                    "description": "発行日"
                },
                "invoice_number": {
                    "type": "string",
                    "description": "番号"
                },
                "invoice_to": {
                    "type": "string",
                    "description": "領収先 (御中とか様は除外する)"
                },
            },
            "required": ["invoice_date"]
        }
    }
]


/**
 * ChatFormの初期値
 * @param options   : ChatOptions
 * @param newChat   : string
 * @param chatBlock : [Chat]
 * @param saveBlock : { [key: string]: [Chat] }
 * @param chatStack : string
 */
export const initialOCR: OCRType = {
    options     : {
        model       : 'o3-mini',
        messages    : [],
        temperature : 1,
        top_p       : 1,
        n           : 1,
        stream      : false,
        max_completion_tokens : 4000,
        presence_penalty: 0,
        frequency_penalty: 0,
    },
    ocr     : '',
    ocr_result  : '',
};


