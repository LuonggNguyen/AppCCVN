import { Instance, SnapshotOut, types, SnapshotIn } from 'mobx-state-tree';

/**
 * Model description here for TypeScript hints.
 */
export const GenreModel = types
  .model("Genre")
  .props({
    id:types.number,
    name:types.string
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Genre extends Instance<typeof GenreModel> {}
export interface GenreSnapshotOut extends SnapshotOut<typeof GenreModel> {}
export interface GenreSnapshotIn extends SnapshotIn<typeof GenreModel> {}
export const createGenreDefaultModel = () => types.optional(GenreModel, {})
