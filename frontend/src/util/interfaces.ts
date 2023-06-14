interface UserInterface {
  firstName: string
  lastName: string
  email: string
  location: string
  phone: string
  urls: string[]
  attachments: Attachment[]
  date: Date
  appliedJobs: string[]
  shortlisted: string[]
  jobQuestionResponse: JobQuestionResponse[]
}

interface Attachment {
  _id: string
  fileType: 'Resume' | 'Coverletter' | 'References' | 'Portfolio' | 'Certificates'
}

interface JobQuestionResponse {
  questionId: string
  response: string
}

interface JobInterface {
  title: string
  location: string
  description: string
  salary?: number
  position: 'Full Time' | 'Part Time' | 'Contract' | 'Internship'
  requirements: string[]
  responsibilities: string[]
  skills: string[]
  whatWereLookingFor: string[]
  date: Date
  deadline: Date
  remote: boolean
  benefits: string[]
  applicants: string[]
  requiredDocuments: ('resume' | 'coverletter' | 'references' | 'portfolio' | 'certificates')[]
  jobQuestions: string[]
  yoe: number
  [key: string]: any
}

export type { JobInterface, UserInterface }
