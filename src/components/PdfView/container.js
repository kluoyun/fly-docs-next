import React, { useState, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Worker, Viewer, SpecialZoomLevel, ProgressBar, ScrollMode } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { localeSwitcherPlugin } from '@react-pdf-viewer/locale-switcher';


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
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    const [mode, setMode] = useState < 'light' | 'dark' > (isDarkMode ? 'dark' : 'light');

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const localeSwitcherPluginInstance = localeSwitcherPlugin();

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

    const renderPage = (props) => (
        <>
            {props.canvasLayer.children}
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'center',
                    left: 0,
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                }}
            >
                <div
                    style={{
                        color: 'rgba(0, 0, 0, 0.2)',
                        fontSize: `${8 * props.scale}rem`,
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        transform: 'rotate(-45deg)',
                        userSelect: 'none',
                    }}
                >
                    -Mellow-
                </div>
            </div>
            {props.annotationLayer.children}
            {props.textLayer.children}
        </>
    );

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
                    localization={getLanguage}
                    plugins={[defaultLayoutPluginInstance, localeSwitcherPluginInstance]}
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
                    fileUrl={file}
                    initialPage={0} >
                </Viewer>
            </div>
        </Worker>
    );

}


export default PdfViewContainer
