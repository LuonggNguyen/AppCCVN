
import { GeneralApiProblem } from "./api-problem"
import { GenreSnapshotOut } from '../../models/genre/genre';
import { MovieSnapshotOut } from '../../models/movie/movie';






export type GetGenresResult  = { kind: "ok"; genres: GenreSnapshotOut[]} | GeneralApiProblem
export type GetMoviesResult  = { kind: "ok"; movies: MovieSnapshotOut[]} | GeneralApiProblem






