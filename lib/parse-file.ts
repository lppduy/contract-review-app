// pdfjs-dist (used internally by pdf-parse) requires DOMMatrix which is a browser API.
// Polyfill it before loading pdf-parse so it works in Node.js serverless environments.
if (typeof (globalThis as Record<string, unknown>).DOMMatrix === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(globalThis as any).DOMMatrix = class DOMMatrix {
    static fromMatrix() { return new DOMMatrix() }
    static fromFloat32Array() { return new DOMMatrix() }
    static fromFloat64Array() { return new DOMMatrix() }
    constructor(_init?: unknown) {}
  }
}

export async function parsePDF(buffer: Buffer): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pdfParse = require('pdf-parse') as (buf: Buffer) => Promise<{ text: string }>
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
