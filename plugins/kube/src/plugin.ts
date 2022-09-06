import {
  createComponentExtension, createPlugin,
} from '@backstage/core-plugin-api';

import {
  configApiRef,
  createApiFactory,
  createRouteRef,
  discoveryApiRef,
} from '@backstage/core-plugin-api';
import { KubernetesApiRef, KubernetesClient } from './api';

export const rootRouteRef = createRouteRef({
  id: 'Kube',
});

export const kubePlugin = createPlugin({
  id: 'Kube',
  apis: [
    createApiFactory({
      api: KubernetesApiRef,
      deps: { configApi: configApiRef, discoveryApi: discoveryApiRef },
      factory: ({ configApi, discoveryApi }) =>
        new KubernetesClient({
          discoveryApi,
          baseUrl: configApi.getOptionalString('kube.baseUrl'),
        }),
    }),
  ],
});
export const EntityKubObjectsTable = kubePlugin.provide(
  createComponentExtension({
    name: 'EntityKubObjectsTable',
    component: {
      lazy: () =>
        import('./components/widgets/index').then((m) => m.KubObjectsTable),
    },
  })
);
