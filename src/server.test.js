import { makeServer } from "./Services/Server";

test("Mirage seeds employees data", async () => {
  makeServer();
  // Fetch the employees
  const employees = await fetch("/api/chartData").then((data) => data.json());
  expect(employees.length).toBe(10);
});

test("testing server", () => expect(true).toBe(true));
