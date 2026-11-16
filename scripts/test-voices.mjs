import {MsEdgeTTS,OUTPUT_FORMAT} from 'msedge-tts';
import {writeFile} from 'node:fs/promises';
for(const [name,voice,text] of [['bn','bn-BD-NabanitaNeural','হাই, আমি জায়রা। তুমি কেমন আছো?'],['en','en-US-AriaNeural','Hi, I am Jaira. How are you today?']]){
 const tts=new MsEdgeTTS({connectionTimeoutMs:8000,synthesisTimeoutMs:15000});try{await tts.setMetadata(voice,OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);const {audioStream}=tts.toStream(text),chunks=[];for await(const c of audioStream)chunks.push(c);const bytes=Buffer.concat(chunks);await writeFile('../outputs/JAYRA-voice-'+name+'.mp3',bytes);console.log(name,bytes.length,'audio bytes');}finally{tts.close();}}
