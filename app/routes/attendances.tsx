import { json, type ActionArgs } from "@remix-run/node"; // or cloudflare/deno
import { pool } from "~/db";

export const action = async ({ request }: ActionArgs) => {
  switch (request.method) {
    case "POST": {
      const x = await request.json();
      console.log(x.slack_id)
      return x
    }
  }
};

export const loader = async () => {
  try {
    const client = await pool.connect();
    const query = "SELECT * FROM slack_users;";
    const res = await client.query(query);
    return res.rows
  } catch (err) {
    console.error(err)
  }
}
