
export const function_call = {
    name: 'ocr_document_shaping',
    description: 'OCR文書整形'
}

export const functions = [
    {
        "name": "ocr_document_shaping",
        "description": `これは音声ファイルを文字起こしした内容を読みやすくする為の処理です。
        文字起こしを行った文書には以下の問題があります
        これらを可能な限り解消してみて下さい。
        - 誤字、脱字が多い
        - 意味の通らない文章になっていない表現が存在する
        - 存在しない単語が存在する

        解消後の文書を使用して、以下の2つの文書を作成して下さい
        - 文章の表現や単語を、小学生でも読みやすように整えた「整形文書」を作成して下さい。
        - 「整形文書」を要約し、項目ごとに箇条書きにした「要約」を作成して下さい。
        `,
        "parameters": {
            "type": "object",
            "properties": {
                "ocr_document_adjust": {
                    "type": "string",
                    "description": "整形文書"
                },
                "ocr_document_summary": {
                    "type": "string",
                    "description": "要約"
                },
            },
            "required": [
                "ocr_document_adjust",
            ]
        }
    }
]

