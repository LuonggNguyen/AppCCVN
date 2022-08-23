import { MovieModel } from "./movie"

test("can be created", () => {
  const instance = MovieModel.create({})

  expect(instance).toBeTruthy()
})
