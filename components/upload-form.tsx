'use client'

import { useState, useRef, DragEvent, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReviewResult } from '@/lib/ai-review'

interface UploadFormProps {
  onResult: (result: ReviewResult) => void
  onLoading: (loading: boolean) => void
  onError: (error: string) => void
}

export function UploadForm({ onResult, onLoading, onError }: UploadFormProps) {
  const [dragging, setDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [pastedText, setPastedText] = useState('')
  const [language, setLanguage] = useState<'vi' | 'en'>('vi')
  const [fileError, setFileError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => setDragging(false)

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) validateAndSetFile(file)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) validateAndSetFile(file)
  }

  const validateAndSetFile = (file: File) => {
    setFileError('')
    const ext = file.name.split('.').pop()?.toLowerCase()
    if (!['pdf', 'docx', 'doc'].includes(ext || '')) {
      setFileError('Chỉ hỗ trợ file PDF hoặc DOCX.')
      return
    }
    if (file.size > 4 * 1024 * 1024) {
      setFileError('File quá lớn. Tối đa 4MB. Với file lớn hơn, hãy copy nội dung và dùng tab Paste Text.')
      return
    }
    setSelectedFile(file)
  }

  const handleSubmit = async (mode: 'file' | 'text') => {
    onError('')
    onLoading(true)

    try {
      const formData = new FormData()
      formData.append('language', language)

      if (mode === 'file' && selectedFile) {
        formData.append('file', selectedFile)
      } else if (mode === 'text' && pastedText.trim()) {
        formData.append('text', pastedText)
      } else {
        onError(mode === 'file' ? 'Vui lòng chọn file.' : 'Vui lòng nhập nội dung hợp đồng.')
        onLoading(false)
        return
      }

      const res = await fetch('/api/review', { method: 'POST', body: formData })

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let data: any
      try {
        data = await res.json()
      } catch {
        onError(`Lỗi ${res.status}: Server trả về phản hồi không hợp lệ.`)
        return
      }

      if (!res.ok) {
        onError(data?.error || `Lỗi ${res.status}: Đã xảy ra lỗi không xác định.`)
        return
      }

      onResult(data as ReviewResult)
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('fetch')) {
        onError('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.')
      } else {
        onError('Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.')
      }
    } finally {
      onLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Language selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Ngôn ngữ hợp đồng:</span>
        <div className="flex gap-2">
          {(['vi', 'en'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                language === lang
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {lang === 'vi' ? '🇻🇳 Tiếng Việt' : '🇺🇸 English'}
            </button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="file">
        <TabsList className="w-full">
          <TabsTrigger value="file" className="flex-1">Upload File</TabsTrigger>
          <TabsTrigger value="text" className="flex-1">Paste Text</TabsTrigger>
        </TabsList>

        {/* Upload file tab */}
        <TabsContent value="file" className="mt-4 space-y-4">
          <div
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
              dragging
                ? 'border-foreground bg-muted/50'
                : 'border-border hover:border-foreground/50 hover:bg-muted/20'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-4xl mb-3">📄</div>
            {selectedFile ? (
              <div>
                <p className="font-medium text-foreground">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {(selectedFile.size / 1024).toFixed(1)} KB — Click để thay đổi
                </p>
              </div>
            ) : (
              <div>
                <p className="font-medium">Kéo thả file vào đây</p>
                <p className="text-sm text-muted-foreground mt-1">hoặc click để chọn file</p>
                <p className="text-xs text-muted-foreground mt-2">PDF, DOCX — tối đa 4MB</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.doc"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <Button
            className="w-full"
            size="lg"
            onClick={() => handleSubmit('file')}
            disabled={!selectedFile}
          >
            Phân tích hợp đồng
          </Button>
        </TabsContent>

        {/* Paste text tab */}
        <TabsContent value="text" className="mt-4 space-y-4">
          <Textarea
            placeholder="Paste nội dung hợp đồng vào đây..."
            className="min-h-[250px] resize-none"
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              {pastedText.length.toLocaleString()} / 50,000 ký tự
            </span>
            <Button
              size="lg"
              onClick={() => handleSubmit('text')}
              disabled={pastedText.trim().length < 100}
            >
              Phân tích hợp đồng
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {fileError && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 px-4 py-2 rounded-lg">
          {fileError}
        </p>
      )}
    </div>
  )
}
