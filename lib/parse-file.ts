export async function parsePDF(buffer: Buffer): Promise<string> {
  // Import directly from lib to avoid Vercel bundler loading the test file which triggers DOMMatrix error
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pdfParse = require('pdf-parse/lib/pdf-parse') as (buf: Buffer) => Promise<{ text: string }>
  const data = await pdfParse(buffer)
  return data.text
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
