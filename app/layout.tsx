import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Contract Review — AI phân tích hợp đồng',
  description: 'Upload hợp đồng để AI phân tích rủi ro, điều khoản quan trọng và đề xuất cải thiện.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${geist.className} antialiased`}>{children}</body>
    </html>
  )
}
