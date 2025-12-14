import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const postgresInfos = await database
    .query(
      "SELECT (SELECT version()) AS version, (SELECT setting::int FROM pg_settings WHERE name = 'max_connections') AS max_connections, (SELECT COUNT(*)::int FROM pg_stat_activity) AS current_users",
    )
    .then((result) => result.rows[0]);

  let version = postgresInfos?.version.split(" ")[1];
  version = version.toString();

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: version,
        max_connections: postgresInfos.max_connections,
        opened_connections: postgresInfos.current_users,
      },
    },
  });
}

export default status;
