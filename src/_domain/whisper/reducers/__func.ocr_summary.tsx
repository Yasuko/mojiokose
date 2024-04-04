
export const function_call = {
    name: 'ocr_document_summary',
    description: 'OCR文書整形'
}

export const functions = [
    {
        "name": "ocr_document_summary",
        "description": `これは音声ファイルを文字起こしした内容を要約する処理です。
        渡した文書は、事前に以下の処理を行い、読みやすい内容に修正しています。
        - 誤字、脱字を可能な限り修正
        - 意味の通らない文章を可能な限り修正
        - 存在しない単語を可能な限り修正

        文章の内容を項目ごとに整理し、箇条書きにしたリストを作成して下さい。
        `,
        "parameters": {
            "type": "object",
            "properties": {
                "ocr_document_summary": {
                    "type": "string",
                    "description": "要約"
                },
            },
            "required": [
                "ocr_document_summary",
            ]
        }
    }
]

