import { Instance, SnapshotOut, types, SnapshotIn } from "mobx-state-tree"
import { MovieModel, Movie, MovieSnapshotOut, MovieResponse } from "../movie/movie"
import { withEnvironment } from "../extensions/with-environment"
import { Api } from "../../services/api"
import { KEY_API_CONFIG } from "../../services/api/api-config"

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
  .actions((self) => ({
    saveDiscoverMovies: (movieSnapshots: MovieSnapshotOut[]) => {
      const movieModels: Movie[] = movieSnapshots.map((c) => MovieModel.create(c)) // create model instances from the plain objects
      self.discoverMovies.replace(movieModels) // Replace the existing data with the new data
    },
  }))
  .actions((self) => ({
    getDiscoverMovies: async () => {
      const response = await Api.query<MovieResponse>(`/discover/movie${KEY_API_CONFIG}`)
      const results = response.data.results.map((movie) => movie)
      self.saveDiscoverMovies(results)
    },
  }))
  .actions((self) => ({
    saveNewMovies: (movieSnapshots: MovieSnapshotOut[]) => {
      const movieModels: Movie[] = movieSnapshots.map((c) => MovieModel.create(c)) // create model instances from the plain objects
      self.newMovies.replace(movieModels) // Replace the existing data with the new data
    },
  }))
  .actions((self) => ({
    getNewMovies: async () => {
      const response = await Api.query<MovieResponse>(`/movie/upcoming${KEY_API_CONFIG}`)
      const results = response.data.results.map((movie) => movie)
      self.saveNewMovies(results)
    },
  }))
  .actions((self) => ({
    saveTopMovies: (movieSnapshots: MovieSnapshotOut[]) => {
      const movieModels: Movie[] = movieSnapshots.map((c) => MovieModel.create(c))
      self.topMovies.replace(movieModels)
    },
  }))
  .actions((self) => ({
    getTopMovies: async () => {
      const response = await Api.query<MovieResponse>(`/trending/movie/week${KEY_API_CONFIG}`)
      const results = response.data.results.map((movie) => movie)
      self.saveTopMovies(results)
    },
  }))

  .actions((self) => ({
    saveTopSearchMovies: (movieSnapshots: MovieSnapshotOut[]) => {
      const movieModels: Movie[] = movieSnapshots.map((c) => MovieModel.create(c))
      self.topSearchMovies.replace(movieModels)
    },
  }))
  .actions((self) => ({
    getTopSearchMovies: async () => {
      const response = await Api.query<MovieResponse>(`/movie/popular${KEY_API_CONFIG}`)
      const results = response.data.results.map((movie) => movie)
      self.saveTopSearchMovies(results)
    },
  }))

export interface MovieStore extends Instance<typeof MovieStoreModel> {}
export interface MovieStoreSnapshotOut extends SnapshotOut<typeof MovieStoreModel> {}
export interface MovieStoreSnapshotIn extends SnapshotIn<typeof MovieStoreModel> {}
export const createMovieStoreDefaultModel = () => types.optional(MovieStoreModel, {})
