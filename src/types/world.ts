export interface Country {
    id: number;
    name: string;
    code?: string;
}

export interface Region {
    id: number;
    name: string;
    state_code?: string;
    country_id?: number;
    country_name?: string;
}

export interface Subregion {
    id: number;
    name: string;
    region_id?: number;
    region_name?: string;
}

// Genel API Liste Getiri Arayüzü
export interface WorldListResponse<T> {
    count: number;
    results: T[];
}
