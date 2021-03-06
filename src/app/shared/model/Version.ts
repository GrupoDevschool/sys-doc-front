
export interface Version {
  id?: number;
  active: boolean;
  description: string;
  number: string;
  date: string;
  gmud: string;
  order: number;
  projectId: number;
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
  gmud: string;
}
