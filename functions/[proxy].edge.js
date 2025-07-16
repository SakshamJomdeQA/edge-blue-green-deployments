export const config = {
  runtime: 'edge',
};

const blueHost = 'edge-blue-green-deployments-blue.devcontentstackapps.com'; // blue deployment (no edge)
const greenHost = 'edge-blue-green-deployments.devcontentstackapps.com';     // green deployment (with edge)

export default async function handler(request) {
  const incomingUrl = new URL(request.url);

  // Pick backend (blue or green) randomly
  const random = Math.floor(Math.random() * 10) + 1;
  const targetHost = random % 2 === 0 ? blueHost : greenHost;

  const proxyUrl = new URL(request.url);
  proxyUrl.hostname = targetHost;

  console.log(`Proxying to: ${proxyUrl.toString()}`);

  // Forward original request to the selected backend
  const response = await fetch(proxyUrl.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'manual',
  });

  // Return the proxied response to the browser (browser stays on original domain)
  return response;
}
