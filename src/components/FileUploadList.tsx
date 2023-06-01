'use client';
import FileUpload from "@/components/common/Input/FileUpload";
import {useCallback, useState} from "react";

const FileUploadList = function () {

    const [files, setFiles] = useState<File[]>([]);

    const removeFile = useCallback((index: number) => {
        if (files.length === 0 || index >= files.length || index < 0) {
            return;
        }

        setFiles(prevState => prevState.filter((_, i) => i !== index));
    }, [files])
    return (
        <div className={'flex flex-col gap-5'}>
            <FileUpload onChange={setFiles}/>
            {
                files.length > 0 && (
                    <ul className={'flex-1 flex flex-col gap-5 border border-gray-200 rounded-lg p-4'}>
                        {
                            files.map((file, index) => (
                                <li key={file.name}
                                    className={'flex items-center gap-4 bg-gray-600 p-2 rounded font-light'}>
                                    <p>{`Filename: ${file.name}`}</p>
                                    <div className={'flex-1'}/>
                                    <p>{`Size: ${file.size} bytes`}</p>
                                    <p>{`Type: ${file.type}`}</p>
                                    <button className={'rounded py-1 px-2 bg-red-700 font-medium'}
                                            onClick={() => removeFile(index)}>Remove
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default FileUploadList;
