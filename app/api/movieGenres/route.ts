import pool from '@/app/services/db'
import { movie } from '@/app/constants/models/movie'

export async function GET(request: Request) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM LOAIPHIM');
        return Response.json({ data: rows });
    } catch{
        return Response.error;
    } finally {
        connection.release();
    }
}