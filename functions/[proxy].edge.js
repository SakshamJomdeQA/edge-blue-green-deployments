export const config = {
  runtime: 'edge',
};

const blueDeploymentHost = "edge-blue-green-deployments-blue.devcontentstackapps.com";
const greenDeploymentHost = "edge-blue-green-deployments.devcontentstackapps.com";

export default async function handler(request) {
  const url = new URL(request.url);

  // Example logic — force redirect to blue
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  const targetHost = randomNumber % 2 === 0 ? blueDeploymentHost : greenDeploymentHost;

  // Build the full redirect URL (preserving path and query)
  url.hostname = targetHost;
  const redirectUrl = url.toString();

  console.log("🔀 Redirecting to:", redirectUrl);

  return Response.redirect(redirectUrl, 302);
}
