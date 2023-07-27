async function logRequestBody(request) {
  const clone = request.clone();
  const headers = new Headers(clone.headers);
  const headersString = Array.from(headers.entries())
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  console.log("Request Headers:", headersString);
  const body = await clone.text();
  console.log("Request Body:", body);
  return request;
}
(function () {
  const originalFetch = window.fetch;
  window.fetch = function (url, options) {
    if (options && options.method && options.method.toUpperCase() === "POST") {
      const request = new Request(url, options);
      return logRequestBody(request).then((updatedRequest) => originalFetch(updatedRequest));
    } else {
      return originalFetch(url, options);
    }
  };
})();
