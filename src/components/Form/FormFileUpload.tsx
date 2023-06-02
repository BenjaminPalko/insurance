'use client';
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";

interface FormValues {
    files: File[];
}

interface FormFileUpload {
    accept: string;
}

const FormFileUpload = function ({accept}: FormFileUpload) {

    const {control, watch, handleSubmit, reset, setValue, formState: {errors}} = useForm<FormValues>({
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
        setValue("files", [...files].filter((_, i) => i !== index));
    }

    const upload = handleSubmit(data => {
        data.files.every(async (file, index) => {
            try {
                const form = new FormData();
                form.append('fileUpload', file);

                const {status} = await fetch(`${process.env.NEXT_PUBLIC_HYGRAPH}/upload`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_ASSET_TOKEN}`,
                    },
                    body: form,
                });

                // const {status} = await axios.post(
                //     `${process.env.NEXT_PUBLIC_HYGRAPH}/upload`,
                //     form,
                //     {
                //         headers: {
                //             'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_ASSET_TOKEN}`,
                //         },
                //         onUploadProgress: (progressEvent) => {
                //             progress[index] = progressEvent.progress || 0
                //         }
                //     });
                if (status >= 200 && status < 300) {
                    return true;
                }
            } catch (e) {
                setIsUploading(false);
            }
            return false;
        })
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
                                        <div className={'flex-1 flex items-baseline gap-4'}>
                                            <div className={'w-full bg-gray-400 rounded h-2.5'}>
                                                <div
                                                    className={`bg-blue-700 h-2.5 rounded transition duration-75 w-[${progress[index] || 0}%]`}/>
                                            </div>
                                            <p className={'w-8'}>{`${progress[index] || 0}%`}</p>
                                        </div>
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
                        <button className={'rounded py-2 px-3 bg-blue-700 font-medium'} onClick={upload}
                                disabled={isUploading}>Upload
                        </button>
                    </>
                )
            }
        </div>
    )
}

export default FormFileUpload;
