declare interface Movie {
    adult?:                 boolean;
    backdrop_path?:         string;
    belongs_to_collection?: BelongsToCollection;
    budget?:                number;
    genres?:                Genre[];
    homepage?:              string;
    id?:                    number;
    imdb_id?:               string;
    original_language?:     string;
    original_title?:        string;
    overview?:              string;
    popularity?:            number;
    poster_path?:           string;
    production_companies?:  ProductionCompany[];
    production_countries?:  ProductionCountry[];
    release_date?:          Date;
    revenue?:               number;
    runtime?:               number;
    spoken_languages?:      SpokenLanguage[];
    status?:                string;
    tagline?:               string;
    title?:                 string;
    video?:                 boolean;
    vote_average?:          number;
    vote_count?:            number;
}

declare interface BelongsToCollection {
    backdropPath?: string;
    id?:           number;
    name?:         string;
    posterPath?:   string;
}

declare interface Genre {
    id?:   number;
    name?: string;
}

declare interface ProductionCompany {
    id?:            number;
    logoPath?:      null | string;
    name?:          string;
    originCountry?: string;
}

declare interface ProductionCountry {
    iso3166_1?: string;
    name?:      string;
}

declare interface SpokenLanguage {
    englishName?: string;
    iso639_1?:    string;
    name?:        string;
}
declare interface Cast {
    name?: string;
    known_for_department?:    string;
    profile_path?:        string;
}
