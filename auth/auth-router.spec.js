const request = require("supertest");
const server = require("../api/server");

describe("POST /register", () => {
  it("should return 201", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        username: "kilo3",
        password: "pass3"
      })
      .then(res => {
        expect(res.status).toBe(201);
      });
  });

  it("should return 500", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        username: "kilo",
        password: "pass3"
      })
      .then(res => {
        expect(res.status).toBe(500);
      });
  });
});

// login endpoint
describe("POST /login", () => {
  it("should return 200 OK", () => {
    return request(server)
      .post("/api/auth/login")
      .send({
        username: "kilo3",
        password: "pass3"
      })
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

  it("should return 401 Unauthorized", () => {
    return request(server)
      .post("/api/auth/login")
      .send({
        username: "name",
        password: "okay"
      })
      .then(res => {
        expect(res.status).toBe(401);
      });
  });
});
