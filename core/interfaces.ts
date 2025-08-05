import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes"

export interface Job{
    id: number
    title: string
    company: string
    interviewType: InterviewType
    status: Status
    created_at?: Timestamp
    date?: Date
    applicationDate: Date,
    salary: string,
    location: string,
    description: string,
    requirements: string,
    notes: string,
}

export type InterviewType = 'Screening' | 'Behavioral' | 'Live coding' | 'Takehome'

export type Status = 'Applied' | 'Interview' | 'Rejected' | 'Offer';

export interface JobDTO{
    title: string
    company: string
    interviewType: InterviewType
    status: Status
    applicationDate: Date,
    salary: string,
    location: string,
    description: string,
    requirements: string,
    notes: string,
}

export interface JobFormData {
    title: string;
    company: string;
    status: Status;
    interviewType: InterviewType;
}

export interface JobFormProps {
    onSubmit: (data: JobFormData) => void;
    onValidationError: (message: string) => void;
    isLoading?: boolean;
}

export interface DetailRowProps {
  label: string;
  value: string | number | null | undefined;
};
