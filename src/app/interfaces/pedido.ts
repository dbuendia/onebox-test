

export interface Sessions {
    date?: string;
    selectedTickets?: number
    id?: string;
}

export interface Pedido {
    id?: string;
    titulo?: string;
    sessions?: Sessions[]
}
