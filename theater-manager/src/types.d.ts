export interface IMovie {
    movieId: number;
    title: string;
    overview: string;
    genres: string[];
    runtime: number;
    releaseDate: string;
    posterUrl: string;
    voteAvg: number;
    voteCount: number;
    language: string;
}