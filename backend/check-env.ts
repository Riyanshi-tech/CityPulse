import 'dotenv/config';
const dbUrl = process.env.DATABASE_URL;
console.log(`[${dbUrl}]`);
if (dbUrl && (dbUrl.startsWith("'") || dbUrl.endsWith("'"))) {
    console.log("ALERT: DATABASE_URL contains single quotes!");
}
