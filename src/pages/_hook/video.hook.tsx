import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// import helper
import {
    VideoHelper
} from '../../_domain/whisper/helper/video.helper';

interface VideoInterface
{
    dispatch    : string,
}

const VideoHook = ((s: VideoInterface): any => {
    const dispatch = useDispatch();
    useEffect(() => {
        VideoHelper.call()
            .setCallback(
                async (
                    data: {extension: string, time: number, name: string, move: Blob},
                ): Promise<void> => {
                    dispatch({
                        type    : 'VideoAction/hook',
                        task    : VideoHelper.call().getTask(),
                        data    : {
                            extension   : data.extension,
                            time        : data.time,
                            name        : data.name,
                            move        : await VideoHelper.call()
                                            .convBlobToBase64(data.move),
                        }
                    });
                }
            );
    }, []);

    return { message: false };
})

export default VideoHook;
