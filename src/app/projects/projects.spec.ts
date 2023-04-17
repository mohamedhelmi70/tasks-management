import { api, reqTest } from "../utils/reqTest"
const baseUrl = `${api()}`

describe(`GET projects`, function () {
  it("list projects", async function () {
    const response = await reqTest.get(`${baseUrl}/projects`).set("Authorization", global?.token);
    expect(response.status).toEqual(200);
    expect(response.body.payload).toBeDefined();
  })
})

describe(`POST projects`, function () {
  it("create new project", async function () {
    const projectBody = {
      name: "New Project"
    }
    const response = await reqTest.post(`${baseUrl}/projects`).set("Authorization", global?.token).send(projectBody);
    expect(response.status).toEqual(201);
    expect(response.body.payload).toBeDefined();
  })
})
