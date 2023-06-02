import {useMemo} from "react";

interface ProgressBarProps {
    value?: number;
}

const ProgressBar = function ({value = 0}: ProgressBarProps) {

    const progress = useMemo(() => Math.min(Math.max(value, 0), 100), [value]);

    return (
        <div className={'flex-1 flex items-baseline gap-4'}>
            <div className={'w-full bg-gray-400 rounded-full h-2.5'}>
                <div
                    className={`bg-blue-700 h-2.5 rounded-full ${progress !== 0 ? `w-[${progress}%]` : 'w-0'}`}/>
            </div>
            <p className={'w-8'}>{`${progress}%`}</p>
        </div>
    )
}

export default ProgressBar;
