import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG, KEY_API_CONFIG } from './api-config';
import * as Types from "./api.types"
import { GenreSnapshotOut } from "../../models";
import { MovieSnapshotOut } from '../../models/movie/movie';


/**
 * Manages all requests to the API.
 */
export class Api {

  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }
  async getGenres(): Promise<Types.GetGenresResult> {
    const response: ApiResponse<any> = await this.apisauce.get(`/genre/movie/list${KEY_API_CONFIG}`)
    
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const convertGenre = (raw): GenreSnapshotOut => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }
    try {
      const rawGenres = response.data.genres
      const resultGenres: GenreSnapshotOut[] = rawGenres.map(convertGenre)
      return { kind: "ok", genres: resultGenres }
    } catch {
      return { kind: "bad-data" }
    }
  }
  async getDiscoverMovies(): Promise<Types.GetMoviesResult> {
    const response: ApiResponse<any> = await this.apisauce.get(`/discover/movie${KEY_API_CONFIG}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const convertMovie = (raw): MovieSnapshotOut => {
      return {
        id: raw.id,
        title: raw.title,
        poster_path: raw.poster_path,
        overview: raw.overview,
        genre_ids: raw.genre_ids,
        vote_average: raw.vote_average,
        vote_count: raw.vote_count,
      }
    }
    try {
      const rawMovies = response.data.results
      const resultMovies: MovieSnapshotOut[] = rawMovies.map(convertMovie)
      return { kind: "ok", movies: resultMovies }

    } catch {
      
      return { kind: "bad-data" }
    }
  }

  async getNewMovies(): Promise<Types.GetMoviesResult> {
    const response: ApiResponse<any> = await this.apisauce.get(`/movie/upcoming${KEY_API_CONFIG}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const convertMovie = (raw): MovieSnapshotOut => {
      return {
        id: raw.id,
        title: raw.title,
        poster_path: raw.poster_path,
        overview: raw.overview,
        genre_ids: raw.genre_ids,
        vote_average: raw.vote_average,
        vote_count: raw.vote_count,
      }
    }
    try {
      const rawMovies = response.data.results
      const resultMovies: MovieSnapshotOut[] = rawMovies.map(convertMovie)
      return { kind: "ok", movies: resultMovies }

    } catch {
      
      return { kind: "bad-data" }
    }
  }

  async getTopMovies(): Promise<Types.GetMoviesResult> {
    const response: ApiResponse<any> = await this.apisauce.get(`/trending/movie/week${KEY_API_CONFIG}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const convertMovie = (raw): MovieSnapshotOut => {
      return {
        id: raw.id,
        title: raw.title,
        poster_path: raw.poster_path,
        overview: raw.overview,
        genre_ids: raw.genre_ids,
        vote_average: raw.vote_average,
        vote_count: raw.vote_count,
      }
    }
    try {
      const rawMovies = response.data.results
      const resultMovies: MovieSnapshotOut[] = rawMovies.map(convertMovie)
      return { kind: "ok", movies: resultMovies }

    } catch {
      
      return { kind: "bad-data" }
    }
  }


  async getTopSearchMovies(): Promise<Types.GetMoviesResult> {
    const response: ApiResponse<any> = await this.apisauce.get(`/movie/popular${KEY_API_CONFIG}`)    
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const convertMovie = (raw): MovieSnapshotOut => {
      return {
        id: raw.id,
        title: raw.title,
        poster_path: raw.poster_path,
        overview: raw.overview,
        genre_ids: raw.genre_ids,
        vote_average: raw.vote_average,
        vote_count: raw.vote_count,
      }
    }
    try {
      const rawMovies = response.data.results
      const resultMovies: MovieSnapshotOut[] = rawMovies.map(convertMovie)
      return { kind: "ok", movies: resultMovies }

    } catch {
      return { kind: "bad-data" }
    }
  }

  // async getTopSearchMovies(): Promise<Types.GetMoviesResult> {
  //   const response: ApiResponse<any> = await this.apisauce.get(`/movie/popular${KEY_API_CONFIG}`)    
  //   if (!response.ok) {
  //     const problem = getGeneralApiProblem(response)
  //     if (problem) return problem
  //   }
  //   const convertMovie = (raw): MovieSnapshotOut => {
  //     return {
  //       id: raw.id,
  //       title: raw.title,
  //       poster_path: raw.poster_path,
  //       overview: raw.overview,
  //       genre_ids: raw.genre_ids,
  //       vote_average: raw.vote_average,
  //       vote_count: raw.vote_count,
  //     }
  //   }
  //   try {
  //     const rawMovies = response.data.results
  //     const resultMovies: MovieSnapshotOut[] = rawMovies.map(convertMovie)
  //     return { kind: "ok", movies: resultMovies }

  //   } catch {
  //     return { kind: "bad-data" }
  //   }
  // }
}
