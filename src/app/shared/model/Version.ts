
export interface Version {
  id?: number;
  active: boolean;
  number: string;
  date: string;
  gmud: string;
  order: number;
  screens: number;
}

export interface CreateVersion {
  id?: number;
  versionNumber: string;
  description: string;
  deployDate: string;
  status: boolean;
  order: number;
  versionCloneId?: number;
  projectId: number;
}
