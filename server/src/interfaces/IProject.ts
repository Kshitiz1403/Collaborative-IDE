export interface IProject{
    id: number;
    name: string;
    language: 'python' | 'c++' | 'java' | 'nodejs';
    username: string;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    slug_expiry:Date;
}

export interface IProjectInputDTO{
    name: string;
    language: 'python' | 'c++' | 'java' | 'nodejs';
    username: string;
}