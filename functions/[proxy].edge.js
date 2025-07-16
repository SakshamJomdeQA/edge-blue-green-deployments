const blueDeploymentHost = "edge-blue-green-deployments-blue.devcontentstackapps.com";
const greenDeploymentHost = "edge-blue-green-deployments.devcontentstackapps.com";

export default {
  async fetch(request) {
    const modifiedUrl = new URL(request.url);

    // Check for custom header to override deployment
    const selectedDeployment = request.headers.get('blue');

    if (selectedDeployment === 'blue') {
      modifiedUrl.hostname = blueDeploymentHost;
      console.log("🔵 Forced route to: BLUE");
    } else if (selectedDeployment === 'green') {
      modifiedUrl.hostname = greenDeploymentHost;
      console.log("🟢 Forced route to: GREEN");
    } else {
      // Default fallback — green as default
      modifiedUrl.hostname = greenDeploymentHost;
      console.log("🟢 Default route to: GREEN (no header)");
    }

    const newRequest = new Request(modifiedUrl, request);

    try {
      const response = await fetch(newRequest);
      console.log("✅ Upstream Status:", response.status);
      return response;
    } catch (error) {
      console.error("❌ Fetch error:", error.message);
      return new Response("Error reaching backend", { status: 502 });
    }
  }
};
