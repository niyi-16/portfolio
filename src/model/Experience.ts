export type Experience =  {
    _id: string;
    title: string;
    company: string;
    location: {
        province: string;
        country: string;
    }
    employment_type: string;
    start_date: string; // ISO format (YYYY-MM)
    end_date: string | null;
    current: boolean;
    summary: string;
    responsibilities: string[];
    skills: string[];
}