import BrowserOnly from '@docusaurus/BrowserOnly';

const PdfView = (props) => {
    return (
        <BrowserOnly
            fallback={
                <div>Loading...</div>
            }
        >
            {() => {
                const PdfViewContainer = require("./container.js").default;
                return <PdfViewContainer {...props} />;
            }}

        </BrowserOnly>
    );
}
export default PdfView
