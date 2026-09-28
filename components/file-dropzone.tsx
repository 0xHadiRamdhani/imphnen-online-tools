"use client";
import {useId} from "react";
import {Upload} from "lucide-react";
import {translate,useAppLanguage} from "@/lib/language";

export function FileDropzone({onFile,preview,accept="image/png,image/jpeg,image/webp,image/avif",label="Drop an image here, or",hint="PNG, JPG, WebP or AVIF · Up to 25 MB"}:{onFile:(file?:File)=>void;preview?:string;accept?:string;label?:string;hint?:string}){
 const id=useId(),language=useAppLanguage(),t=(text:string)=>translate(text,language);return <label htmlFor={id} role="button" tabIndex={0} aria-label={t("Upload an image. Drop a file or paste from the clipboard.")} className="dropzone" onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();document.getElementById(id)?.click()}}} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();onFile(e.dataTransfer.files[0])}} onPaste={e=>{const file=e.clipboardData.files[0];if(file)onFile(file)}}><input id={id} type="file" accept={accept} onChange={e=>onFile(e.target.files?.[0])}/>{preview?<img src={preview} alt={t("Selected image preview")}/>:<><span className="upload-icon"><Upload size={20}/></span><b>{t(label)} <u>{t("browse files")}</u></b><small>{t(hint)}</small></>}</label>
}
