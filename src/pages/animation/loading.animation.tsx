import React, { useEffect, useState } from 'react'

import {
    useAppSelector,
} from '@/_store/configureStore'

import {
    loadingAnimationInterface,
} from './loading.animation.reducer'

const dotColors = {
    light: 'bg-blue-500',
    dark: 'bg-blue-300',
}

const LoadingAnimation = () => {

    const loadingAnimation = useAppSelector<loadingAnimationInterface>((state) => state.loadingAnimation)

    const isDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dotColor = isDark ? dotColors.dark : dotColors.light;

    // 点滅インデックス管理
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % 5);
        }, 200);
        return () => clearInterval(interval);
    }, []);

    if (!loadingAnimation.show) return null

    return (
        <div className={`fixed inset-0 w-screen h-screen flex items-center justify-center z-[9999] ${isDark ? 'bg-[#181a1b]' : 'bg-white'}`}>
            <div className="flex flex-col items-center w-full max-w-full">
                {/* 点滅するテキスト */}
                <div
                    className={`font-bold mb-10 text-[clamp(2rem,5vw,3.5rem)] tracking-wider ${isDark ? 'text-gray-100' : 'text-gray-900'}`}
                    style={{ animation: 'blink 1.2s infinite alternate' }}
                >
                    Loading....
                </div>
                {/* 丸5つのアニメーション */}
                <div className="flex gap-5 justify-center items-center">
                    {[0,1,2,3,4].map(i => (
                        <span
                            key={i}
                            className={`rounded-full ${dotColor}`}
                            style={{
                                width: 'clamp(1.1rem,2vw,1.8rem)',
                                height: 'clamp(1.1rem,2vw,1.8rem)',
                                opacity: activeIndex === i ? 1 : 0.3,
                                transition: 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)', // ease-out風
                                boxShadow: activeIndex === i
                                    ? '0 0 18px 6px rgba(59,130,246,0.45)' // アクティブ時に青系ぼかし
                                    : '0 0 8px 2px rgba(59,130,246,0.18)', // 非アクティブ時も少しぼかし
                                filter: 'blur(0.5px)', // さらに微妙なぼかし
                            }}
                        />
                    ))}
                </div>
                <style>{`
                    @keyframes blink {
                        0% { opacity: 0.2; }
                        80% { opacity: 1; }
                        100% { opacity: 0.7; }
                    }
                    @media (max-width: 600px) {
                        .font-bold.mb-10 {
                            font-size: clamp(1.2rem,8vw,2.2rem);
                        }
                    }
                `}</style>
            </div>
        </div>
    )
}

export default LoadingAnimation
