import { NextRequest, NextResponse } from 'next/server'
import { reviewContract } from '@/lib/ai-review'
import { extractTextFromFile } from '@/lib/parse-file'

const MAX_FILE_SIZE = 4 * 1024 * 1024

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || ''

    let text = ''
    let language = 'vi'

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      const file = formData.get('file') as File | null
      const pastedText = formData.get('text') as string | null
      language = (formData.get('language') as string) || 'vi'

      if (file && file.size > 0) {
        if (file.size > MAX_FILE_SIZE) {
          return NextResponse.json({ error: 'File quá lớn. Tối đa 10MB.' }, { status: 400 })
        }
        text = await extractTextFromFile(file)
      } else if (pastedText) {
        text = pastedText
      }
    } else {
      const body = await req.json()
      text = body.text || ''
      language = body.language || 'vi'
    }

    if (!text || text.trim().length < 100) {
      return NextResponse.json(
        { error: 'Nội dung hợp đồng quá ngắn hoặc không đọc được. Vui lòng thử lại.' },
        { status: 400 }
      )
    }

    const result = await reviewContract(text, language)
    return NextResponse.json(result)
  } catch (err) {
    console.error('[review] error:', err)
    const message = err instanceof Error ? err.message : 'Lỗi không xác định'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
