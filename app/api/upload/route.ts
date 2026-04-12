import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const name = (formData.get('name') as string | null) ?? 'Unknown'
  const studentId = (formData.get('studentId') as string | null) ?? 'Unknown'
  const major = (formData.get('major') as string | null) ?? 'Unknown'

  if (!file || file.size === 0) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
  }

  if (file.size > 52_428_800) {
    return NextResponse.json({ error: 'File must be under 50 MB.' }, { status: 413 })
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const safeName = name.replace(/\s+/g, '_')
  const safeId = studentId.replace(/\s+/g, '_')
  const filename = `submissions/${timestamp}_${safeName}_${safeId}_${file.name}`

  const blob = await put(filename, file, { access: 'private' })

  return NextResponse.json({ url: blob.url, filename: blob.pathname })
}
