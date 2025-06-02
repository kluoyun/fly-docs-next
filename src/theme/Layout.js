import React, { useEffect, useState, useMemo } from 'react';
import Layout from '@theme-original/Layout';

const GlobalWatermark = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // 初始化主题
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        setTheme(currentTheme);

        // 监听 data-theme 属性变化
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    const newTheme = document.documentElement.getAttribute('data-theme');
                    setTheme(newTheme);
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, []);

    const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const height = typeof window !== 'undefined' ? window.innerHeight : 1080;

    const cols = Math.ceil(width / 300);
    const rows = Math.ceil(height / 200);

    const color = theme === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.05)';

    const elements = useMemo(() => {
        const els = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                els.push(
                    <div
                        key={`${row}-${col}`}
                        style={{
                            position: 'absolute',
                            top: `${row * 200}px`,
                            left: `${col * 400}px`,
                            color,
                            fontFamily: '"Arial Black", "PingFang SC", "Microsoft YaHei", sans-serif',
                            fontSize: '46px',
                            fontWeight: 900,
                            letterSpacing: '0px',
                            // textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                            transform: 'rotate(-30deg)',
                            userSelect: 'none',
                            pointerEvents: 'none',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        - 3D Mellow -
                    </div>
                );
            }
        }
        return els;
    }, [rows, cols, color]);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 999999999,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}
        >
            {elements}
        </div>
    );
};

export default function LayoutWrapper(props) {
    const nowatermark = props.nowatermark ?? false;
    return (
        <>
            <Layout {...props} />
            {!nowatermark && <GlobalWatermark />}
        </>
    );
}
