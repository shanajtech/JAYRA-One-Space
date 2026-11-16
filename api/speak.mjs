import {MsEdgeTTS,OUTPUT_FORMAT} from 'msedge-tts';
import {createCloudServices,originCheck,readJSON,send,safeError} from '../server/cloud/services.mjs';
import {HttpError} from '../server/validation.mjs';
export const config={maxDuration:60};
const services=createCloudServices();
export default async function(req,res){let tts;try{
 if(req.method!=='POST')return send(res,405,{error:'Use POST.'});originCheck(req);const body=await readJSON(req,12000);
 if(typeof body.text!=='string'||!body.text.trim()||body.text.length>2400)throw new HttpError(400,'Enter a short reply.');
 const user=services.session(req,res);await services.consume(req,user,'speech');
 const text=body.text.replace(/\bJAYRA\b/gi,'Jaira');const voice=/[\u0980-\u09ff]/.test(text)?'bn-BD-NabanitaNeural':'en-US-AriaNeural';
 tts=new MsEdgeTTS({connectionTimeoutMs:8000,synthesisTimeoutMs:20000});await tts.setMetadata(voice,OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
 const escaped=text.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]));
 const {audioStream}=tts.toStream(escaped);const chunks=[];let size=0;for await(const chunk of audioStream){size+=chunk.length;if(size>3000000)throw new Error('Too large');chunks.push(chunk);}const audio=Buffer.concat(chunks);if(audio.length<100)throw new Error('No audio');
 res.setHeader('Content-Type','audio/mpeg');res.setHeader('Cache-Control','no-store');res.statusCode=200;res.end(audio);
 }catch(error){safeError(res,error);}finally{tts?.close();}}
