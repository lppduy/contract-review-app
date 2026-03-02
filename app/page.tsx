'use client'

import { useState } from 'react'
import { UploadForm } from '@/components/upload-form'
import { ReviewResultView } from '@/components/review-result'
import { LoadingState } from '@/components/loading-state'
import { ReviewResult } from '@/lib/ai-review'
import { MOCK_RESULT } from '@/lib/mock-result'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ReviewResult | null>(null)
  const [isDemo, setIsDemo] = useState(false)

  const handleReset = () => {
    setResult(null)
    setIsDemo(false)
  }

  const handleDemo = () => {
    setIsDemo(true)
    setResult(MOCK_RESULT)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-foreground text-background text-2xl mb-4">
            ⚖️
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Contract Review</h1>
          <p className="text-muted-foreground mt-2">
            Upload hợp đồng — AI phân tích rủi ro và điều khoản quan trọng trong vài giây
          </p>
          {!result && !loading && (
            <button
              onClick={handleDemo}
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
            >
              <span>👀</span> Xem ví dụ kết quả phân tích
            </button>
          )}
        </div>

        {/* Demo banner */}
        {isDemo && result && (
          <div className="mb-4 flex items-center gap-2 bg-muted px-4 py-2.5 rounded-xl text-sm text-muted-foreground">
            <span>💡</span>
            <span>Đây là kết quả mẫu từ hợp đồng lao động demo — có chứa nhiều điều khoản bất thường để minh hoạ.</span>
          </div>
        )}

        {/* Main content */}
        {loading ? (
          <LoadingState />
        ) : result ? (
          <ReviewResultView result={result} onReset={handleReset} />
        ) : (
          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <UploadForm onResult={setResult} onLoading={setLoading} />
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-10 space-y-1">
          <p className="text-xs text-muted-foreground">
            Kết quả mang tính tham khảo. Hãy tham vấn luật sư cho các quyết định pháp lý quan trọng.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Made by <span className="font-medium text-muted-foreground">Le Pham Phuong Duy</span>
          </p>
        </div>
      </div>
    </div>
  )
}
