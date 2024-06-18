import pool from '@/app/services/db'
import { movie } from '@/app/constants/models/movie'

export async function GET(request: Request) {
    const connection = await pool.getConnection();
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    
    try {
        const [rows] = await connection.query('SELECT * FROM LICHCHIEU');
        return Response.json({ data: rows });
    } catch{
        return Response.error;
    } finally {
        connection.release();
    }
}

export async function PUT(request: Request) {
    const connection = await pool.getConnection();
    try {
        const formData = await request.formData();
        const maphim = formData.get('MA_PHIM');
        const ngaygiochieu = formData.get('NGAY_GIO_CHIEU');
        
        const [showtimeRows] = await connection.execute(
            'SELECT * FROM LICHCHIEU WHERE MA_PHIM = ? AND NGAY_GIO_CHIEU = ?',
            [maphim,ngaygiochieu]
            );

        if (showtimeRows.length > 0) {
            return Response.json({ error: 'Username is already in use' }, { status: 500 });
        }
        const [insertRows] = await connection.execute(
            'INSERT INTO LICHCHIEU (NGAY_GIO_CHIEU, MA_PHIM) VALUES (?, ?)',
            [ngaygiochieu, maphim]
            );

        return Response.json({ rows: insertRows });
    } catch (error) {
        console.error('Registration failed:', error.message);
        return Response.json({ error: 'Registration failed' }, { status: 500 });
    } finally {
        await connection.release();
    }
}