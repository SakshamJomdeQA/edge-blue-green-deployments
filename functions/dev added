export default {
  async fetch(request) {
    const random = Math.random();
    const url = new URL(request.url);
    url.hostname = random > 0.5
      ? "edge-blue-green-deployments-blue.devcontentstackapps.com"
      : "edge-blue-green-deployments.devcontentstackapps.com";
    console.log("Routing to:", url.hostname);
    return fetch(new Request(url, request));
  }
}
