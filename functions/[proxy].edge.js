const blueDeploymentHost = "edge-blue-green-deployments-blue.devcontentstackapps.com";

export default {
  async fetch(request) {
    const modifiedUrl = new URL(request.url);
    modifiedUrl.hostname = blueDeploymentHost;

    console.log("Forcing route to: BLUE deployment ->", modifiedUrl.hostname);

    const newRequest = new Request(modifiedUrl, request);

    try {
      const response = await fetch(newRequest);
      console.log("Status from upstream (BLUE):", response.status);
      return response;
    } catch (error) {
      console.error("Fetch to BLUE failed:", error.message);
      return new Response("Error fetching blue deployment", { status: 502 });
    }
  }
};
