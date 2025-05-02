import React from 'react';
import { useAppDispatch, useAppSelector } from '@/_store/configureStore';

// import reducer
import {
    ShowContentInterface,
    ShowContentPropsInterface,
    initialState,
} from '@/_domain/_all/reducers/ShowContent';
import {
    ShowTextPropsInterface,
    ShowTextInterface,
    initialState as initialTextState,
} from '@/_domain/whisper/reducers/ShowText';
// import Hook

export const ShowText = (): React.JSX.Element => {
    const dispatch = useAppDispatch();
    // コンテンツ表示Reducer呼び出し
    const sc = useAppSelector<ShowContentInterface>(state => state.ShowContent)

    // テキスト表示Reducer呼び出し
    const st = useAppSelector<ShowTextInterface>(state => state.ShowText)

    const button_style_select = 'block px-4 py-2 text-gray-200 bg-gray-500 text-center hover:bg-gray-600 rounded'
    const button_style_unselect = 'block px-4 py-2 text-gray-200 text-center hover:bg-gray-600 rounded'

    if (sc.WhisperShowText === false) return <div></div>

    return (
        <div className='absolute top-0 left-0 w-svw h-full px-4 bg-gray-800 text-white'>
            <div className='flex h-2/3 py-20 px-10'>
                <div className="w-1/12">
                    <ul className="flex flex-col">
                        <li className="py-1">
                            <a
                                className={(st.showTab === 0) ? button_style_select : button_style_unselect}
                                href="#"
                                onClick={() => {
                                    dispatch({
                                        type    : 'ShowText/setShowTab',
                                        showTab : 0
                                    })
                                }}>
                                Convert
                            </a>
                        </li>
                        <li className="py-1">
                            <a
                                className={(st.showTab === 1) ? button_style_select : button_style_unselect}
                                href="#"
                                onClick={() => {
                                    dispatch({
                                        type    : 'ShowText/setShowTab',
                                        showTab : 1
                                    })
                                }}>
                                Adjust1
                            </a>
                        </li>
                        <li className="py-1">
                            <a
                                className={(st.showTab === 2) ? button_style_select : button_style_unselect}
                                href="#"
                                onClick={() => {
                                    dispatch({
                                        type    : 'ShowText/setShowTab',
                                        showTab : 2
                                    })
                                }}>
                                Adjust2
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='w-11/12 px-4'>
                    <div
                        className='p-10 ms-4 bg-gray-700 rounded-lg '
                        hidden={(st.showTab !== 0) ? true : false}
                    >
                        {st.convText.split('。').map((sentence, index, array) => (
                            <React.Fragment key={index}>
                                {sentence}
                                {index < array.length - 1 && (
                                    <>。<br /></>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <div
                        className='p-10 ms-4 bg-gray-700 rounded-lg '
                        hidden={(st.showTab !== 1) ? true : false}
                    >
                        {st.adjustText1.split('。').map((sentence, index, array) => (
                            <React.Fragment key={index}>
                                {sentence}
                                {index < array.length - 1 && (
                                    <>。<br /></>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <div
                        className='p-10 ms-4 bg-gray-700 rounded-lg '
                        hidden={(st.showTab !== 2) ? true : false}
                    >
                        {st.adjustText2.split('。').map((sentence, index, array) => (
                            <React.Fragment key={index}>
                                {sentence}
                                {index < array.length - 1 && (
                                    <>。<br /></>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

            </div>
            <div
                className='
                    w-[120px] py-2 px-4 ms-10 rounded-lg 
                    bg-blue-600 hover:bg-blue-700
                    text-white text-center font-bold
                    cursor-pointer whisper-show-text-button'
                onClick={() => {
                dispatch({
                    type    : 'ShowContent/whisperShowText',
                })
            }}>
                Close
            </div>
        </div>
    )
};

export default ShowText
