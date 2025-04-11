import React, { useEffect, useRef } from "react";

import * as AsciinemaPlayer from "asciinema-player";


export default function AsciinemaContainer({
    url,
    options = {},
    width,
}) {
    const ref = useRef < HTMLDivElement > (null);

    useEffect(() => {
        AsciinemaPlayer.create(url, ref.current, options);
    }, [url, options]);

    return (
        <div style={{ textAlign: 'center' }}>
            <div ref={ref} className="not-prose ap-container" style={{ maxWidth: "90%", margin: "0 auto", width: width }} />
        </div>
    );
}
