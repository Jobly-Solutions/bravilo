const baseApiUrl = process.env.API_URL
  ? process.env.API_URL
  : 'https://dev.braviloai.com';

module.exports = {
  type: 'custom',
  test: {
    headers: { Authorization: 'Bearer {{bundle.authData.api_key}}' },
    removeMissingValuesFrom: { params: true },
    url: `${baseApiUrl}/api/me`,
  },
  connectionLabel: (z, bundle) => {
    const { name } = bundle.inputData;
    return `Oganization: ${name}`;
  },
  fields: [
    {
      computed: false,
      key: 'api_key',
      required: false,
      label: 'Chaindesk API Key',
      type: 'password',
      helpText:
        'Your Chaindesk API Key can be found here https://dev.braviloai.com/settings/api-keys',
    },
  ],
  customConfig: {},
};
