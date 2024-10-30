/**
 * gets the most common value of `value` per `interval`.
 * Samples are not taken per function call; instead, the hook internally uses
 * a sample rate to take whatever value is at that time. So if `value` remains
 * the same for a while, it is more likely to be the resulting mode
 *
 * Pass null interval to "pause"
 */

import { useState } from 'react';
import useInterval from './useInterval';
import { MODE_VALUE_SAMPLE_RATE } from '@/constants/constants.json';

function findMode(arr: any[]) {
    const obj: { [k: string]: number } = {};
    let modeVal;
    let maxCount = 0;

    arr.forEach((i: any) => {
        if (obj[i]) {
            obj[i]++;
        } else {
            obj[i] = 1;
        }

        if (maxCount < obj[i]) {
            modeVal = i;
            maxCount = obj[i];
        }
    });

    return modeVal;
}

const useModeValueEveryInterval = (value: any, interval: number | null) => {
    const [lastSample, setLastSample] = useState<number>(Date.now());
    const [sampleArr, setSampleArr] = useState<any[]>([]);
    const [mode, setMode] = useState<any>(null);

    useInterval(() => {
        // Usually value is null, so don't include all the nulls in the sample!
        if (value) {
            setSampleArr([...sampleArr, value]);
        }

        if (interval && Date.now() - lastSample > interval) {
            setLastSample(Date.now());
            setMode(findMode(sampleArr));
            setSampleArr([]);
        }
    }, interval ? MODE_VALUE_SAMPLE_RATE : null); // If null is passed to useInterval it will be "paused"

    // return mode;
    return mode;
};

export default useModeValueEveryInterval;
