import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Submission from '@/models/Submission'

interface SubmissionData {
  projectId: string
  tasks: Array<{
    id: string
    text: string
    completed: boolean
    notes: string
  }>
  messages: Array<{
    id: string
    type: 'user' | 'ai'
    content: string
    timestamp: string
  }>
  language: 'en' | 'hi'
  submittedAt: string
}

export async function POST(request: Request) {
  try {
    await dbConnect()

    const body = await request.json()
    const { tasks, messages, language, submittedAt } = body

    // Validate required fields
    if (!tasks || !messages || !language || !submittedAt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new submission
    const projectId = `proj-${Date.now()}`

    const submission = await Submission.create({
      projectId,
      tasks,
      messages,
      language,
      submittedAt,
      status: 'pending'
    })

    return NextResponse.json({
      success: true,
      projectId: submission.projectId
    })
  } catch (error) {
    console.error('Error in submit-project API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await dbConnect()

    const submissions = await Submission.find()
      .sort({ submittedAt: -1 })
      .lean()

    return NextResponse.json({ submissions })
  } catch (error) {
    console.error('Error in submit-project GET API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
