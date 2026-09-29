const APP_ID = process.env.ONESIGNAL_APP_ID;
const API_KEY = process.env.ONESIGNAL_REST_API_KEY;

function json(data, status=200){
  return new Response(JSON.stringify(data), {status, headers:{'content-type':'application/json; charset=utf-8'}});
}

export default async (req) => {
  if(req.method !== 'POST') return json({error:'Method not allowed'},405);
  if(!APP_ID || !API_KEY) return json({error:'OneSignal environment variables are not configured'},500);
  let body;
  try{ body = await req.json(); }catch{ return json({error:'Invalid JSON'},400); }

  if(body.action === 'cancel'){
    if(!body.notificationId) return json({error:'notificationId is required'},400);
    const r = await fetch(`https://api.onesignal.com/notifications/${encodeURIComponent(body.notificationId)}?app_id=${encodeURIComponent(APP_ID)}`,{
      method:'DELETE', headers:{'Authorization':`Key ${API_KEY}`,'Accept':'application/json'}
    });
    const text=await r.text();
    return new Response(text || JSON.stringify({ok:r.ok}), {status:r.status, headers:{'content-type':'application/json; charset=utf-8'}});
  }

  if(body.action !== 'schedule') return json({error:'Unsupported action'},400);
  const required=['externalId','studentName','amount','dueDate','sendAfter'];
  for(const k of required) if(body[k]===undefined || body[k]===null || body[k]==='') return json({error:`${k} is required`},400);

  const payload={
    app_id: APP_ID,
    target_channel:'push',
    include_aliases:{external_id:[String(body.externalId)]},
    name:`student-payment-${body.studentId || Date.now()}`,
    headings:{en:`موعد دفع: ${body.studentName}`},
    contents:{en:`المبلغ ${Number(body.amount).toLocaleString('en-US')} د.ع — الاستحقاق ${body.dueDate}`},
    send_after: body.sendAfter,
    url: body.siteUrl || undefined,
    idempotency_key: crypto.randomUUID()
  };

  const r=await fetch('https://api.onesignal.com/notifications',{
    method:'POST', headers:{'content-type':'application/json; charset=utf-8','Authorization':`Key ${API_KEY}`}, body:JSON.stringify(payload)
  });
  const text=await r.text();
  return new Response(text,{status:r.status,headers:{'content-type':'application/json; charset=utf-8'}});
};
