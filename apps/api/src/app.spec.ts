import request from "supertest";
import { app } from "./app";

describe("app", () => {
  it("is OK", async () => {
    const response = await request(app).get("/_manage/info");
    expect(response.text).toBe("Everything is awesome!");
  });
});
