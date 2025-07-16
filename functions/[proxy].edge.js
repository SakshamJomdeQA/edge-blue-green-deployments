export const config = { runtime: 'edge' };

const blueHost = 'edge-blue-green-deployments-blue.devcontentstackapps.com';
const greenHost = 'edge-blue-green-deployments.devcontentstackapps.com';

export default async function handler(request) {
  const url = new URL(request.url);

  // ✅ Check for force redirect to green
  if (url.searchParams.get('force') === 'green') {
    url.hostname = greenHost;
    url.searchParams.delete('force');
    console.log("⬅️ Redirecting back to GREEN:", url.toString());
    return Response.redirect(url.toString(), 302);
  }

  const random = Math.floor(Math.random() * 10) + 1;
  const isBlue = random % 2 === 0;

  if (isBlue) {
    url.hostname = blueHost;
    url.searchParams.set('force', 'green');
    console.log("🔵 Redirecting to BLUE:", url.toString());
    return Response.redirect(url.toString(), 302);
  } else {
    url.hostname = greenHost;
    console.log("🟢 Proxying to GREEN:", url.toString());
    const response = await fetch(url.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'manual',
    });
    return response;
  }
}
