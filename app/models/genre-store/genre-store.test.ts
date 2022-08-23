import { GenreStoreModel } from "./genre-store"

test("can be created", () => {
  const instance = GenreStoreModel.create({})

  expect(instance).toBeTruthy()
})
