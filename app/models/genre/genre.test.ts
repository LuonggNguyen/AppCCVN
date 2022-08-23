import { GenreModel } from "./genre"

test("can be created", () => {
  const instance = GenreModel.create({})

  expect(instance).toBeTruthy()
})
