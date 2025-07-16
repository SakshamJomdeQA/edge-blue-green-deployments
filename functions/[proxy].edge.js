export const config = { runtime: 'edge' };

const blueHost = 'edge-blue-green-deployments-blue.devcontentstackapps.com';
const greenHost = 'edge-blue-green-deployments.devcontentstackapps.com';

export default async function handler(request) {
  const url = new URL(request.url);

  // Check if user is coming back from blue (query flag)
  const fromBlue = url.searchParams.get('from') === 'green';

  if (fromBlue) {
    console.log("⬅️ Redirecting BACK to GREEN:", url.pathname);
    url.hostname = greenHost;
    url.searchParams.delete('from'); // clean up URL
    return Response.redirect(url.toString(), 302);
  }

  // First time: random logic
  const random = Math.floor(Math.random() * 10) + 1;
  if (random % 2 === 0) {
    url.hostname = blueHost;
    url.searchParams.set('from', 'green'); // mark visit
    console.log("🔵 Redirecting to BLUE:", url.toString());
    return Response.redirect(url.toString(), 302);
  } else {
    console.log("🟢 Proxying to GREEN:", url.pathname);
    const proxyUrl = new URL(request.url);
    proxyUrl.hostname = greenHost;
    const response = await fetch(proxyUrl.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'manual',
    });
    return response;
  }
}
