import mongoose from 'mongoose'

const SubmissionSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  tasks: [{
    id: String,
    text: String,
    completed: Boolean,
    notes: String
  }],
  messages: [{
    id: String,
    type: {
      type: String,
      enum: ['user', 'ai']
    },
    content: String,
    timestamp: Date
  }],
  language: {
    type: String,
    enum: ['en', 'hi'],
    default: 'en'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'in-progress', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true
})

export default mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema)
