import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import mongoose from 'mongoose'

// Define Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  projectType: String,
  budget: String,
  description: String,
  timeline: String,
  createdAt: { type: Date, default: Date.now }
})

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema)

export async function POST(request: Request) {
  try {
    await dbConnect()

    const body = await request.json()
    const { name, email, phone, projectType, budget, description, timeline } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Create new contact submission
    const contact = await Contact.create({
      name,
      email,
      phone,
      projectType,
      budget,
      description,
      timeline
    })

    return NextResponse.json({
      success: true,
      message: 'Contact submission received',
      data: contact
    }, { status: 201 })

  } catch (error) {
    console.error('Error saving contact:', error)
    return NextResponse.json(
      { error: 'Failed to save contact submission' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await dbConnect()

    const contacts = await Contact.find().sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      count: contacts.length,
      data: contacts
    })

  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}
