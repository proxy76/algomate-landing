export interface Grade {
    id: number;
    subject: string;
    grade: number;
    date: string;
    description: string;
}

export interface Student {
    id: number;
    student_id: string;
    full_name: string;
    group_id: string;
    email: string;
    phone: string;
    day: number;
    time: string;
    grades: Grade[];
}
