import React, { useState, useEffect, useRef } from "react";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { ChevronUp, ChevronDown } from "lucide-react";
import ReactPlayer from 'react-player'

const Player = (props) => {
    const { url, width = '100%', height = 'auto', align = 'center' } = props;
    const [collapsed, setCollapsed] = useState(false);
    const [maxHeight, setMaxHeight] = useState('none');
    const bodyRef = useRef(null);

    let canPlay = false;
    let embedUrl = null;
    let bvidMatch = null;
    let aidMatch = null;
    let bvid = null;
    let aid = null;
    if (url && url != '' && url != undefined) {
        canPlay = ReactPlayer.canPlay(url);
        // 提取 bvid 或 aid，且不能同时存在
        bvidMatch = url.match(/bilibili\.com\/video\/(BV\w+)/i);
        aidMatch = url.match(/bilibili\.com\/video\/(?:av)?(\d+)/i);
        bvid = bvidMatch?.[1];
        aid = aidMatch?.[1];
        // 确保 aid 和 bvid 不同时存在
        let biliPlayerPam = '&poster=true&autoplay=false&muted=true&danmaku=false';
        if (bvid && !aidMatch) {
            embedUrl = `https://player.bilibili.com/player.html?bvid=${bvid}${biliPlayerPam}`;
        } else if (aid && !bvidMatch) {
            embedUrl = `https://player.bilibili.com/player.html?aid=${aid}${biliPlayerPam}`;
        }
    }

    useEffect(() => {
        if (!bodyRef.current) return;
        if (collapsed) {
            setMaxHeight('0px');
        } else {
            const scrollH = bodyRef.current.scrollHeight;
            setMaxHeight(scrollH + 'px');
        }
    }, [collapsed, canPlay, embedUrl]);

    return (
        <div className="player-card-wrapper" style={{ width, height, margin: '0 auto' }}>
            {/* MACOS风格标题栏 */}
            <div className="player-card-header" style={{

                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '6px 12px',
                backgroundColor: 'rgba(0,0,0,0.05)',
            }}
                onClick={() => collapsed ? setCollapsed(!collapsed) : null}>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                </div>

                <div style={{ flex: 1, textAlign: 'center' }}>
                    {collapsed && (
                        <span className="collapsed-hint" style={{ fontSize: '0.9rem', color: 'var(--ifm-color-primary)' }}>
                            🎬 点击展开视频播放器
                        </span>
                    )}
                </div>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    title={collapsed ? "展开" : "折叠"}
                >
                    {collapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                </button>
            </div>

            {/* 带动画的内容区域 */}
            <div
                style={{
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease',
                    maxHeight,
                }}
            >
                <div
                    className="player-card-body"
                    ref={bodyRef}
                    style={{
                        aspectRatio: canPlay || embedUrl ? '16/9' : '16/4',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'var(--ifm-background-color)', // 支持主题切换
                    }}
                >
                    {canPlay ? (
                        <ReactPlayer
                            pip
                            controls
                            muted
                            style={{
                                width: '100%',
                                height: '100%',
                                border: "none",
                                display: "block",
                            }}
                            src={url}
                            onError={(e) => console.log("onError", e)}
                        />
                    ) : embedUrl ? (
                        <iframe
                            src={embedUrl}
                            style={{
                                width: '100%',
                                height: '100%',
                                border: "none",
                            }}
                            allowFullScreen
                        />
                    ) : (
                        <div className="player-fallback-card" style={{
                            width: '100%',
                            height: '100%',
                            textAlign: "center",
                            padding: "1rem",
                            boxSizing: "border-box",
                        }}>
                            <div style={{ fontSize: "1.1rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                                无法播放该视频
                            </div>
                            <div style={{ fontSize: "0.9rem", wordBreak: "break-word", color: "#666" }}>
                                原始地址：<br />
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        color: "var(--ifm-color-primary)",
                                        textDecoration: "underline",
                                        fontSize: "0.85rem",
                                    }}
                                >
                                    {url}
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AutoPlayer = (props) => {
    const { i18n } = useDocusaurusContext();
    const currentLocale = i18n.currentLocale;  // 当前语言代码，例如 "en"、"zh" 等
    const { url_zh, url_other, width = '100%', height = 'auto', align = 'center' } = props;
    let video_url = url_zh;
    
    if (currentLocale != 'zh-Hans') {
        video_url = url_other;
    }
    return (
        <div>
            <Player url={video_url} width={width} height={height} align={align}></Player>
        </div>
    );
};

export default Player;
export { AutoPlayer };
