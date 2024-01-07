module.exports = {
    development: {
        client: 'pg', // Database client, in this case, PostgreSQL
        connection: {
            host: process.env.POSTGRES_HOST, // PostgreSQL host
            user: process.env.POSTGRES_USER, // PostgreSQL username
            password: process.env.POSTGRES_PASSWORD, // PostgreSQL password
            database: process.env.POSTGRES_DB, // PostgreSQL database name
        },
        migrations: {
            directory: './migrations', // Directory path for migrations
        }
    },
};
