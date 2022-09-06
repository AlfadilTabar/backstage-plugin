import React from 'react';
import { Table, TableColumn, Progress } from '@backstage/core-components';
import Alert from '@material-ui/lab/Alert';
import { useAsync } from 'react-use';
import { kubeAppSlug } from '../../kubernetesAppData';
import { KubernetesApiRef } from '../../../api';
import { useApi } from '@backstage/core-plugin-api';
import { PodObject } from '../../types';

export const DenseTable = ({ podObjects }: any) => {
	const columns: TableColumn[] = [
		{ title: 'uid', field: 'id' },
		{ title: 'name', field: 'name' },
		{ title: 'namespace', field: 'namespace' },
	];
	const title = 'pods '

	const data = podObjects.data.items.map((podObject: PodObject) => {
		return {
			id: podObject.metadata.uid,
			name: podObject.metadata.name,
			namespace: podObject.metadata.namespace
		};
	});

	return (
		<Table
			title={title}
			options={{ search: true, paging: true }}
			columns={columns}
			data={data}
		/>
	);
};

export const KubObjectsTable = ({}) => {
	const { app_slug } = kubeAppSlug();

	const KubernetesAPI = useApi(KubernetesApiRef);

	const { value, loading, error } = useAsync(async (): Promise<
		PodObject[]
	> => {
		const kubeObj = await KubernetesAPI.getPods(app_slug);
		const data = kubeObj?.getPodsData;
		const renderData: any = { data };
		return renderData;
	}, []);

	if (loading) {
		return <Progress />;
	} else if (error) {
		return <Alert severity='error'>{error.message}</Alert>;
	}

	return <DenseTable podObjects={value || []} />;
};
