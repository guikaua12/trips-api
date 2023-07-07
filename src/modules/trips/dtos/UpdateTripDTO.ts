export interface UpdateTripDTO {
    id: string;
    name?: string;
    location: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    pricePerDay?: number;
    coverImage?: string;
    imagesUrl?: string[];
    highlights?: string[];
    maxGuests?: number;
}
