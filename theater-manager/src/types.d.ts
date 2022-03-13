import { FormControl } from "@angular/forms";

export interface IMovie {
    movieId: number;
    title: string;
    overview: string;
    releaseDate: string;
    posterUrl: string;
    voteAvg: number;
    voteCount: number;
    language: string;
    isInLocalDB: boolean;
}

export interface IMoviesSearchResult {
    page: number;
    results: IMovie[];
    totalPages: number;
    totalResults: number;
}