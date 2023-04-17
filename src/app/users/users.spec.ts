import { api, reqTest } from "../utils/reqTest";
const baseUrl = `${api()}`;

describe(`POST Login`, function () {
  const loginBody = {
    email: "mohamed@gmail.com",
    password: "@##<MNNNB>hhhh",
  }
  it("Login for user", async function () {
    const response = await reqTest.post(`${baseUrl}/login`).send(loginBody)
    expect(response.status).toEqual(200);
  })
})

describe(`POST Signup`, function () {
  const signupBody = {
    name: "Mohamed Hossam",
    email: "mohamed@gmail.com",
    password: "@##<MNNNB>hhhh",
  }
  it("signup for user", async function () {
    const response = await reqTest.post(`${baseUrl}/signup`).send(signupBody)
    expect(response.status).toEqual(422);
  })
})

describe(`POST ForgetPassword`, function () {
  const foregtPasswordBody = {
    email: "mohamed@gmail.com",
  }
  it("forget password for user", async function () {
    const response = await reqTest.post(`${baseUrl}/forget-password`).send(foregtPasswordBody)
    expect(response.status).toEqual(200);
  })
})