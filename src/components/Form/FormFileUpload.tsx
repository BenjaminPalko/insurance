'use client';
import ProgressBar from "@/components/common/Progress/ProgressBar";
import axios from "axios";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";

interface FormValues {
    files: File[];
}

interface FormFileUpload {
    accept: string;
}

const FormFileUpload = function ({accept}: FormFileUpload) {

    const {control, watch, handleSubmit, resetField, setValue, formState: {errors}} = useForm<FormValues>({
        defaultValues: {
            files: []
        }
    })

    const files = watch('files', []);
    const [progress, setProgress] = useState<number[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const arr = new Array(files.length);
        arr.fill(0);
        setProgress(arr);
    }, [files]);

    const removeFile = function (index: number) {
        setValue('files', [...files].filter((_, i) => i !== index));
    }

    const clear = function () {
        resetField('files');
    }

    const upload = handleSubmit(data => {
        setIsUploading(true);
        data.files.every(async (file, index) => {
            try {
                const form = new FormData();
                form.append('fileUpload', file);

                const {status} = await axios.post(
                    `${process.env.NEXT_PUBLIC_HYGRAPH}/upload`,
                    form,
                    {
                        headers: {
                            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_ASSET_TOKEN}`,
                        },
                        onUploadProgress: (progressEvent) => {
                            setProgress(prevState => {
                                const progression = [...prevState];
                                progression[index] = (progressEvent.progress || 0) * 100;
                                return progression;
                            });
                        }
                    });
                if (status >= 200 && status < 300) {
                    return true;
                }
            } catch (e) {
            }
            return false;
        });
        setTimeout(() => {
            setIsUploading(false);
            clear();
        }, 1000);
    });

    return (
        <div className={'flex flex-col gap-5 items-end'}>
            <label
                className="w-48 flex items-center gap-5 px-4 py-6 bg-white dark:bg-gray-800 text-blue-700 rounded-lg shadow-lg tracking-wide uppercase border border-blue-700 cursor-pointer hover:bg-blue-700 hover:text-white">
                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path
                        d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"/>
                </svg>
                <span className="text-base leading-normal">Select a file</span>
                <Controller
                    control={control}
                    name={'files'}
                    render={({field: {value, onChange, ...field}, fieldState}) => (
                        <input
                            {...field}
                            //value={value}
                            onChange={event => event.target.files && onChange(Array.from(event.target.files))}
                            type='file'
                            className="hidden"
                            accept={accept}
                            multiple
                        />
                    )}
                />
            </label>
            {
                files.length > 0 && (
                    <>
                        <ul className={'flex-1 flex flex-col w-full gap-5'}>
                            {
                                files.map((file, index) => (
                                    <li key={file.name}
                                        className={'flex items-center gap-4 bg-gray-600 p-2 rounded font-light'}>
                                        <p>{`Filename: ${file.name}`}</p>
                                        <ProgressBar value={progress[index]}/>
                                        <p>{`Size: ${file.size} bytes`}</p>
                                        <p>{`Type: ${file.type}`}</p>
                                        <button
                                            className={'rounded py-1 px-2 bg-red-700 disabled:bg-gray-700 font-medium'}
                                            onClick={() => removeFile(index)}
                                            disabled={isUploading}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className={'w-full flex justify-end gap-3'}>
                            <button
                                className={'rounded py-2 px-3 bg-red-600 disabled:bg-gray-600 font-medium'}
                                onClick={clear}
                                disabled={isUploading}
                            >
                                Clear
                            </button>
                            <button
                                className={'rounded py-2 px-3 bg-blue-700 disabled:bg-gray-600 font-medium'}
                                onClick={upload}
                                disabled={isUploading}
                            >
                                Upload
                            </button>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default FormFileUpload;
