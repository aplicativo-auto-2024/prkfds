import React, { useState, useRef } from "react";

const Afinador = () => {
    const [loading, setLoading] = useState(true);
    const gridIframe = useRef(null);

    function handleIframe() {
        setLoading(false);
        const iframeItem = gridIframe.current;
        const anchors = iframeItem.contentWindow.getElementsByTagName("a");
    }

    return (
        <div>
            {loading ? <div /> : null}
            <iframe style={{ margin: '120px' }}
                title="Grid Generator"
                ref={gridIframe}
                src="./index.html"
                width="100%"
                height="1000px"
                frameBorder={0}
                onLoad={handleIframe}
            />
            {/* <Link to={routes.HOME}>Go Back</Link> */}
        </div>
    );
};

export default Afinador;