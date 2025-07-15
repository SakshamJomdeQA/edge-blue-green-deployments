const blueDeploymentHost = "edge-blue-green-deployments-blue.devcontentstackapps.com";

export default async function handler(request) {
  const modifiedUrl = new URL(request.url);
    modifiedUrl.hostname = blueDeploymentHost;

  const newRequest = new Request(modifiedUrl, request);
  return fetch(newRequest);
}
