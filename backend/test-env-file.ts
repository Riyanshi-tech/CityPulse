import 'dotenv/config';
import fs from 'fs';
fs.writeFileSync('env-out.txt', process.env.DATABASE_URL || '');
