'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react'

type Status = 'idle' | 'uploading' | 'success' | 'error'
const CONTACT_EMAIL = 'rad@fanlinc.ai'

const ACCEPTED = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'video/mp4',
  'video/quicktime',
  'video/x-msvideo',
  'image/jpeg',
  'image/png',
]

const ACCEPT_STRING = ACCEPTED.join(',')

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [studentName, setStudentName] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [progress, setProgress] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const canSubmit = file && studentName.trim().length > 0 && status !== 'uploading'

  const handleFile = (f: File) => {
    setFile(f)
    setStatus('idle')
    setProgress(0)
    setErrorMsg('')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) handleFile(dropped)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) handleFile(selected)
  }

  const handleSubmit = () => {
    if (!file || !studentName.trim()) return

    setStatus('uploading')
    setProgress(0)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('studentName', studentName.trim())

    const xhr = new XMLHttpRequest()

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        setProgress(Math.round((e.loaded / e.total) * 100))
      }
    })

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        setStatus('success')
        setProgress(100)
      } else {
        try {
          const body = JSON.parse(xhr.responseText)
          setErrorMsg(body.error ?? 'Upload failed. Please try again.')
        } catch {
          setErrorMsg('Upload failed. Please try again.')
        }
        setStatus('error')
      }
    })

    xhr.addEventListener('error', () => {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    })

    xhr.open('POST', '/api/upload')
    xhr.send(formData)
  }

  const reset = () => {
    setFile(null)
    setStudentName('')
    setStatus('idle')
    setProgress(0)
    setErrorMsg('')
    if (inputRef.current) inputRef.current.value = ''
  }

  /* ── Success state ── */
  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-brand-green/30 bg-brand-green/[0.04] p-8 flex flex-col items-center gap-4 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-brand-green/15 flex items-center justify-center">
          <CheckCircle size={28} className="text-brand-green" />
        </div>
        <div>
          <p className="font-russo text-[#f0f4ff] text-[20px] mb-1">Submission Received</p>
          <p className="font-chakra text-[rgba(240,244,255,0.65)] text-[14px] leading-[1.7]">
            <span className="text-brand-green font-semibold">{file?.name}</span> has been uploaded.
            {' '}If you have any questions, email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-green hover:underline underline-offset-2">
              {CONTACT_EMAIL}
            </a>.
          </p>
        </div>
        <button
          onClick={reset}
          className="mt-2 font-chakra text-[13px] text-[rgba(240,244,255,0.4)] hover:text-brand-green transition-colors duration-200 cursor-pointer underline underline-offset-4"
        >
          Submit another file
        </button>
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Student name field */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="student-name"
          className="font-space text-[10px] tracking-[0.18em] uppercase text-[rgba(240,244,255,0.5)]"
        >
          Your Full Name *
        </label>
        <input
          id="student-name"
          type="text"
          placeholder="e.g. Jane Smith"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 font-chakra text-[15px] text-[#f0f4ff] placeholder:text-[rgba(240,244,255,0.25)] outline-none focus:border-brand-green/50 focus:bg-white/[0.06] transition-all duration-200"
        />
      </div>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => !file && inputRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden ${
          isDragging
            ? 'border-brand-green/70 bg-brand-green/[0.05] scale-[1.01]'
            : file
            ? 'border-brand-green/30 bg-brand-green/[0.03]'
            : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] cursor-pointer'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT_STRING}
          onChange={handleChange}
          className="sr-only"
          aria-label="Upload your submission file"
        />

        <AnimatePresence mode="wait">
          {!file ? (
            /* ── Empty drop zone ── */
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-4 p-10 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                <Upload size={24} className="text-[rgba(240,244,255,0.4)]" aria-hidden="true" />
              </div>
              <div>
                <p className="font-chakra font-semibold text-[rgba(240,244,255,0.8)] text-[15px]">
                  Drag & drop your file here
                </p>
                <p className="font-chakra text-[rgba(240,244,255,0.35)] text-[13px] mt-1">
                  or{' '}
                  <span className="text-brand-green underline underline-offset-2 cursor-pointer">
                    click to browse
                  </span>
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-1">
                {['PDF', 'Word', 'PowerPoint', 'MP4', 'Images'].map((fmt) => (
                  <span
                    key={fmt}
                    className="font-space text-[10px] tracking-wide uppercase text-[rgba(240,244,255,0.3)] bg-white/[0.04] border border-white/[0.07] rounded-full px-3 py-1"
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : (
            /* ── File selected ── */
            <motion.div
              key="selected"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-4 p-5"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center flex-shrink-0">
                <FileText size={20} className="text-brand-green" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-chakra font-semibold text-[rgba(240,244,255,0.9)] text-[14px] truncate">
                  {file.name}
                </p>
                <p className="font-chakra text-[rgba(240,244,255,0.4)] text-[12px] mt-0.5">
                  {formatBytes(file.size)}
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); reset() }}
                className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-colors duration-200 cursor-pointer flex-shrink-0"
                aria-label="Remove file"
              >
                <X size={14} className="text-[rgba(240,244,255,0.5)]" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
          >
            <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="font-chakra text-red-300 text-[13px] leading-[1.6]">{errorMsg}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit button + progress */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`relative w-full overflow-hidden rounded-xl py-4 font-chakra font-bold text-[15px] transition-all duration-200 ${
            canSubmit
              ? 'bg-brand-green text-black cursor-pointer hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(0,255,136,0.2)]'
              : 'bg-white/[0.06] text-[rgba(240,244,255,0.3)] cursor-not-allowed'
          }`}
        >
          {/* Progress fill */}
          {status === 'uploading' && (
            <motion.span
              className="absolute inset-0 bg-brand-green/30"
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={{ scaleX: progress / 100 }}
              transition={{ ease: 'linear' }}
              aria-hidden="true"
            />
          )}

          <span className="relative flex items-center justify-center gap-2">
            {status === 'uploading' ? (
              <>
                <Loader size={16} className="animate-spin" aria-hidden="true" />
                Uploading… {progress}%
              </>
            ) : (
              <>
                <Upload size={16} aria-hidden="true" />
                Submit File
              </>
            )}
          </span>
        </button>

        <p className="font-chakra text-[rgba(240,244,255,0.3)] text-[12px] text-center leading-[1.6]">
          If you have any questions, email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-green hover:underline underline-offset-2">
            {CONTACT_EMAIL}
          </a>.
        </p>
      </div>
    </div>
  )
}
