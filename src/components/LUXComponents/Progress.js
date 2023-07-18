import {useEffect} from "react";

import testStore from 'services/store/zustand/test';
import shallow from 'zustand/shallow';

import {LUXFCircularProgress} from "luna-rocket";

const Progress = () => {

    const [
        progressOpen, progressSize, progressText
    ] = testStore(state => [
        state.progressOpen, state.progressSize, state.progressText
    ],shallow);

    useEffect(() => { }, [progressOpen,progressSize,progressText]);

    return (
        <LUXFCircularProgress
            visible={progressOpen}
            size={progressSize}
            innerText={progressText}
            dimmedStyle={{background: '#fff', opacity: 0.0}}
        />
    )
}

export default Progress;