import { DiscoveryApi } from '@backstage/core-plugin-api';
import {
	PodObject,
} from '../components/types';
import {
	KubernetesApi,
	Pods,
} from './KubernetesApi';

export class KubernetesClient implements KubernetesApi {
	discoveryApi: DiscoveryApi;
	baseUrl: string;
	constructor({
		discoveryApi,
		baseUrl = '',
	}: {
		discoveryApi: DiscoveryApi;
		baseUrl?: string;
	}) {
		this.discoveryApi = discoveryApi;
		this.baseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
	}

	private async callApi<T>(
		path: string,
	): Promise<T | []> {
		const apiUrl = `${await this.discoveryApi.getBaseUrl('proxy')}/kube`;

		const response = await fetch(
			`${apiUrl}/${path}`,
		);
		
		if (response.status === 200) {
			return (await response.json()) as T;
		}
		return [];
	}

	async getPods(
		appName?: string,
	): Promise<Pods | undefined> {
		const podObjects = await this.callApi<PodObject[]>(
			`api/v1/pods\?labelSelector\=k8s-app%3D${appName}`,
		);
		return {
			getPodsData: podObjects!,
		};
	}
}
