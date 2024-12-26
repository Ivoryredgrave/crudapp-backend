import pg from 'pg';
import { EnvConfig } from '../config/env.config.js';

const { database_url } = EnvConfig();
const { Pool } = pg;

export const db = new Pool({
    connectionString: database_url,
    allowExitOnIdle: true,
});