/**
 * @fileoverview Klipper Firmware parse v2.0.0
 *
 * Copyright (c) 2024 XiaokkuiZhao xiaok@zxkxz.cn
 * All rights reserved, especially commercial rights.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are NOT permitted (except for personal, non-commercial use)
 * unless granted explicit written permission by the copyright holder.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import React, { useState, useRef, useEffect } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/system';
import pako from 'pako';
import Translate, { translate } from '@docusaurus/Translate';

const blue = {
    50: '#F0F7FF',
    200: '#A5D8FF',
    400: '#3399FF',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};


const Root = styled('div')(
    ({ theme }) => `
    border-radius: 12px;
    border: 2px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[500]};
    overflow: hidden;

    table {
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 1rem;
      border-collapse: collapse;
      border-radius: 12px;
      border: 0px;
      width: 100%;
      margin: 0px;
    }
  
    td,
    th {
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[500]};
      text-align: left;
      padding: 10px;
    }
  
    @media screen and (max-width: 600px) {
        th, td {
            width: auto; /* 在小屏幕上自动调整宽度 */
        }
    }
    `,
);

const DropZoneBox = styled(Box)({
    p: 2,
    border: "4px dashed grey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    minHeight: "100px",
    minWidth: "300px",
    transition: "border-color 0.3s, background-color 0.3s",
    "&.highlight": {
        borderColor: "blue",
        backgroundColor: "lightblue",
        zIndex: 99999999,
    },
});

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


const KlipperFirmwareParse = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [snackbarState, setSnackbarState] = useState({
        snackbarisOpen: false,
        snackbarMsg: '',
    });
    const { snackbarisOpen, snackbarMsg } = snackbarState;
    const [isDragging, setIsDragging] = useState(false);
    const [klipperDict, setklipperDict] = useState(null);


    // data
    const [dict_infos, setDict_infos] = useState([]);
    const [init_pins, setInit_pins] = useState([]);
    const [spi_infos, setSpi_infos] = useState([]);
    const [i2c_infos, setI2c_infos] = useState([]);


    const snackbarOpen = (msg) => {
        setSnackbarState({ snackbarisOpen: true, snackbarMsg: msg });
    };

    const snackbarClose = () => {
        setSnackbarState({ snackbarisOpen: false, snackbarMsg: '' });
    };

    // hex to bytes
    const hex2bytes = (hexStr) => {
        const bytes = [];
        for (let i = 0; i < hexStr.length; i += 2) {
            bytes.push(parseInt(hexStr.slice(i, i + 2), 16));
        }
        return new Uint8Array(bytes);
    }

    // bytes to hex
    const bytes2hex = (bytes) => {
        return Array.prototype.map.call(bytes, function (byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
    }

    const parseBinFile = (file) => {
        try {
            const fileReader = new FileReader();
            fileReader.onload = async () => {
                const arrayBuffer = fileReader.result;
                const datas = new Uint8Array(arrayBuffer);
                // console.log(datas);
                var data_hex = bytes2hex(datas);
                // console.log(data_hex);

                var start_pos = data_hex.indexOf("78da9d");
                if (start_pos == -1) {
                    // console.log('指定的字节序列未在文件中找到。');
                    start_pos = data_hex.indexOf("78da");
                }
                if (start_pos == -1) {
                    if (data_hex.indexOf("43616e426f6f74") > 0) {
                        snackbarOpen(<Translate>不支持解析 CanBoot(Katapult) 固件</Translate>);
                        return;
                    }
                    snackbarOpen(<Translate>BIN文件解析错误,0x01</Translate>);
                    return;
                }
                var end_pos = data_hex.indexOf("020000000002", start_pos);
                if (end_pos == -1) {
                    // console.log('指定的字节序列未在文件中找到。');
                    end_pos = data_hex.indexOf("0000000000", start_pos);
                }
                if (end_pos == -1) {
                    snackbarOpen(<Translate>BIN文件解析错误,0x02</Translate>);
                    return;
                }

                data_hex = data_hex.slice(start_pos, end_pos);
                // console.log(data_hex);
                var data = hex2bytes(data_hex);
                try {
                    const decompressedData = pako.inflate(data);
                    const decodedData = new TextDecoder().decode(decompressedData); // 如果是文本数据
                    // console.log(decodedData);
                    setklipperDict(JSON.parse(decodedData));
                } catch (error) {
                    console.error('解压数据时发生错误:', error);
                    snackbarOpen(<Translate>数据处理失败,0x01</Translate>);
                }
            };
            fileReader.readAsArrayBuffer(file);
        } catch (e) {
            console.error(e);
            snackbarOpen(<Translate>Bin文件解析错误,0x0f</Translate>);
        }
    }

    const parseUF2File = (file) => {
        try {
            const fileReader = new FileReader();
            fileReader.onload = async () => {
                const arrayBuffer = fileReader.result;
                const datas = new Uint8Array(arrayBuffer);
                var data_hex = bytes2hex(datas);
                let regex = /00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000/g;
                data_hex = data_hex.replace(regex, "");

                // console.log(data_hex);
                let pattern = /306fb10a5546320a57515d9e.*?56ff8be4/g;
                data_hex = data_hex.replace(pattern, '');
                // console.log(data_hex);
                var start_pos = data_hex.indexOf("78da9d");
                if (start_pos == -1) {
                    // console.log('指定的字节序列未在文件中找到。');
                    start_pos = data_hex.indexOf("78da");
                }
                if (start_pos == -1) {
                    if (data_hex.indexOf("43616e426f6f74") > 0) {
                        snackbarOpen(<Translate>不支持解析 CanBoot(Katapult) 固件</Translate>);
                        return;
                    }
                    snackbarOpen(<Translate>UF2文件解析错误,0x01</Translate>);
                    return;
                }
                var end_pos = data_hex.indexOf("020000000002", start_pos);
                if (end_pos == -1) {
                    // console.log('指定的字节序列未在文件中找到。');
                    end_pos = data_hex.indexOf("0000000000", start_pos);
                }
                if (end_pos == -1) {
                    snackbarOpen(<Translate>UF2文件解析错误,0x02</Translate>);
                    return;
                }
                data_hex = data_hex.slice(start_pos, end_pos);
                // console.log(data_hex);
                var data = hex2bytes(data_hex);
                try {
                    const decompressedData = pako.inflate(data);
                    const decodedData = new TextDecoder().decode(decompressedData); // 如果是文本数据
                    // console.log(decodedData);
                    setklipperDict(JSON.parse(decodedData));
                } catch (error) {
                    console.error('解压数据时发生错误:', error);
                    snackbarOpen(<Translate>数据处理失败,0x01</Translate>);
                }
            };
            fileReader.readAsArrayBuffer(file);
        } catch (e) {
            console.error(e);
            snackbarOpen(<Translate>UF2文件解析错误,0x0f</Translate>);
        }
    }

    const parseDictFile = (file) => {
        try {
            const fileReader = new FileReader();
            fileReader.onload = async () => {
                const arrayBuffer = fileReader.result;
                const datas = new Uint8Array(arrayBuffer);
                const decodedData = new TextDecoder().decode(datas);
                // console.log(decodedData);
                setklipperDict(JSON.parse(decodedData));
            };
            fileReader.readAsArrayBuffer(file);
        } catch (e) {
            console.error(e);
            snackbarOpen(<Translate>DICT文件解析错误,0x0f</Translate>);
        }
    }

    const parseElfFile = (file) => {
        parseBinFile(file);
    }

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleFileChange = (event) => {
        if (event.target.files.lenght > 1) {
            snackbarOpen(<Translate>不支持多文件解析，请选择单个文件</Translate>);
            return;
        } else if (event.target.files.lenght < 1) {
            snackbarOpen(<Translate>请选择文件</Translate>);
            return;
        }
        const file = event.target.files[0];
        setSelectedFile(file);
    };


    useEffect(() => {
        if (selectedFile == null || selectedFile == undefined || !selectedFile) {
            return;
        }
        setklipperDict(null);
        // data
        setDict_infos([]);
        setInit_pins([]);
        setSpi_infos([]);
        setI2c_infos([]);

        // 文件后缀验证
        const fileExtension = selectedFile.name.toLowerCase();
        if (!fileExtension.endsWith('.bin') && !fileExtension.endsWith('.uf2') && !fileExtension.endsWith('.dict') && !fileExtension.endsWith('.elf')) {
            snackbarOpen(<Translate>文件格式错误，请选择.bin/.uf2/.dict/.elf文件</Translate>)
            return;
        }

        // 文件不能大于2M
        if (!fileExtension.endsWith('.elf') && selectedFile.size > 2 * 1024 * 1024) {
            snackbarOpen(<Translate>文件不能大于2M</Translate>);
            return;
        } else if (fileExtension.endsWith('.elf') && selectedFile.size > 5 * 1024 * 1024) {
            snackbarOpen(<Translate>elf文件不能大于5M</Translate>);
            return;
        }
        snackbarOpen(<Translate>文件解析中，请稍后</Translate>);
        // console.log(selectedFile);

        if (fileExtension.endsWith('.bin')) {
            parseBinFile(selectedFile);
        } else if (fileExtension.endsWith('.uf2')) {
            parseUF2File(selectedFile);
        } else if (fileExtension.endsWith('.dict')) {
            parseDictFile(selectedFile);
        } else if (fileExtension.endsWith('.elf')) {
            parseElfFile(selectedFile);
        } else {
            snackbarOpen(<Translate>文件解析错误，请选择正确的文件</Translate>);
        }
    }, [selectedFile]);

    useEffect(() => {
        if (!klipperDict || klipperDict == null || klipperDict == undefined || klipperDict == {}) {
            return;
        }
        if (!klipperDict.hasOwnProperty('app') || !klipperDict.hasOwnProperty('version')) {
            snackbarOpen(<Translate>文件解析错误，缺少必要字段</Translate>);
            return;
        }
        // console.log(klipperDict);

        if (klipperDict.hasOwnProperty('app')) {
            setDict_infos(prevDictInfos => [...prevDictInfos,
            {
                name: <Translate>APP程序</Translate>,
                info: klipperDict.app
            }
            ]);
        }

        if (klipperDict.hasOwnProperty('license')) {
            setDict_infos(prevDictInfos => [...prevDictInfos,
            {
                name: <Translate>许可协议</Translate>,
                info: klipperDict.license
            }
            ]);
        }

        if (klipperDict.hasOwnProperty('version')) {
            const matchResult = klipperDict.version.match(/-g([0-9a-f]{8})/i);
            var commitHash = '';
            if (matchResult && matchResult[1] && klipperDict.version.indexOf('dirty') < 0) {
                commitHash = matchResult[1]; // commitHash将等于'b98375b3'
                // console.log(commitHash);
            }
            setDict_infos(prevDictInfos => [...prevDictInfos,
            {
                name: <Translate>固件版本</Translate>,
                info: commitHash ? klipperDict.version.replace(commitHash, "<a href='https://github.com/Klipper3d/klipper/commit/" + commitHash + "' target='_blank'>" + commitHash + "</a>") : klipperDict.version
            }
            ]);
        }

        if (klipperDict.hasOwnProperty('build_versions ')) {
            setDict_infos(prevDictInfos => [...prevDictInfos,
            {
                name: <Translate>工具链版本</Translate>,
                info: klipperDict.build_versions
            }
            ]);
        }

        if (klipperDict.hasOwnProperty('config')) {
            const config = klipperDict.config;
            if (config.hasOwnProperty('MCU')) {
                setDict_infos(prevDictInfos => [...prevDictInfos,
                {
                    name: <Translate>主控型号</Translate>,
                    info: config.MCU.toUpperCase()
                }
                ]);
            }

            if (config.hasOwnProperty('CLOCK_FREQ')) {
                setDict_infos(prevDictInfos => [...prevDictInfos,
                {
                    name: <Translate>主控频率</Translate>,
                    info: `${(config.CLOCK_FREQ / 1000000)}MHz`
                }
                ]);
            }

            if (config.hasOwnProperty('RESERVE_PINS_USB')) {
                setDict_infos(prevDictInfos => [...prevDictInfos,
                {
                    name: <Translate>USB引脚</Translate>,
                    info: `DM:${config.RESERVE_PINS_USB.split(',')[0]},  DP:${config.RESERVE_PINS_USB.split(',')[1]}`
                }
                ]);
            }

            if (config.hasOwnProperty('RESERVE_PINS_CAN')) {
                setDict_infos(prevDictInfos => [...prevDictInfos,
                {
                    name: <Translate>CAN引脚</Translate>,
                    info: `RX:${config.RESERVE_PINS_CAN.split(',')[0]},  TX:${config.RESERVE_PINS_CAN.split(',')[1]}`
                }
                ]);
            }

            if (config.hasOwnProperty('CANBUS_FREQUENCY')) {
                setDict_infos(prevDictInfos => [...prevDictInfos,
                {
                    name: <Translate>CAN速率</Translate>,
                    info: `${config.CANBUS_FREQUENCY} Kbps`
                }
                ]);
            }

            if (config.hasOwnProperty('RESERVE_PINS_serial')) {
                setDict_infos(prevDictInfos => [...prevDictInfos,
                {
                    name: <Translate>UART引脚</Translate>,
                    info: `RX:${config.RESERVE_PINS_serial.split(',')[0]},  TX:${config.RESERVE_PINS_serial.split(',')[1]}`
                }
                ]);
            }

            if (config.hasOwnProperty('SERIAL_BAUD')) {
                setDict_infos(prevDictInfos => [...prevDictInfos,
                {
                    name: <Translate>UART速率</Translate>,
                    info: `${config.SERIAL_BAUD} bps`
                }
                ]);
            }

            if (config.hasOwnProperty("RESERVE_PINS_USB") && !config.hasOwnProperty("RESERVE_PINS_serial") && !config.hasOwnProperty("RESERVE_PINS_CAN")) {
                setDict_infos(prevDictInfos => [...prevDictInfos,
                {
                    name: <Translate>通信方式</Translate>, info: <Translate>该固件使用USB与上位机通信</Translate>
                }
                ]);
            } else if (config.hasOwnProperty("RESERVE_PINS_serial") || (config.hasOwnProperty('SERIAL_BAUD') && !config.hasOwnProperty("RESERVE_PINS_USB") && !config.hasOwnProperty("RESERVE_PINS_CAN"))) {
                setDict_infos(prevDictInfos => [...prevDictInfos,
                {
                    name: <Translate>通信方式</Translate>, info: <Translate>该固件使用串口UART与上位机通信</Translate>
                }
                ]);
            } else if (!config.hasOwnProperty("RESERVE_PINS_USB") && !config.hasOwnProperty("RESERVE_PINS_serial") && config.hasOwnProperty("RESERVE_PINS_CAN")) {
                setDict_infos(prevDictInfos => [...prevDictInfos,
                {
                    name: <Translate>通信方式</Translate>, info: <Translate>该固件使用CANBus与上位机通信</Translate>
                }
                ]);
            } else if (config.hasOwnProperty("RESERVE_PINS_USB") && !config.hasOwnProperty("RESERVE_PINS_serial") && config.hasOwnProperty("RESERVE_PINS_CAN")) {
                if (config.hasOwnProperty("CANBUS_BRIDGE") && config.CANBUS_BRIDGE == "1") {
                    setDict_infos(prevDictInfos => [...prevDictInfos,
                    {
                        name: <Translate>通信方式</Translate>, info: <Translate>该固件使用USB桥接CANBus与上位机通信</Translate>
                    }
                    ]);
                }
            }

            if (config.hasOwnProperty("INITIAL_PINS")) {
                var pins = config.INITIAL_PINS.split(",");
                pins?.forEach(pin => {
                    setInit_pins(prevDictInfos => [...prevDictInfos,
                    {
                        pin: pin.startsWith("!") ? pin.substring(1) : pin, state: pin.startsWith("!") ? "LOW" : "HIGH"
                    }
                    ]);
                });
            }

            Object.entries(config).map(([k, v]) => {
                if (k.startsWith("BUS_PINS_spi")) {
                    var bus = k.replace("BUS_PINS_", "");
                    var pin_info = v.split(',');
                    setSpi_infos(prevDictInfos => [...prevDictInfos,
                    {
                        bus: bus, miso: pin_info[0], mosi: pin_info[1], sck: pin_info[2]
                    }
                    ]);
                } else if (k.startsWith("BUS_PINS_i2c")) {
                    var bus = k.replace("BUS_PINS_", "");
                    var pin_info = v.split(',');
                    setI2c_infos(prevDictInfos => [...prevDictInfos,
                    {
                        bus: bus, sda: pin_info[0], scl: pin_info[1]
                    }
                    ]);
                }
            });
        }

        snackbarOpen(<Translate>固件解析完成</Translate>);
    }, [klipperDict]);

    return (
        <>
            <Container>
                <DropZoneBox component="section"
                    className={isDragging ? 'highlight' : ''}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                >
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload file
                        <VisuallyHiddenInput type="file" accept=".bin,.uf2,.dict,.elf" onChange={handleFileChange} ref={fileInputRef} />
                    </Button>
                </DropZoneBox>
            </Container>

            <br />
            <Divider variant="middle" />
            <br />

            <Box width={'100%'} component="section" sx={{ p: 2, }}>

                {dict_infos.length > 0 && (
                    <Root>
                        <table style={{ tableLayout: 'fixed', width: '100%', minWidth: '100%' }} aria-label="custom pagination table">
                            <caption><Translate>固件配置</Translate></caption>
                            <thead style={{ maxWidth: '100%', width: '100%' }}>
                                <tr>
                                    <th style={{ width: 'auto', minWidth: '100px' }}>Name</th>
                                    <th style={{ width: '100%' }} align="right">Info</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dict_infos.map((row) => (
                                    <tr key={row.name}>
                                        <td >{row.name}</td>
                                        <td dangerouslySetInnerHTML={{ __html: row.info }}>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Root>
                )}

                {init_pins.length > 0 && (
                    <>
                        <br />
                        <Root>
                            <table style={{ tableLayout: 'fixed', width: '100%', minWidth: '100%' }} aria-label="custom pagination table">
                                <caption><Translate>初始引脚配置</Translate></caption>
                                <thead style={{ maxWidth: '100%', width: '100%' }}>
                                    <tr>
                                        <th style={{ width: 'auto', minWidth: '100px' }}>Pin</th>
                                        <th style={{ width: '100%' }} align="right">State</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {init_pins.map((row) => (
                                        <tr key={row.pin}>
                                            <td >{row.pin}</td>
                                            <td >
                                                {row.state === "HIGH" ? (
                                                    <Chip label={row.state} size="small" color="success" />
                                                ) : (
                                                    <Chip label={row.state} size="small" color="primary" />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Root>
                    </>
                )}

                {spi_infos.length > 0 && (
                    <>
                        <br />
                        <Root>
                            <table style={{ tableLayout: 'fixed', width: '100%', minWidth: '100%' }} aria-label="custom pagination table">
                                <caption><Translate>硬件SPI通道配置</Translate></caption>
                                <thead style={{ maxWidth: '100%', width: '100%' }}>
                                    <tr>
                                        <th style={{ width: 'auto', minWidth: '100px' }}>Bus</th>
                                        <th style={{ width: '30%' }} align="right">Miso</th>
                                        <th style={{ width: '30%' }} align="right">Mosi</th>
                                        <th style={{ width: '30%' }} align="right">Sck</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {spi_infos.map((row) => (
                                        <tr key={row.bus}>
                                            <td >{row.bus}</td>
                                            <td >{row.miso}</td>
                                            <td >{row.mosi}</td>
                                            <td >{row.sck}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Root>
                    </>
                )}

                {i2c_infos.length > 0 && (
                    <>
                        <br />
                        <Root>
                            <table style={{ tableLayout: 'fixed', width: '100%', minWidth: '100%' }} aria-label="custom pagination table">
                                <caption><Translate>硬件I2C通道配置</Translate></caption>
                                <thead style={{ maxWidth: '100%', width: '100%' }}>
                                    <tr>
                                        <th style={{ width: 'auto', minWidth: '100px' }}>Bus</th>
                                        <th style={{ width: '50%' }} align="right">Sda</th>
                                        <th style={{ width: '50%' }} align="right">Scl</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {i2c_infos.map((row) => (
                                        <tr key={row.bus}>
                                            <td >{row.bus}</td>
                                            <td >{row.sda}</td>
                                            <td >{row.scl}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Root>
                    </>
                )}
            </Box>


            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                // autoHideDuration={1500}
                open={snackbarisOpen}
                message={snackbarMsg}
            />
        </>


    );
}
export default KlipperFirmwareParse
