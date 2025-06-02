import React, { useState, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Worker, Viewer, SpecialZoomLevel, ProgressBar, ScrollMode } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';


// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Import the localization file
import zh_CN from './locales/zh_CN.json';
import en_US from './locales/en_US.json';
import jp_JP from './locales/jp_JP.json';
import fr_FR from './locales/fr_FR.json';
import ru_RU from './locales/ru_RU.json';
import ko_KR from './locales/ko_KR.json';

const getLanguage = () => {
    const { i18n } = useDocusaurusContext();
    const currentLocale = i18n.currentLocale;
    switch (currentLocale) {
        case 'zh-Hans':
            return zh_CN;
        case 'en':
            return en_US;
        case 'ja':
            return jp_JP;
        case 'fr':
            return fr_FR;
        case 'ru':
            return ru_RU;
        case 'ko':
            return ko_KR;
        default:
            return en_US;
    }
}

const PdfViewContainer = (props) => {
    const { file, width, height } = props;
    const { setColorMode } = useColorMode();
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    const [mode, setMode] = useState < 'light' | 'dark' > (isDarkMode ? 'dark' : 'light');

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        const target = document.documentElement;
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (
                    mutation.type === 'attributes' &&
                    mutation.attributeName === 'data-theme'
                ) {
                    setMode(target.getAttribute('data-theme') || 'light');
                }
            });
        });
        observer.observe(target, { attributes: true });
        return () => observer.disconnect();
    }, []);

    const handleSwitchTheme = (theme) => {
        if (theme === 'light' || theme === 'dark') {
            setColorMode(theme);
        }
    };

    const pageLayout = {
        // buildPageStyles: () => ({
        //     alignItems: 'center',
        //     display: 'flex',
        //     justifyContent: 'center',
        // }),
        transformSize: ({ size }) => ({
            height: size.height,
            width: size.width,
        }),
    };

    const renderPage = (props) => {
        const width = props.width;
        const height = props.height;
        const fontSizeRem = 2 * props.scale; // 字体大小跟缩放相关
        const fontSizePx = fontSizeRem * 16; // rem转px，16是默认字体大小

        // 基础水印大小
        const baseWidth = fontSizePx * 7;
        const baseHeight = fontSizePx * 2.5;

        // 加间距倍数
        const spacingFactor = 2.3;

        // 计算铺满页面的行列数，带间距
        const watermarkWidth = baseWidth * spacingFactor;
        const watermarkHeight = baseHeight * spacingFactor;

        const cols = Math.ceil(width / watermarkWidth);
        const rows = Math.ceil(height / watermarkHeight);

        const top = 50;
        const watermarks = [];

        const text = 'mellow.klipper.cn';

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * watermarkWidth;
                const y = row * watermarkHeight;

                watermarks.push(
                    <div
                        key={`watermark-${row}-${col}`}
                        style={{
                            position: 'absolute',
                            top: y + top,
                            left: x,
                            transform: 'rotate(-45deg)',
                            fontSize: `${fontSizeRem}rem`,
                            fontWeight: 'bold',
                            userSelect: 'none',
                            pointerEvents: 'none',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {/* 阴影层 */}
                        <div
                            style={{
                                position: 'absolute',
                                color: 'rgba(0, 0, 0, 0.2)',
                                left: 1,
                                top: top + 1,
                            }}
                        >
                            {text}
                        </div>
                        {/* 亮色前景 */}
                        <div
                            style={{
                                position: 'absolute',
                                color: 'rgba(255, 255, 255, 0.25)',
                                left: 0,
                                top: top,
                            }}
                        >
                            {text}
                        </div>
                    </div>
                );
            }
        }

        return (
            <>
                {props.canvasLayer.children}
                {watermarks}
                {props.annotationLayer.children}
                {props.textLayer.children}
            </>
        );
    };

    return (
        <Worker workerUrl="/js/pdfjs-dist@3.11.174/pdf.worker.min.js">
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    height: '85vh',
                    width: '100%',
                }}>
                <Viewer
                    localization={getLanguage()}
                    plugins={[defaultLayoutPluginInstance]}
                    renderPage={renderPage}
                    pageLayout={pageLayout}
                    // defaultScale={SpecialZoomLevel.PageWidth}
                    scrollMode={ScrollMode.Vertical}
                    renderLoader={(percentages) => (
                        <div style={{ width: '240px' }}>
                            <ProgressBar progress={Math.round(percentages)} />
                        </div>
                    )}
                    theme={{
                        theme: mode
                    }}
                    onSwitchTheme={handleSwitchTheme}
                    fileUrl={file}
                    initialPage={0} >
                </Viewer>
            </div>
        </Worker>
    );

}


export default PdfViewContainer
