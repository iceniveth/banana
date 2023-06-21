import { Pool } from 'pg'

const { DATABASE_URL } = process.env;

let pool: Pool;

declare global {
  var __pool__: Pool | undefined;
}

// This is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// In production, we'll have a single connection to the DB.
if (process.env.NODE_ENV === "production") {
  pool = new Pool({
    connectionString: DATABASE_URL
  });
} else {
  if (!global.__pool__) {
    global.__pool__ = new Pool({
      connectionString: DATABASE_URL
    });
  }
  pool = global.__pool__;
  pool.connect()
}

pool.on('error', (err, _) => {
  console.error('Unexpected error on idle client', err)
  process.exit(1)
})

export { pool }


// import { Pool } from 'pg'
// const pool = new Pool()
 
// const client = await pool.connect()
 
// try {
//   await client.query('BEGIN')
//   const queryText = 'INSERT INTO users(name) VALUES($1) RETURNING id'
//   const res = await client.query(queryText, ['brianc'])
 
//   const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)'
//   const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo']
//   await client.query(insertPhotoText, insertPhotoValues)
//   await client.query('COMMIT')
// } catch (e) {
//   await client.query('ROLLBACK')
//   throw e
// } finally {
//   client.release()
// }
