"use strict";(self.webpackChunkklipper_docs=self.webpackChunkklipper_docs||[]).push([["84996"],{7230:function(e,r,t){t.r(r),t.d(r,{metadata:()=>o,contentTitle:()=>c,default:()=>x,assets:()=>p,toc:()=>h,frontMatter:()=>a});var o=JSON.parse('{"id":"ToolsDoc/firmware-parser","title":"Klipper \u30D5\u30A1\u30FC\u30E0\u30A6\u30A7\u30A2\u89E3\u6790\u30C4\u30FC\u30EB","description":"\u3053\u306E\u30C4\u30FC\u30EB\u306F\u3001Klipper\u30D5\u30A1\u30FC\u30E0\u30A6\u30A7\u30A2\u306E .bin, .uf2, .dict, .elf \u30D5\u30A1\u30A4\u30EB\u304B\u3089\u30D3\u30EB\u30C9\u60C5\u5831\u306A\u3069\u306E\u30D1\u30E9\u30E1\u30FC\u30BF\u3092\u62BD\u51FA\u3067\u304D\u307E\u3059\u3002\uFF08PC\u304B\u3089\u30A2\u30AF\u30BB\u30B9\u3059\u308B\u3068\u3001\u3088\u308A\u5FEB\u9069\u306B\u4F7F\u3046\u3053\u3068\u304C\u3067\u304D\u307E\u3059\uFF09","source":"@site/i18n/ja/docusaurus-plugin-content-docs/current/ToolsDoc/firmware-parser.mdx","sourceDirName":"ToolsDoc","slug":"/ToolsDoc/firmware-parser","permalink":"/fly-docs-next/ja/docs/ToolsDoc/firmware-parser","draft":false,"unlisted":false,"editUrl":"https://github.com/kluoyun/fly-docs-next/tree/master/docs/ToolsDoc/firmware-parser.mdx","tags":[],"version":"current","lastUpdatedBy":"Psych0h3ad","lastUpdatedAt":1729430939000,"sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"toolsdocSidebar","previous":{"title":"\u4FBF\u5229\u306A\u30C4\u30FC\u30EB","permalink":"/fly-docs-next/ja/docs/tools"},"next":{"title":"Fly-Tools","permalink":"/fly-docs-next/ja/docs/category/fly-tools"}}'),i=t("52676"),s=t("79938");t("75271");var d=t("40187"),l=t("55016");t("77345"),t("31738");let n={50:"#F3F6F9",100:"#E5EAF2",200:"#DAE2ED",300:"#C7D0DD",400:"#B0B8C4",500:"#9DA8B7",600:"#6B7A90",700:"#434D5B",800:"#303740",900:"#1C2025"};(0,l.Z)("div")(e=>{let{theme:r}=e;return`
    border-radius: 12px;
    border: 2px solid ${"dark"===r.palette.mode?n[800]:n[500]};
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
      border: 1px solid ${"dark"===r.palette.mode?n[800]:n[500]};
      text-align: left;
      padding: 10px;
    }
  
    @media screen and (max-width: 600px) {
        th, td {
            width: auto; /* \u{5728}\u{5C0F}\u{5C4F}\u{5E55}\u{4E0A}\u{81EA}\u{52A8}\u{8C03}\u{6574}\u{5BBD}\u{5EA6} */
        }
    }
    `}),(0,l.Z)(d.Z)({p:2,border:"4px dashed grey",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",textAlign:"center",minHeight:"100px",minWidth:"300px",transition:"border-color 0.3s, background-color 0.3s","&.highlight":{borderColor:"blue",backgroundColor:"lightblue",zIndex:0x5f5e0ff}}),(0,l.Z)("input")({clip:"rect(0 0 0 0)",clipPath:"inset(50%)",height:1,overflow:"hidden",position:"absolute",bottom:0,left:0,whiteSpace:"nowrap",width:1});let a={sidebar_position:"1"},c="Klipper \u30D5\u30A1\u30FC\u30E0\u30A6\u30A7\u30A2\u89E3\u6790\u30C4\u30FC\u30EB",p={},h=[];function f(e){let r={code:"code",h1:"h1",header:"header",p:"p",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.header,{children:(0,i.jsx)(r.h1,{id:"klipper-\u30D5\u30A1\u30FC\u30E0\u30A6\u30A7\u30A2\u89E3\u6790\u30C4\u30FC\u30EB",children:"Klipper \u30D5\u30A1\u30FC\u30E0\u30A6\u30A7\u30A2\u89E3\u6790\u30C4\u30FC\u30EB"})}),"\n",(0,i.jsx)(r.p,{children:":::tips \u30D2\u30F3\u30C8"}),"\n",(0,i.jsxs)(r.p,{children:["\u3053\u306E\u30C4\u30FC\u30EB\u306F\u3001Klipper\u30D5\u30A1\u30FC\u30E0\u30A6\u30A7\u30A2\u306E ",(0,i.jsx)(r.code,{children:".bin"}),", ",(0,i.jsx)(r.code,{children:".uf2"}),", ",(0,i.jsx)(r.code,{children:".dict"}),", ",(0,i.jsx)(r.code,{children:".elf"})," \u30D5\u30A1\u30A4\u30EB\u304B\u3089\u30D3\u30EB\u30C9\u60C5\u5831\u306A\u3069\u306E\u30D1\u30E9\u30E1\u30FC\u30BF\u3092\u62BD\u51FA\u3067\u304D\u307E\u3059\u3002\uFF08PC\u304B\u3089\u30A2\u30AF\u30BB\u30B9\u3059\u308B\u3068\u3001\u3088\u308A\u5FEB\u9069\u306B\u4F7F\u3046\u3053\u3068\u304C\u3067\u304D\u307E\u3059\uFF09"]}),"\n",(0,i.jsx)(r.p,{children:":::"}),"\n","\n",(0,i.jsx)("firmwareparse",{})]})}function x(e={}){let{wrapper:r}={...(0,s.a)(),...e.components};return r?(0,i.jsx)(r,{...e,children:(0,i.jsx)(f,{...e})}):f(e)}}}]);