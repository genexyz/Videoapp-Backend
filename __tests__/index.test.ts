import request from "supertest";
import index from "../src/index";

describe("Get /", () => {
  it("should return 'Test Server is running' when hitting root route", async () => {
    const res = await request(index).get("/");
    expect(res.text).toBe("VIDEOAPP Server is running");
  });

  it("should return 200 when hitting root route", async () => {
    const res = await request(index).get("/");
    expect(res.status).toBe(200);
  });

  it("should return 404 when hitting a non-existent route", async () => {
    const res = await request(index).get("/non-existent-route");
    expect(res.status).toBe(404);
  });
});
