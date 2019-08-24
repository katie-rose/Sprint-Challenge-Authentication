const request = require("supertest");
const server = require("../api/server");

//test 1
describe("POST /register", () => {
  it("returns JSON", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        username: "kilo20",
        password: "pass20"
      })
      .then(res => {
        expect(res.type).toMatch(/json/);
      });
  });
});


  // test 2
  describe("POST /login", () => {
    it("returns status 401 unauthorized", () => {
      return request(server)
        .post("/api/auth/login")
        .send({
          username: "nope",
          password: "noooope"
        })
        .then(res => {
          expect(res.status).toBe(401);
        });
    });
    });

    //test 3
    it("returns status 200 authorized", () => {
      return request(server)
        .post("/api/auth/login")
        .send({
          username: "kilo1",
          password: "pass1"
        })
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

  // test 4
  describe("GET /jokes", () => {
    it("returns JSON", () => {
    return request(server)
      .post("/api/jokes")
      .send({
        username: "kilo20",
        password: "pass20"
      })
      .then(res => {
        expect(res.type).toMatch(/json/);
      });
  });

    //test 5
    it("returns 400 no token", () => {
      return request(server)
        .get("/api/jokes")
        .then(res => {
          expect(res.status).toBe(400);
        });
    });
  });