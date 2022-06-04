import { createConnection } from "mysql";

const db = createConnection({
    user: 'root',
    host: 'localhost',
    database: 'collaborative-ide'
})


export default db;