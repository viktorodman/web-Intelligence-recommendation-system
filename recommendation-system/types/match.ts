export type MatchData = {
    id: number;
    title: string;
    score: number;
}
export type Match = {
    typeOfMatch: string;
    data: MatchData[];
}