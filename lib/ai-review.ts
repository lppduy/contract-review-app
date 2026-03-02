import Groq from 'groq-sdk'
import { REVIEW_SYSTEM_PROMPT, buildUserPrompt } from './prompts'

export interface ReviewResult {
  summary: string
  contract_type: string
  parties: Array<{ name: string; role: string }>
  key_terms: Array<{ label: string; value: string }>
  risks: Array<{ level: 'high' | 'medium' | 'low'; title: string; description: string }>
  missing_clauses: string[]
  suggestions: string[]
  overall_risk: 'high' | 'medium' | 'low'
}

const client = new Groq({ apiKey: process.env.GROQ_API_KEY })

const MAX_CHARS = 50000

export async function reviewContract(
  text: string,
  language: string = 'vi'
): Promise<ReviewResult> {
  const truncated = text.slice(0, MAX_CHARS)

  const completion = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: REVIEW_SYSTEM_PROMPT },
      { role: 'user', content: buildUserPrompt(truncated, language) },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.2,
  })

  const content = completion.choices[0].message.content
  if (!content) throw new Error('AI không trả về kết quả')

  return JSON.parse(content) as ReviewResult
}
