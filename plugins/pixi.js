// 各種ブラウザで動かすためにWebGLを諦める
import * as PIXI from "pixi.js-legacy";
window.PIXI = PIXI; // for pixi-layers plugin

// レイヤー操作が複雑化したら使おうと思ってたプラグイン
// require("pixi-layers");

export default PIXI;
