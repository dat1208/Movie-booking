import pool from '@/app/services/db'
import { movie } from '@/app/constants/models/movie'
import * as fs from 'fs/promises';
import * as path from 'path';

const getAllMovies = async (): Promise<movie[]> => {
    const connection = await pool.getConnection();

    try {
        const [rows] = await connection.query('SELECT * FROM PHIM');

        return rows as movie[];
    } finally {
        connection.release();
    }
};

export async function GET(request: Request) {
    const connection = await pool.getConnection();
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
        
    if(id !== null){
        const [rows] = await connection.query('SELECT * FROM PHIM WHERE MA_PHIM = ?', [id]);
        if (rows.length === 0) {
            return Response.error();
        }
        const movie = rows[0] as movie;
        return Response.json({ movie })
    }
    
    const data = await getAllMovies();
    return Response.json({ data })
}

export async function POST(request: Request) {
    const connection = await pool.getConnection();
    
    try {
        const formData = await request.formData();
        const TEN_PHIM = formData.get('TEN_PHIM');
        const THONG_TIN_PHIM = formData.get('THONG_TIN_PHIM');
        const HINH_ANH = formData.get('HINH_ANH') as File;
        const MA_LOAI_PHIM = formData.get('MA_LOAI_PHIM');
        const GIA_PHIM = formData.get('GIA_PHIM');
        const THOI_GIAN_PHIM = formData.get('THOI_GIAN_PHIM');
        const TRAILER = formData.get('TRAILER');
        
        console.log('File Object:', HINH_ANH);
        
        
       const [insertRows] = await connection.execute(
           'INSERT INTO PHIM (THOI_GIAN_PHIM, TEN_PHIM, THONG_TIN_PHIM, HINH_ANH, MA_LOAI_PHIM, GIA_PHIM, TRAILER) VALUES (?, ?, ?, ?, ?, ?, ?)',
           [THOI_GIAN_PHIM, TEN_PHIM, THONG_TIN_PHIM, HINH_ANH, MA_LOAI_PHIM, GIA_PHIM, TRAILER]
           );

        return Response.json({ data: insertRows[0] });
    } catch (error) {
        console.error('POST request failed:', error.message);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await connection.release();
    }
}
