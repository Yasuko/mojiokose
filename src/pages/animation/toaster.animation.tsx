import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from '@/_store/configureStore';
import { toasterAnimationInterface } from './toaster.animation.reducer';

const Toaster = (): React.JSX.Element => {

    const dispatch = useAppDispatch();
    const ta = useAppSelector<toasterAnimationInterface>((state) => state.toasterAnimation);
    const [isExiting, setIsExiting] = useState(false);

    // モードに応じたスタイル設定を取得する関数
    const getStylesByMode = () => {
        switch (ta.mode) {
        case 'success':
            return 'bg-green-100 border-green-500 text-green-800';
        case 'warn':
            return 'bg-yellow-100 border-yellow-500 text-yellow-800';
        case 'error':
            return 'bg-red-100 border-red-500 text-red-800';
        case 'info':
        default:
            return 'bg-blue-100 border-blue-500 text-blue-800';
        }
    };

    // モードに応じたアイコンを取得する関数
    const getIconByMode = () => {
        switch (ta.mode) {
        case 'success':
            return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            );
        case 'warn':
            return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            );
        case 'error':
            return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            );
        case 'info':
        default:
            return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            );
        }
    };

    useEffect(() => {
        if (ta.show) {
            // 表示後2秒で自動的に閉じる
            const timer = setTimeout(() => {
                setIsExiting(false);
                dispatch({
                    type: 'toasterAnimation/RESET'
                });
            }, 2000);
            
            // コンポーネントがアンマウントされたらタイマーをクリア
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        // アニメーション完了を待ってから実際に閉じる
        setTimeout(() => {
            dispatch({
                type: 'toasterAnimation/RESET'
            });
            setIsExiting(false);
        }, 300); // アニメーションの長さに合わせる
    };

    if (!ta.show && !isExiting) return <></>;

    const modeStyles = getStylesByMode();
    const modeIcon = getIconByMode();

    return (
        <div className="fixed top-4 right-4 z-50">
        <div
            className={`
            ${modeStyles} border-l-4 rounded-lg shadow-lg p-4 max-w-xs flex items-center justify-between
            transform transition-all duration-300 ease-in-out
            ${isExiting ? "translate-y-[-100%] opacity-0" : "translate-y-0 opacity-100"}
            `}
        >
            <div className="flex items-center">
                <div className="flex-shrink-0 mr-3">
                    {modeIcon}
                </div>
                <p>{ta.text}</p>
            </div>
            <button
                onClick={handleClose}
                className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
            <span className="sr-only">閉じる</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
            </svg>
            </button>
        </div>
        </div>
    );
};

export default Toaster
