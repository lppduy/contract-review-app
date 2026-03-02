import { extractText } from 'unpdf'

export async function parsePDF(buffer: Buffer): Promise<string> {
  const { text } = await extractText(new Uint8Array(buffer))
  return text.join('\n')
}

export async function parseDOCX(buffer: Buffer): Promise<string> {
  const mammoth = await import('mammoth')
  const result = await mammoth.extractRawText({ buffer })
  return result.value
}

export async function extractTextFromFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const ext = file.name.split('.').pop()?.toLowerCase()

  if (ext === 'pdf') {
    return parsePDF(buffer)
  } else if (ext === 'docx' || ext === 'doc') {
    return parseDOCX(buffer)
  }

  throw new Error(`Định dạng file không được hỗ trợ: .${ext}`)
}
