export default async () => {
  return new Response(JSON.stringify({
    appId: process.env.ONESIGNAL_APP_ID || ''
  }), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
};
