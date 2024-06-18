export interface movie {
    MA_PHIM: string;
    THOI_GIAN_PHIM: number;
    TEN_PHIM: string;
    THONG_TIN_PHIM: string;
    HINH_ANH: string;
    MA_LOAI: number;
    GIA_PHIM: number;
    TRAILER: string;
}


export type Seats = {
    [key: string]: number[]
}