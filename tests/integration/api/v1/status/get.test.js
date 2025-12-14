test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.dependencies).toBeDefined();
  expect(responseBody.dependencies.database).toBeDefined();
  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.opened_connections).toBeDefined();

  expect(typeof responseBody.dependencies).toBe("object");
  expect(typeof responseBody.dependencies.database).toBe("object");
  expect(typeof responseBody.dependencies.database.version).toBe("string");
  expect(typeof responseBody.dependencies.database.max_connections).toBe(
    "number",
  );
  expect(typeof responseBody.dependencies.database.opened_connections).toBe(
    "number",
  );

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const parsedVersion = responseBody.dependencies.database.version;
  expect(parsedVersion).toEqual("16.0");

  const maxConnections = responseBody.dependencies.database.max_connections;
  expect(maxConnections).toEqual(100);

  const openedConnections =
    responseBody.dependencies.database.opened_connections;
  expect(openedConnections).toEqual(7);
});
