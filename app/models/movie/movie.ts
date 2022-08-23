import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withEnvironment } from '../extensions/with-environment';

/**
 * Model description here for TypeScript hints.
 */
export const MovieModel = types
  .model("Movie")
  .props({
    id: types.number,
    title:types.string,
    poster_path:types.string,
    overview:types.string,
    genre_ids:types.optional(types.array(types.number),[]),
    vote_average:types.number,
    vote_count:types.number,
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
  }))

export interface Movie extends Instance<typeof MovieModel> {}
export interface MovieSnapshotOut extends SnapshotOut<typeof MovieModel> {}
export interface MovieSnapshotIn extends SnapshotIn<typeof MovieModel> {}
export const createMovieDefaultModel = () => types.optional(MovieModel, {})
