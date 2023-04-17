/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testPathIgnorePatterns: ["/dist/", "/node_modules/"],
  moduleFileExtensions: ["ts", "js"],
  globals: {
    token: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtZWQ3MEBnbWFpbC5jb20iLCJ1c2VySWQiOiI3NWQ0MTY2Mi0wYTA1LTQ5YmItOWVlYi1iOTUxM2UwYmE5NmIiLCJpYXQiOjE2ODE3NDc2NTksImV4cCI6MTY4MjAwNjg1OX0.nGUakYQr_dYiiZCACcOWqtsMKY04tC_QmsWBmXP1NXk'
  }
};