'use client'

import { useEffect, useState } from 'react'

const STEPS = [
  'Đang đọc nội dung hợp đồng...',
  'Phân tích các bên liên quan...',
  'Kiểm tra điều khoản và rủi ro...',
  'Đánh giá điều khoản còn thiếu...',
  'Tổng hợp kết quả...',
]

export function LoadingState() {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-muted border-t-foreground animate-spin" />
        <span className="absolute inset-0 flex items-center justify-center text-2xl">📄</span>
      </div>
      <div className="text-center space-y-2">
        <p className="font-medium">AI đang phân tích hợp đồng</p>
        <p className="text-sm text-muted-foreground">{STEPS[stepIndex]}</p>
      </div>
      <div className="flex gap-1.5">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-500 ${
              i <= stepIndex ? 'bg-foreground' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
