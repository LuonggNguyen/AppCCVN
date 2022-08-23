import { Instance, SnapshotOut, types, SnapshotIn, flow } from 'mobx-state-tree';
import { MovieModel, Movie, MovieSnapshotOut } from '../movie/movie';
import { withEnvironment } from '../extensions/with-environment';
import { GetMoviesResult} from '../../services/api/api.types';

/**
 * Model description here for TypeScript hints.
 */
export const MovieStoreModel = types
  .model("MovieStore")
  .props({
    topMovies: types.optional(types.array(MovieModel), []),
    newMovies: types.optional(types.array(MovieModel), []),
    topSearchMovies: types.optional(types.array(MovieModel), []),
    discoverMovies: types.optional(types.array(MovieModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    saveDiscoverMovies: (movieSnapshots: MovieSnapshotOut[]) => {
      const movieModels: Movie[] = movieSnapshots.map(c => MovieModel.create(c)) // create model instances from the plain objects
      self.discoverMovies.replace(movieModels) // Replace the existing data with the new data
    },
  }))
  .actions(self => ({
    getDiscoverMovies: flow(function*() {
      const result: GetMoviesResult = yield self.environment.api.getDiscoverMovies()

      if (result.kind === "ok") {
        self.saveDiscoverMovies(result.movies)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  }))
  .actions(self => ({
    saveNewMovies: (movieSnapshots: MovieSnapshotOut[]) => {
      const movieModels: Movie[] = movieSnapshots.map(c => MovieModel.create(c)) // create model instances from the plain objects
      self.newMovies.replace(movieModels) // Replace the existing data with the new data
    },
  }))
  .actions(self => ({
    getNewMovies: flow(function*() {
      const result: GetMoviesResult = yield self.environment.api.getNewMovies()
      if (result.kind === "ok") {
        self.saveNewMovies(result.movies)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    })
  }))
  .actions(self => ({
    saveTopMovies: (movieSnapshots: MovieSnapshotOut[]) => {
      const movieModels: Movie[] = movieSnapshots.map(c => MovieModel.create(c)) 
      self.topMovies.replace(movieModels)
    },
  }))
  .actions(self => ({
    getTopMovies: flow(function*() {
      const result: GetMoviesResult = yield self.environment.api.getTopMovies()
      if (result.kind === "ok") {
        self.saveTopMovies(result.movies)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    })
  }))

  .actions(self => ({
    saveTopSearchMovies: (movieSnapshots: MovieSnapshotOut[]) => {
      const movieModels: Movie[] = movieSnapshots.map(c => MovieModel.create(c)) 
      self.topSearchMovies.replace(movieModels)
    },
  }))
  .actions(self => ({
    getTopSearchMovies: flow(function*() {
      const result: GetMoviesResult = yield self.environment.api.getTopSearchMovies()
      if (result.kind === "ok") {
        self.saveTopSearchMovies(result.movies)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    })
  }))

export interface MovieStore extends Instance<typeof MovieStoreModel> {}
export interface MovieStoreSnapshotOut extends SnapshotOut<typeof MovieStoreModel> {}
export interface MovieStoreSnapshotIn extends SnapshotIn<typeof MovieStoreModel> {}
export const createMovieStoreDefaultModel = () => types.optional(MovieStoreModel, {})
