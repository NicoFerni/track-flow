export interface Job{
    id: number
    title: string
    company: string
    interview_type: InterviewType
    status: Status
    created_at?: string
}

export type InterviewType = 'Screening' | 'Behavioral' | 'Live coding' | 'Takehome'

export type Status = 'Applied' | 'Interview' | 'Rejected' | 'Offer';

export interface JobDTO{
    title: string
    company: string
    interviewType: InterviewType
    status: Status
}
