import pool from '@/app/services/db'
import { movie } from '@/app/constants/models/movie'


export async function PUT(request: Request) {
    const connection = await pool.getConnection();
    try {
        const formData = await request.formData();
        const tenloaiphim = formData.get('TEN_LOAI_PHIM');
        
        
        const [insertRows] = await connection.execute(
            'INSERT INTO LOAIPHIM (TEN_LOAI_PHIM) VALUES (?)',
            [tenloaiphim]
            );

        return Response.json({ rows: insertRows });
    } catch (error) {
        console.error('Registration failed:', error.message);
        return Response.json({ error: 'Registration failed' }, { status: 500 });
    } finally {
        await connection.release();
    }
}