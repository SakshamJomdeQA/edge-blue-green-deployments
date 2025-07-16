export const config = {
  runtime: 'edge',
};

const blueHost = 'edge-blue-green-deployments-blue.gcpstagcontentstackapps.com';
const greenHost = 'edge-blue-green-deployments.gcpstagcontentstackapps.com';

export default async function handler(request) {
  const incomingUrl = new URL(request.url);

  const random = Math.floor(Math.random() * 10) + 1;
  const isBlue = random % 2 === 0;

  if (isBlue) {
    incomingUrl.hostname = blueHost;
    console.log("Redirecting to BLUE:", incomingUrl.toString());
    return Response.redirect(incomingUrl.toString(), 302);
  } else {
    const proxyUrl = new URL(request.url);
    proxyUrl.hostname = greenHost;
    console.log("Proxying to GREEN:", proxyUrl.toString());

    const response = await fetch(proxyUrl.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'manual',
    });

    return response;
  }
}
