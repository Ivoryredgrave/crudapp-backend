
const {
    DATABASE_URL: database_url = 'postgresql://postgres:ROOT@localhost:5432/crudapp',
    PORT: port = '3000',
    CORS_ORIGIN: cors_origin = 'https://ivoryredgrave.github.io/crudapp-frontend'

} = process.env

export const EnvConfig = () => ({
    database_url,
    port,
    cors_origin
});