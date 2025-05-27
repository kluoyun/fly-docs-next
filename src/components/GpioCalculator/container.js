import React, { useState, useEffect } from 'react';
import {
    Box, Container, TextField, Button, Snackbar, Divider, Chip, MenuItem, Typography,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Translate, { translate } from '@docusaurus/Translate';

const platforms = [
    { label: 'Allwinner H5/H3', value: 'allwinner_h5' },
    { label: 'Allwinner H618', value: 'allwinner_h618' },
    // { label: 'Rockchip', value: 'rockchip' },
];

const getTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    // light 模式的颜色定制
                    background: { default: '#fff', paper: '#f5f5f5' },
                    text: { primary: '#000' },
                }
                : {
                    // dark 模式的颜色定制
                    background: { default: '#121212', paper: '#333' },
                    text: { primary: '#fff' },
                }),
        },
    });

const parseGPIO = (platform, input) => {
    input = input.trim().toUpperCase();

    if (platform.startsWith('allwinner')) {
        // Format: PA0, PC7 ...
        let gpiochip = 0;
        const match = input.match(/^P([A-Z])(\d{1,2})$/);
        if (!match) return 'Invalid GPIO';
        const letter = match[1];
        const number = parseInt(match[2], 10);
        const port = letter.charCodeAt(0) - 'A'.charCodeAt(0);
        const gpio = port * 32 + number;
        if (platform === 'allwinner_h5') {
            if (gpio < 0 || gpio > 383)
                return 'Invalid GPIO';
            if (gpio <= 223) {
                gpiochip = 1;
            } else if (gpio >= 352 && gpio <= 383) {
                gpiochip = 0;
            } else {
                return 'Invalid GPIO';
            }
        } else if (platform === 'allwinner_h618') {
            if (gpio < 0 || gpio > 383)
                return 'Invalid GPIO';
            if (gpio <= 287) {
                gpiochip = 0;
            } else if (gpio >= 352 && gpio <= 383) {
                gpiochip = 1;
            } else {
                return 'Invalid GPIO';
            }
        }
        return `gpiochip${gpiochip}/gpio${gpio}`;
    }

    if (platform === 'rockchip') {
        // Format: GPIO1_A0
        const match = input.match(/^GPIO(\d+)_([A-D])(\d)$/);
        if (!match) return 'Invalid GPIO';
        const bank = parseInt(match[1], 10);
        const group = match[2].charCodeAt(0) - 'A'.charCodeAt(0);
        const index = parseInt(match[3], 10);
        const gpio = group * 8 + index;
        return `gpiochip${bank}/gpio${gpio}`;
    }

    return 'Unsupported platform';
};

const GPIOCalculatorContainer = () => {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    const [mode, setMode] = useState < 'light' | 'dark' > (isDarkMode ? 'dark' : 'light');
    const [platform, setPlatform] = useState('allwinner_h5');
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        const target = document.documentElement;
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (
                    mutation.type === 'attributes' &&
                    mutation.attributeName === 'data-theme'
                ) {
                    setMode(target.getAttribute('data-theme') || 'light');
                }
            });
        });
        observer.observe(target, { attributes: true });
        return () => observer.disconnect();
    }, []);

    const handleConvert = () => {
        const output = parseGPIO(platform, input);
        setResult(output);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(result);
        setSnackbarOpen(true);
    };

    return (
        <ThemeProvider theme={getTheme(mode)}>
            <Container maxWidth="sm" sx={{ mt: 6 }}>
                <Typography variant="h5" gutterBottom>
                    <Translate>GPIO 计算器</Translate>
                </Typography>

                <TextField
                    select
                    fullWidth
                    label={translate({ message: '选择平台' })}
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    margin="normal"
                >
                    {platforms.map((p) => (
                        <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>
                    ))}
                </TextField>

                <TextField
                    fullWidth
                    label={translate({ message: 'GPIO 输入 (如: ' }) + (platform.startsWith('allwinner') ? 'PA1' : 'GPIO0_A1') + ')'}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    margin="normal"
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleConvert}
                    startIcon={<CloudUploadIcon />}
                    sx={{ mt: 2 }}
                >
                    <Translate>转换</Translate>
                </Button>

                {result && (
                    <Box mt={4}>
                        <Divider>
                            <Chip label={translate({ message: '结果' })} />
                        </Divider>
                        <Box
                            mt={2}
                            p={2}
                            sx={{
                                backgroundColor: mode === 'dark' ? '#606060' : '#D0D0D0',
                                borderRadius: 2,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Box sx={{ wordBreak: 'break-all' }}>{result}</Box>
                            <Button onClick={handleCopy} startIcon={<ContentCopyIcon />}>
                                <Translate>复制</Translate>
                            </Button>
                        </Box>
                    </Box>
                )}

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={1500}
                    message={translate({ message: '复制成功' })}
                    onClose={() => setSnackbarOpen(false)}
                />
            </Container>
        </ThemeProvider>
    );
};

export default GPIOCalculatorContainer;
