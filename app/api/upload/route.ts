import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { Readable } from 'stream'

const FOLDER_ID = '1GkwuB7KvnLsxpbWjotHj8AnjxRkRvFxN'

function bufferToStream(buffer: Buffer): Readable {
  const readable = new Readable({ read() {} })
  readable.push(buffer)
  readable.push(null)
  return readable
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const studentName = (formData.get('studentName') as string | null) ?? ''

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
    }

    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

    if (!clientEmail || !privateKey) {
      return NextResponse.json(
        {
          error:
            'Upload service is not configured yet. Please email your submission to rad@fanlinc.ai',
        },
        { status: 503 }
      )
    }

    const auth = new google.auth.GoogleAuth({
      credentials: { client_email: clientEmail, private_key: privateKey },
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    })

    const drive = google.drive({ version: 'v3', auth })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const stream = bufferToStream(buffer)

    const driveName = studentName.trim()
      ? `[${studentName.trim()}] ${file.name}`
      : file.name

    const response = await drive.files.create({
      requestBody: {
        name: driveName,
        parents: [FOLDER_ID],
      },
      media: {
        mimeType: file.type || 'application/octet-stream',
        body: stream,
      },
      fields: 'id,name',
    })

    return NextResponse.json({
      success: true,
      fileId: response.data.id,
      fileName: response.data.name,
    })
  } catch (error) {
    console.error('Drive upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed. Please try again or email rad@fanlinc.ai' },
      { status: 500 }
    )
  }
}
