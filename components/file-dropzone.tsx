"use client";

import Image from "next/image";
import { useId } from "react";
import { Upload } from "lucide-react";
import { translate, useAppLanguage } from "@/lib/language";

type FileDropzoneProps = {
  onFile: (file?: File) => void;
  preview?: string;
  accept?: string;
  label?: string;
  hint?: string;
};

export function FileDropzone({
  onFile,
  preview,
  accept = "image/png,image/jpeg,image/webp,image/avif",
  label = "Drop an image here, or",
  hint = "PNG, JPG, WebP or AVIF · Up to 25 MB",
}: FileDropzoneProps) {
  const inputId = useId();
  const language = useAppLanguage();
  const t = (text: string) => translate(text, language);

  const openFilePicker = () => document.getElementById(inputId)?.click();

  return (
    <label
      htmlFor={inputId}
      role="button"
      tabIndex={0}
      aria-label={t("Upload an image. Drop a file or paste from the clipboard.")}
      className="dropzone"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openFilePicker();
        }
      }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        onFile(event.dataTransfer.files[0]);
      }}
      onPaste={(event) => {
        const file = event.clipboardData.files[0];
        if (file) onFile(file);
      }}
    >
      <input
        id={inputId}
        type="file"
        accept={accept}
        onChange={(event) => onFile(event.target.files?.[0])}
      />
      {preview ? (
        <Image src={preview} alt={t("Selected image preview")} width={800} height={600} unoptimized />
      ) : (
        <>
          <span className="upload-icon"><Upload size={20} /></span>
          <b>{t(label)} <u>{t("browse files")}</u></b>
          <small>{t(hint)}</small>
        </>
      )}
    </label>
  );
}
