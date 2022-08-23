import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { Genre, GenreModel, GenreSnapshotOut } from "../genre/genre"
import { withEnvironment } from "../extensions/with-environment"
import { Api } from "../../services/api"
import { KEY_API_CONFIG } from "../../services/api/api-config"

/**
 * Model description here for TypeScript hints.
 */
export const GenreStoreModel = types
  .model("GenreStore")
  .props({
    genres: types.optional(types.array(GenreModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveGenres: (genreSnapshots: GenreSnapshotOut[]) => {
      const genreModels: Genre[] = genreSnapshots.map((c) => GenreModel.create(c)) // create model instances from the plain objects
      self.genres.replace(genreModels) // Replace the existing data with the new data
    },
  }))
  .actions((self) => ({
    getGenres: async () => {
      const response = await Api.query<{ genres: GenreSnapshotOut[] }>(
        `/genre/movie/list${KEY_API_CONFIG}`,
      )
      self.saveGenres(response.data.genres)
    },
  }))

export interface GenreStore extends Instance<typeof GenreStoreModel> {}
export interface GenreStoreSnapshotOut extends SnapshotOut<typeof GenreStoreModel> {}
export interface GenreStoreSnapshotIn extends SnapshotIn<typeof GenreStoreModel> {}
export const createGenreStoreDefaultModel = () => types.optional(GenreStoreModel, {})
