export interface Employee {
    id: string;
    name: string;
    position: string;
    level: string;
    github: string;
    slack: string;
}

export interface ReviewMetrics {
    commits: number;
    prAcceptance: string;
    reviewTime: string;
}

export interface ReviewLevels {
    'Scope and Impact': string;
    'Technical Contributions': string;
    'Expertise': string;
    'Design & Architecture': string;
    'Ownership': string;
}

export interface ReviewData {
    metrics: ReviewMetrics;
    achievements: string[];
    growthAreas: string[];
    levels: ReviewLevels;
} 