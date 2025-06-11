import React from 'react';
import { useAppDispatch, useAppSelector } from '@/_store/configureStore';

// import reducer
import {
    ShowContentInterface,
} from '@/_domain/_all/reducers/ShowContent';
import {
    ShowTextInterface,
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
            <div className='flex h-full py-20 px-10'>
                <div className="w-1/12 h-full">
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
                                Shape
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
                                Digest
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='w-11/12 h-full px-4'>
                    <div
                        className='h-full p-10 ms-4 overflow-x-hidden overflow-y-scroll bg-gray-700 rounded-lg relative'
                        hidden={(st.showTab !== 0) ? true : false}
                    >
                        <button 
                            className='absolute top-2 right-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm'
                            onClick={() => {
                                navigator.clipboard.writeText(st.convText)
                                    .then(() => {
                                        alert('テキストをコピーしました');
                                    })
                                    .catch(err => {
                                        console.error('コピーに失敗しました: ', err);
                                    });
                            }}
                        >
                            コピー
                        </button>
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
                        className='p-10 ms-4 bg-gray-700 rounded-lg relative'
                        hidden={(st.showTab !== 1) ? true : false}
                    >
                        <button 
                            className='absolute top-2 right-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm'
                            onClick={() => {
                                navigator.clipboard.writeText(st.adjustText1)
                                    .then(() => {
                                        alert('テキストをコピーしました');
                                    })
                                    .catch(err => {
                                        console.error('コピーに失敗しました: ', err);
                                    });
                            }}
                        >
                            コピー
                        </button>
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
                        className='p-10 ms-4 bg-gray-700 rounded-lg relative'
                        hidden={(st.showTab !== 2) ? true : false}
                    >
                        <button 
                            className='absolute top-2 right-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm'
                            onClick={() => {
                                navigator.clipboard.writeText(st.adjustText2)
                                    .then(() => {
                                        alert('テキストをコピーしました');
                                    })
                                    .catch(err => {
                                        console.error('コピーに失敗しました: ', err);
                                    });
                            }}
                        >
                            コピー
                        </button>
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
                    absolute bottom-12 w-[120px] py-2 px-4 ms-10 rounded-lg 
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
