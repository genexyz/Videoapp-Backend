import request from "supertest";
import app from "../src/index";

describe("POST /auth/login", () => {
  it("returns a JWT token and refresh token when given valid credentials", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "user1@example.com", password: "password1$" })
      .expect(200);

    expect(res.body.token).toBeTruthy();
    expect(res.body.refreshToken).toBeTruthy();
  });
});
