import { Worker, Viewer, SpecialZoomLevel, ProgressBar, ScrollMode } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { localeSwitcherPlugin } from '@react-pdf-viewer/locale-switcher';


// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Import the localization file
import zh_CN from '@react-pdf-viewer/locales/lib/zh_CN.json';

const PdfView = (props) => {
    const { file, width, height } = props;

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const localeSwitcherPluginInstance = localeSwitcherPlugin();

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
        <Worker workerUrl="/js/pdfjs-dist@3.4.120/pdf.worker.min.js">
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    height: '85vh',
                    width: '100%',
                }}>
                <Viewer
                    localization={zh_CN}
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
                        theme: 'auto'
                    }}
                    fileUrl={file}
                    initialPage={0} >
                </Viewer>
            </div>
        </Worker>
    );

}


export default PdfView