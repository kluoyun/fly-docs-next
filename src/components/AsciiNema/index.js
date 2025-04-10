import React, { useEffect, useRef } from "react";
import * as AsciinemaPlayer from "asciinema-player";
import "asciinema-player/dist/bundle/asciinema-player.css";
// import "./styles.css";

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
    if (props.url === undefined || props.url === "") {
        return (
            <div>
                <p>
                    错误，AsciiNema URL无效
                </p>
            </div>
        );
    }
    const ref = useRef < HTMLDivElement > (null);

    useEffect(() => {
        AsciinemaPlayer.create(props.url, ref.current, props.options);
    }, [props.url, props.options]);

    return (

        <div ref={ref} className="not-prose ap-container" />

    );
}

export default Asciinema;
