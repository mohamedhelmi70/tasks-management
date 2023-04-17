import { api, reqTest } from "../utils/reqTest"
const baseUrl = `${api()}`

describe(`GET tasks`, function () {
  it("list board", async function () {
    const response = await reqTest.get(`${baseUrl}/tasks`).set("Authorization", global?.token);
    expect(response.status).toEqual(200)
    expect(response.body.payload).toBeDefined()
  })
})

describe(`POST tasks`, function () {
  it("create new task", async function () {
    const taskBody = {
      title: "New Task Title",
      status: "TODO"
    }
    const response = await reqTest.post(`${baseUrl}/tasks`).set("Authorization", global?.token).send(taskBody);
    expect(response.status).toEqual(201);
    expect(response.body.payload).toBeDefined();
  })
})
