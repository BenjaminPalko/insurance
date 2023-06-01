'use client';
import {type ChangeEvent} from "react";

interface FileUploadProps {
    accept?: string;
    multiple?: boolean;
    onChange: (files: File[]) => void;
}

const FileUpload = function ({accept, multiple = true, onChange}: FileUploadProps) {

    const handleChange = function (e: ChangeEvent<HTMLInputElement>) {
        onChange(Array.from(e.target.files || []))
    }

    return (
        <div>
            <label
                className="w-48 flex items-center gap-5 px-4 py-6 bg-white dark:bg-gray-800 text-blue-700 rounded-lg shadow-lg tracking-wide uppercase border border-blue-700 cursor-pointer hover:bg-blue-700 hover:text-white">
                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path
                        d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"/>
                </svg>
                <span className="text-base leading-normal">Select a file</span>
                <input type='file' className="hidden" onChange={handleChange} accept={accept} multiple={multiple}/>
            </label>
        </div>
    )
}

export default FileUpload;
