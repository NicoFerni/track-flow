import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes"

export interface Job{
    id: number
    title: string
    company: string
    interview_type: InterviewType
    status: Status
    created_at?: Timestamp
    date?: Date
}

export type InterviewType = 'Screening' | 'Behavioral' | 'Live coding' | 'Takehome'

export type Status = 'Applied' | 'Interview' | 'Rejected' | 'Offer';

export interface JobDTO{
    title: string
    company: string
    interviewType: InterviewType
    status: Status
}

export interface JobFormData {
    title: string;
    company: string;
    status: Status;
    interview_type: InterviewType;
}

export interface JobFormProps {
    onSubmit: (data: JobFormData) => void;
    onValidationError: (message: string) => void;
    isLoading?: boolean;
}