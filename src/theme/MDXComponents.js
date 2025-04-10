import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import Button from "@mui/material/Button";

import ImageView from '@site/src/components/ImageView';
import PdfView from '@site/src/components/PdfView';
import AsciiNema from '@site/src/components/AsciiNema';

export default {
    // Re-use the default mapping
    ...MDXComponents,

    Tabs,
    TabItem,
    Button,

    ImageView,
    PdfView,

    AsciiNema,
};
