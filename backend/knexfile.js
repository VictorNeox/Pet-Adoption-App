module.exports = {
    development: {
        client: 'mysql',
        connection: {
          host : '127.0.0.1',
          user : 'victor.oliveira',
          password : '123456789',
          database : 'adopetdb'
        },
        migrations: {
            directory: './src/database/migrations'
        },
        useNullAsDefault: true,
    }
}