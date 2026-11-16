import {createCloudServices,originCheck,readJSON,send,safeError} from './cloud/services.mjs';
import {HttpError} from './validation.mjs';
export function createChatHandler({env=process.env,fetcher=fetch,services=createCloudServices({env,fetcher})}={}) {
 return async(req,res)=>{try {
  if(req.method==='GET')return send(res,200,{ready:services.config.ready});
  if(req.method!=='POST')return send(res,405,{error:'Use POST.'});
  originCheck(req);const body=await readJSON(req,20000);
  if(!services.config.ready)throw new HttpError(503,'Online conversation is not configured yet.');
  
  const messages=body.messages;
  if(!['en-US','bn-BD'].includes(body.language)||!Array.isArray(messages)||messages.length<1||messages.length>16||messages.some(m=>!['user','assistant'].includes(m?.role)||typeof m.content!=='string'||!m.content.trim()||m.content.length>3000)||messages.at(-1).role!=='user')throw new HttpError(400,'Send a short conversation ending with your message.');
  const user=services.session(req,res,true);await services.consume(req,user);
  const response=await fetcher('https://api.groq.com/openai/v1/chat/completions',{method:'POST',redirect:'error',headers:{Authorization:`Bearer ${env.GROQ_API_KEY}`,'Content-Type':'application/json'},signal:AbortSignal.timeout(35000),body:JSON.stringify({model:'openai/gpt-oss-20b',reasoning_effort:'low',max_tokens:550,temperature:0.5,messages:[{role:'system',content:`You are JAYRA (pronounced Jaira, Bengali জায়রা), a friendly personal voice companion developed by Shanaj Akter. Understand both English and Bengali including romanized Bengali (Banglish), e.g. amar nam Shanaj. Reply in the user's latest language; for Banglish reply in Bengali script. When unclear, prefer ${body.language==='bn-BD'?'Bengali':'English'}. Keep answers conversational and concise, usually 1-3 sentences, with no markdown. Do not spell your name letter by letter. You have only this session's conversation, no persistent memory or computer tools. Never claim to have opened apps, set alarms, seen the camera or saved memories.`},...messages]})});
  if(!response.ok)throw new HttpError(response.status===429?429:503,response.status===429?'Online AI is busy. Please try again shortly.':'Online AI could not answer. Please try again.');
  const data=await response.json();const answer=data.choices?.[0]?.message?.content?.trim();if(!answer)throw new HttpError(503,'No reply was returned. Please try again.');send(res,200,{answer});
 }catch(error){safeError(res,error);}};
}
