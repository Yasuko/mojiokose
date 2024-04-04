import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import reducer
import {
    ShowContentInterface,
    ShowContentPropsInterface,
    initialState,
} from '../../_domain/_all/reducers/ShowContent';
import {
    ShowTextPropsInterface,
    ShowTextInterface,
    initialState as initialTextState,
} from '../../_domain/whisper/reducers/ShowText';
// import Hook

export const ShowText = (): JSX.Element => {
    const dispatch = useDispatch();    
    // コンテンツ表示Reducer呼び出し
    const sc = useSelector((state: ShowContentPropsInterface): ShowContentInterface => {
        return state.ShowContent === undefined ? initialState : state.ShowContent;
    });
    // テキスト表示Reducer呼び出し
    const st = useSelector((state: ShowTextPropsInterface): ShowTextInterface => {
        return state.ShowText === undefined ? initialTextState : state.ShowText;
    });

    if (sc.WhisperShowText === false) return <div></div>

    return (
        <div className='container-fluid whisper-show-text'>
            <div className='whisper-show-text-content row'>
                <div className="col-1">
                    <ul className="whisper-title nav flex-column">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                href="#"
                                onClick={() => {
                                    dispatch({
                                        type    : 'ShowText/setShowTab',
                                        showTab     : 0
                                    })
                                }}>
                                Convert
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                href="#"
                                onClick={() => {
                                    dispatch({
                                        type    : 'ShowText/setShowTab',
                                        showTab     : 1
                                    })
                                }}>
                                Adjust1
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                href="#"
                                onClick={() => {
                                    dispatch({
                                        type    : 'ShowText/setShowTab',
                                        showTab     : 2
                                    })
                                }}>
                                Adjust2
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                href="#"
                                onClick={() => {
                                    dispatch({
                                        type    : 'ShowText/setShowTab',
                                        showTab     : 3
                                    })
                                }}>
                                Summary
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='col-11 container'>
                    <div
                        className='whisper-text'
                        hidden={(st.showTab !== 0) ? true : false}
                    >
                        { st.convText }
                    </div>
                    <div
                        className='whisper-text'
                        hidden={(st.showTab !== 1) ? true : false}
                    >
                        <pre>{ st.adjustText1 }</pre>
                    </div>
                    <div
                        className='whisper-text'
                        hidden={(st.showTab !== 2) ? true : false}
                    >
                        { st.adjustText2 }
                    </div>
                    <div
                        className='whisper-text'
                        hidden={(st.showTab !== 3) ? true : false}
                    >
                        <pre>{ st.summaryText }</pre>
                    </div>
                </div>

            </div>
            <div
                className='btn btn-xl btn-primary whisper-show-text-button'
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

export default ShowText;
