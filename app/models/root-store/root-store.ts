import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { GenreStoreModel, GenreStore } from '../genre-store/genre-store';
import { MovieStoreModel, MovieStore } from '../movie-store/movie-store';


/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  genreStore: types.optional(GenreStoreModel, {} as GenreStore),
  topMovieStore: types.optional(MovieStoreModel, {} as MovieStore),
  newMovieStore: types.optional(MovieStoreModel, {} as MovieStore),
  discoverMovieStore: types.optional(MovieStoreModel, {} as MovieStore),
  topSearchMovieStore: types.optional(MovieStoreModel, {} as MovieStore),



})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
