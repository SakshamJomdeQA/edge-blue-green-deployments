const blueDeploymentHost = "blue-green-deployments-blue.devcontentstackapps.com";
const greenDeploymentHost = "blue-green-deployments.devcontentstackapps.com";

export default {
  async fetch(request) {
    const randomNumber = Math.floor((Math.random() * 10) + 1);
    const modifiedUrl = new URL(request.url);

    if (randomNumber % 2 === 0) {
      modifiedUrl.hostname = blueDeploymentHost;
      console.log("Routing to: BLUE deployment ->", modifiedUrl.hostname);
    } else {
      modifiedUrl.hostname = greenDeploymentHost;
      console.log("Routing to: GREEN deployment ->", modifiedUrl.hostname);
    }

    const newRequest = new Request(modifiedUrl, request);

    try {
      const response = await fetch(newRequest);
      console.log("Status from upstream:", response.status);
      return response;
    } catch (error) {
      console.error("Fetch failed:", error.message);
      return new Response("Error fetching deployment", { status: 502 });
    }
  }
};
