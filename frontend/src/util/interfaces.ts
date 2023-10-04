interface UserInterface {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    location?: string;
    phone?: string;
    urls?: string[];
    attachments?: Attachment[];
    date?: Date;
    appliedJobs?: string[];
    shortlisted?: string[];
};

interface Attachment {
    _id: string
    fileType: string
}

interface JobInterface {
    _id: string;
    title?: string;
    location?: string;
    description?: string;
    salary?: number;
    position?: 'Full Time' | 'Part Time' | 'Contract' | 'Internship';
    requirements?: string[];
    responsibilities?: string[];
    skills?: string[];
    whatWereLookingFor?: string[];
    created?: string;
    deadline: string;
    remote?: boolean;
    benefits?: string[];
    applicants?: string[];
    selected?: string[];
    selectedForInterview?: string[];
    shortlisted?: string[];
    rejected?: string[];
    requiredDocuments?: string[];
    jobQuestions?: string[];
    views?: number;
    yoe?: number;
    [key: string]: any;
  }

export type { JobInterface, UserInterface }