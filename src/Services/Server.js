import { Model, createServer } from "miragejs";
import mockData from "../MockData.json";

export const makeServer = () => {
  return createServer({
    models: {
      employee: Model,
    },

    seeds(server) {
      const employeesData = [...mockData];

      employeesData.forEach((employee) => {
        server.create("employee", employee);
      });
    },

    routes() {
      this.get("/api/chartData", (schema) => {
        return schema.all("employee").models.map((employee) => employee.attrs);
      });

      this.put("/api/chartData/:id", (schema, request) => {
        const id = request.params.id;
        const updatedData = JSON.parse(request.requestBody);
        console.log("data to be updated", updatedData);
        const employee = schema.find("employee", id);
        employee.update(updatedData);
        return employee;
      });
    },
  });
};
