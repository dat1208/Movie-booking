import * as mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'att-lab-viectute-cbfd.a.aivencloud.com',
    port: 16456,
    user: 'avnadmin',
    password: 'AVNS_3pecshNeArlR1NgalJS',
    database: 'movies',
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
});

export default pool;
