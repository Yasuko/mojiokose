import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import reducer
import {
    TokenFormPropsInterface,
    TokenFormInterface,
    initialState
} from '../../_domain/token/reducers/TokenForm'

// import Component

// import Hook

export const InputToken = (): React.JSX.Element => {
    const dispatch = useDispatch()
    const t = useSelector((state: TokenFormPropsInterface): TokenFormInterface => {
        return state.TokenForm === undefined ? initialState : state.TokenForm
    })
    return (
    <div className='container-fluid'>
        <div className="row">
            <div className="col-12 token-input">
                <div className="input-group input-group-lg align-middle">
                    <span
                        className="input-group-text"
                        id="inputGroup-sizing-lg">Token</span>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg" />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                        onClick={() => {
                            const token = document.querySelector('input') as HTMLInputElement
                            dispatch({
                                type    : 'TokenAction/setToken',
                                token   : token.value
                            })
                        }}>
                        Save Browser
                    </button>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-12 token-input token-caution">
                <span>
                    OpenAIAPIを呼び出すトークンを入力して下さい。<br></br>
                    入力されたトークンはブラウザ内で保存され<br></br>
                    外部に送信、保存される事はありません。
                </span>
            </div>
        </div>
    </div>
    )
}

export default InputToken