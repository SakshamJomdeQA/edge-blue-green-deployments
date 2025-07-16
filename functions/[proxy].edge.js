export const config = {
  runtime: 'edge',
};

const blueDeploymentHost = "edge-blue-green-deployments-blue.devcontentstackapps.com";
const greenDeploymentHost = "edge-blue-green-deployments.devcontentstackapps.com";

export default async function handler(request) {
  const url = new URL(request.url);
  const random = Math.floor(Math.random() * 10) + 1;

  url.hostname = random % 2 === 0 ? blueDeploymentHost : greenDeploymentHost;
  const redirectUrl = url.toString();

  console.log("Redirecting to:", redirectUrl);

  return Response.redirect(redirectUrl, 302);
}
