# kube

This is a demo plugin to show how to add a plugin to backstage.

1. replace the folder in the /plugins directory in your project.

2. Add "@internal/plugin-kube": "^0.1.0" in dependencies in kubernetes-app/packages/app/package.json.

3. set the proxy to your kube api:

```
proxy:
  '/kube':
    target: '${KUBE_API}'
    allowedMethods: ['GET']
    headers:
      Authorization: Bearer ${KUBE_TOKEN}
```

4. in your /packages/app/src/components/catalog/EntityPage.tsx add 
```
import { EntityKubObjectsTable } from '@internal/plugin-kube';

const serviceEntityPage = (
  <EntityLayout>
    ...
    <EntityLayout.Route path="/kube" title="kube">
       <EntityKubObjectsTable />
    </EntityLayout.Route>
```


5. Add a kube/app annotation to your respective catalog-info.yaml files, on the format

```
# Example catalog-info.yaml entity definition file
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  # ...
  annotations:
      kube/app: 'k8s-app label'
spec:
  type: service
  # ...
```
