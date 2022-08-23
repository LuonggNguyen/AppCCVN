import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { Genre, GenreModel, GenreSnapshotOut } from '../genre/genre';
import { withEnvironment } from '../extensions/with-environment';
import { GetGenresResult } from "../../services/api";

/**
 * Model description here for TypeScript hints.
 */
export const GenreStoreModel = types
  .model("GenreStore")
  .props({
    genres: types.optional(types.array(GenreModel),[])
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    saveGenres: (genreSnapshots: GenreSnapshotOut[]) => {
      const genreModels: Genre[] = genreSnapshots.map(c => GenreModel.create(c)) // create model instances from the plain objects
      self.genres.replace(genreModels) // Replace the existing data with the new data
    },
  }))
  .actions(self => ({
    getGenres: flow(function*() {
      const result: GetGenresResult = yield self.environment.api.getGenres()

      if (result.kind === "ok") {
        self.saveGenres(result.genres)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  }))

export interface GenreStore extends Instance<typeof GenreStoreModel> {}
export interface GenreStoreSnapshotOut extends SnapshotOut<typeof GenreStoreModel> {}
export interface GenreStoreSnapshotIn extends SnapshotIn<typeof GenreStoreModel> {}
export const createGenreStoreDefaultModel = () => types.optional(GenreStoreModel, {})
