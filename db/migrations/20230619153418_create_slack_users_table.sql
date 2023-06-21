-- migrate:up
CREATE TABLE slack_users (
  id SERIAL,
  slack_id INTEGER,
  display_name VARCHAR,
  inserted_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_slack_users_slack_id
ON slack_users (slack_id);

-- migrate:down
DROP TABLE slack_users;
