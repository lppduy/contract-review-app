'use client'

import { ReviewResult } from '@/lib/ai-review'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const RISK_CONFIG = {
  high: { label: 'Cao', class: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400' },
  medium: { label: 'Trung bình', class: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400' },
  low: { label: 'Thấp', class: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400' },
}

const OVERALL_RISK_BANNER = {
  high: { bg: 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800', icon: '🔴', text: 'Rủi ro cao — Cần xem xét kỹ trước khi ký' },
  medium: { bg: 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800', icon: '🟡', text: 'Rủi ro trung bình — Có một số điểm cần chú ý' },
  low: { bg: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800', icon: '🟢', text: 'Rủi ro thấp — Hợp đồng tương đối an toàn' },
}

interface ReviewResultProps {
  result: ReviewResult
  onReset: () => void
}

export function ReviewResultView({ result, onReset }: ReviewResultProps) {
  const banner = OVERALL_RISK_BANNER[result.overall_risk]

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Kết quả phân tích</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{result.contract_type}</p>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2"
        >
          Review hợp đồng khác
        </button>
      </div>

      {/* Overall risk banner */}
      <div className={`border rounded-xl px-4 py-3 flex items-center gap-3 ${banner.bg}`}>
        <span className="text-xl">{banner.icon}</span>
        <span className="font-medium text-sm">{banner.text}</span>
      </div>

      {/* Summary */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <span>📋</span> Tóm tắt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{result.summary}</p>
        </CardContent>
      </Card>

      {/* Parties */}
      {result.parties?.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <span>👥</span> Các bên liên quan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {result.parties.map((p, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-muted-foreground min-w-[80px]">{p.role}:</span>
                  <span className="font-medium">{p.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key terms */}
      {result.key_terms?.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <span>📌</span> Điều khoản chính
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {result.key_terms.map((t, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-muted-foreground min-w-[120px]">{t.label}:</span>
                  <span>{t.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Risks */}
      {result.risks?.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <span>⚠️</span> Rủi ro & điều khoản bất thường
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.risks
                .sort((a, b) => {
                  const order = { high: 0, medium: 1, low: 2 }
                  return order[a.level] - order[b.level]
                })
                .map((r, i) => {
                  const cfg = RISK_CONFIG[r.level]
                  return (
                    <div key={i} className="flex gap-3">
                      <Badge className={`${cfg.class} shrink-0 mt-0.5 text-xs`}>
                        {cfg.label}
                      </Badge>
                      <div>
                        <p className="text-sm font-medium">{r.title}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{r.description}</p>
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Missing clauses */}
      {result.missing_clauses?.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <span>❌</span> Điều khoản còn thiếu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {result.missing_clauses.map((c, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2">
                  <span className="shrink-0">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Suggestions */}
      {result.suggestions?.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <span>💡</span> Đề xuất
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {result.suggestions.map((s, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2">
                  <span className="shrink-0">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
