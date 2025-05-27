import BrowserOnly from '@docusaurus/BrowserOnly';

const GPIOCalculator = () => {
    return (
        <BrowserOnly
            fallback={
                <div>Loading...</div>
            }
        >
            {() => {
                const GPIOCalculatorContainer = require("./container.js").default;
                return <GPIOCalculatorContainer/>;
            }}

        </BrowserOnly>
    );
}

export default GPIOCalculator;
