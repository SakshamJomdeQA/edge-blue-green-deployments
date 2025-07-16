export const config = {
  runtime: 'edge',
};

const blueHost = 'edge-blue-green-deployments-blue.devcontentstackapps.com';
const greenHost = 'edge-blue-green-deployments.devcontentstackapps.com';

export default async function handler(request) {
  const incomingUrl = new URL(request.url);

  const random = Math.floor(Math.random() * 10) + 1;
  const isBlue = random % 2 === 0;

  if (isBlue) {
    incomingUrl.hostname = blueHost;
    console.log("Redirecting to BLUE:", incomingUrl.toString());
    return Response.redirect(incomingUrl.toString(), 302);
  } else {
    incomingUrl.hostname = greenHost;
    console.log("Redirecting to GREEN:", incomingUrl.toString());
    return Response.redirect(incomingUrl.toString(), 302);
  }
}
