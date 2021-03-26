import base64 from 'base-64';

function createHeaders(apiKey: string) {
  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + base64.encode('user :' + apiKey));
  headers.set('Content-Type', 'application/json');
  return headers;
}

const getWorkItemIdsBetweenBuilds = async (
  apiKey: string,
  fromBuildId: string,
  toBuildId: string
) => {
  const url = `https://dev.azure.com/xeriusit/xerius2020/_apis/build/workitems?fromBuildId=${fromBuildId}&toBuildId=${toBuildId}&$top=100&api-version=6.0-preview.2`;

  const response = await fetch(url, {
    method: 'GET',
    headers: createHeaders(apiKey),
  });

  if (response.status === 200) {
    return ((await response.json()) as any).value.map(
      (item: { id: number }) => item.id
    );
  }
  return null;
};

const getWorkItemsBulk = async (apiKey: string, workItemIds: number[]) => {
  const url =
    'https://dev.azure.com/xeriusit/xerius2020/_apis/wit/workitemsbatch?api-version=6.0';

  const body = {
    ids: workItemIds,
    fields: ['System.Id', 'System.Title', 'System.WorkItemType'],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: createHeaders(apiKey),
    body: JSON.stringify(body),
  });

  // TODO: create type
  if (response.status === 200) {
    return ((await response.json()) as any).value.map((item: any) => ({
      id: item.id,
      url: item.url.replace(
        '_apis/wit/workItems',
        'Xerius2020/_workitems/edit'
      ),
      title: item.fields['System.Title'],
      type: item.fields['System.WorkItemType']
    }));
  }
  return null;
};

const getWorkItemsBetweenBuilds = async (
  apiKey: string,
  fromBuildId: string,
  toBuildId: string
) => {
  const workItemIds = await getWorkItemIdsBetweenBuilds(
    apiKey,
    fromBuildId,
    toBuildId
  );
  if(workItemIds === null){
    throw new Error("Failed to fetch work item ids between builds")
  }
  return await getWorkItemsBulk(apiKey, workItemIds);
};

export default {
  getWorkItemsBetweenBuilds,
};
