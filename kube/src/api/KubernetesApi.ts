import { createApiRef } from '@backstage/core-plugin-api';
import {
	PodObject,
} from '../components/types';

export interface Pods {
	getPodsData: PodObject[];
}

export const KubernetesApiRef = createApiRef<KubernetesApi>({
	id: 'plugin.kubernetes.service',
});

export type KubernetesApi = {
	getPods(projectID: string): Promise<Pods | undefined>;
};
