import pool from '@/app/services/db'
import { movie } from '@/app/constants/models/movie'

export async function GET(request: Request) {
    const connection = await pool.getConnection();
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')


    try {
        const [rows] = await connection.query('SELECT * FROM LICHCHIEU WHERE MA_PHIM = ?',
        [id]);
        return Response.json({ data: rows });
    } catch{
        return Response.error;
    } finally {
        connection.release();
    }
}
