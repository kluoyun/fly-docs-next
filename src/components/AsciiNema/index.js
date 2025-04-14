import React, { useEffect, useRef } from "react";
import BrowserOnly from '@docusaurus/BrowserOnly';

import "asciinema-player/dist/bundle/asciinema-player.css";

// cols: number;
// rows: number;
// autoPlay: boolean;
// preload: boolean;
// loop: boolean;
// startAt: number | string;
// speed: number;
// idleTimeLimit: number;
// theme: string;
// poster: string;
// fit: string;
// fontSize: string;

const Asciinema = (props) => {
    return (
        <BrowserOnly
            fallback={
                <a href={props.url} title="Asciinema video player">
                    Asciinema cast
                </a>
            }
        >
            {() => {
                const AsciinemaContainer = require("./container.js").default;
                return <AsciinemaContainer {...props} />;
            }}

        </BrowserOnly>
    );
}

export default Asciinema;
