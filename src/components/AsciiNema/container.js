import React, { useEffect, useRef, useState } from "react";

import * as AsciinemaPlayer from "asciinema-player";


export default function AsciinemaContainer({
    url,
    options = {},
    width,
}) {
    const ref = useRef < HTMLDivElement > (null);
    const [isPlayerCreated, setIsPlayerCreated] = useState(false);

    useEffect(() => {
        if (!isPlayerCreated) {
            AsciinemaPlayer.create(url, ref.current, options);
            setIsPlayerCreated(true);
        }
    }, [url, options, isPlayerCreated]);

    return (
        <div style={{ textAlign: 'center' }}>
            <div ref={ref} className="not-prose ap-container" style={{ maxWidth: "90%", margin: "0 auto", width: width }} />
        </div>
    );
}
