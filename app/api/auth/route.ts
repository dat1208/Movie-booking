import pool from '@/app/services/db'
import jwt from "jsonwebtoken";

//LOGIN
export async function POST(request: Request) {
    const connection = await pool.getConnection();
    
    const formData = await request.formData()
    const username = formData.get('username')
    const password = formData.get('password')
    
    try{
        const [AUTH] = await connection.execute(
            'SELECT * FROM KHACHHANG WHERE TEN_DANG_NHAP = ? AND MAT_KHAU = ?',
            [username, password]
            );
        if (AUTH.length > 0) {
            
            const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
                expiresIn: "10000m",
            });
            return Response.json({ token: token }, { status: 200 });
        }
        
    }
    catch (error) {
        return Response.error();
    }
    finally {
        await connection.release();
    }
    
    return Response.error();
}

//REGISTER
export async function PUT(request: Request) {
    const connection = await pool.getConnection();
     try {
        const formData = await request.formData();
        const email = formData.get('email');
        const phoneNumber = formData.get('phoneNumber');
        const fullName = formData.get('fullName');
        const birthDate = convertDateFormat(formData.get('birthDate'));
        const username = formData.get('username');
        const password = formData.get('password');
        
        // Check if email is unique
        const [emailRows] = await connection.execute(
            'SELECT * FROM KHACHHANG WHERE EMAIL = ?',
            [email]
        );

        if (emailRows.length > 0) {
            return Response.json({ error: 'Email is already in use' }, { status: 400 });
        }

         // Check if username is unique
         const [usernameRows] = await connection.execute(
             'SELECT * FROM KHACHHANG WHERE TEN_DANG_NHAP = ?',
             [username]
             );

        if (usernameRows.length > 0) {
            return Response.json({ error: 'Username is already in use' }, { status: 400 });
        }

         
         const [insertRows] = await connection.execute(
             'INSERT INTO KHACHHANG (EMAIL, SO_DIEN_THOAI, HO_TEN, NGAY_SINH, TEN_DANG_NHAP, MAT_KHAU) VALUES (?, ?, ?, ?, ?, ?)',
             [email, phoneNumber, fullName, birthDate, username, password]
             );

        return Response.json({ rows: insertRows });
     } catch (error) {
         console.error('Registration failed:', error.message);
         return Response.json({ error: 'Registration failed' }, { status: 500 });
     } finally {
         await connection.release();
     }
}


function convertDateFormat(inputDate:any) {
    const [year, month, day] = inputDate.split('-');
    const convertedDate = `${year}/${month}/${day}`;
    return convertedDate;
}