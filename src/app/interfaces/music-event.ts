export interface MusicEvent {
    event?: {
        id: string;
        title: string;
        subtitle: string;
        image: string;
    };
    sessions?: {
        date: string;
        availability: string;
        selectedTickets: number;
        id: string;
    }[]
}