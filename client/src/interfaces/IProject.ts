export interface IProject {
    id: number;
    name: string;
    language: string;
    updatedAt: Date;
}

export interface IProjectInputDTO extends Omit<IProject, 'updatedAt' | 'id'> {}

export interface IProjectCreate extends Omit<IProject, 'updatedAt'> {}

export interface IProjectGet extends Omit<IProject, 'updatedAt'> {
    slug: string;
    username: string;
}