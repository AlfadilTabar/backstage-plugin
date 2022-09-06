import { useEntity } from '@backstage/plugin-catalog-react';

export const KUBE_ANNOTATION_APP_SLUG = 'kube/app';

export const kubeAppSlug = () => {
	const { entity } = useEntity();

	const app_slug =
		entity.metadata.annotations?.[KUBE_ANNOTATION_APP_SLUG] ?? '';

	return { app_slug };
};
