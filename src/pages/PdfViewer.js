import React from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { localeSwitcherPlugin } from '@react-pdf-viewer/locale-switcher';


// Import the styles
// import '@react-pdf-viewer/core/lib/styles/index.css';
// Import styles
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Import the localization file
// import zh_CN from '@react-pdf-viewer/locales/lib/zh_CN.json';

export default function PDFVIEWER() {
    const history = useHistory();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // 获取单个参数值
    const paramValue = searchParams.get("file");
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        setInitialTab: (doc) => Promise.resolve(0),
    });
    const localeSwitcherPluginInstance = localeSwitcherPlugin();

    const pageLayout = {
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
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100%',
            }}>

                <Viewer
                    localization={zh_CN}
                    plugins={[defaultLayoutPluginInstance, localeSwitcherPluginInstance]}
                    renderPage={renderPage}
                    pageLayout={pageLayout}
                    fileUrl={paramValue} >
                </Viewer>
            </div>

        </Worker>
    );
}