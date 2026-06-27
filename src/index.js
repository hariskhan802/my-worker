export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = 'https://api.telegram.org' + url.pathname + url.search;

    const init = {
      method: request.method,
      headers: request.headers,
    };

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      init.body = await request.clone().arrayBuffer();
    }

    const response = await fetch(targetUrl, init);

    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    return newResponse;
  }
};

