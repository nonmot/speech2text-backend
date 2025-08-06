interface ApiConfig {
  apiKey: string;
  serviceUrl: string;
  instanceId: string;
}

const apiConfig: ApiConfig = {
  apiKey: process.env.APIKEY || "",
  serviceUrl: process.env.SERVICE_URL || "",
  instanceId: process.env.INSTANCE_ID || "",
};

export default apiConfig;
