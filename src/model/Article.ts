export interface Article {
    id: number;
    title: string;
    author: string;
    fullContent: string;
    halfContent: string;
    viewCount: number;
    publishDate: Date;
    userId: string;
}