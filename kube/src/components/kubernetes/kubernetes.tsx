import { Content, Page } from '@backstage/core-components';
import { Grid } from '@material-ui/core';
import React from 'react';
import {
  PodsTable,
} from '../widgets';

export const Kubernetes = () => (
  <Page themeId="tool">
    <Content>
      <Grid container spacing={6} direction="row" alignItems="stretch">
        <Grid item md={12}>
          <PodsTable />
        </Grid>
      </Grid>
    </Content>
  </Page>
);
