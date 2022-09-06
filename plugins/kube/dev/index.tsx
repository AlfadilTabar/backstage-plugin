// @ts-ignore TS1259: Module can only be default-imported using the 'esModuleInterop' flag
import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { kubePlugin, EntityKubObjectsTable } from '../src/plugin';

createDevApp()
  .registerPlugin(kubePlugin)
  .addPage({
    element: <EntityKubObjectsTable />,
    title: 'Root Page',
    path: '/kube'
  })
  .render();
