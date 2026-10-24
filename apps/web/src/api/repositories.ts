import { apiFetch } from './client.js';

export interface RepositoryV1 {
  id: string;
  githubRepositoryId: string;
  githubInstallationId: string;
  owner: string;
  name: string;
  fullName: string;
  isActive: boolean;
  createdAt: string;
}

export interface RepositoriesResponse {
  repositories: RepositoryV1[];
  total: number;
}

export function getRepositories(): Promise<RepositoriesResponse> {
  return apiFetch<RepositoriesResponse>('/api/v1/repositories');
}
