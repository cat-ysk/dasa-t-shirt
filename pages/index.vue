<template>
  <div>
    <div class="columns is-centered">
      <div class="column">
        <div class="canvas-wrapper">
          <MainCanvas
            ref="main"
            @add-layer="onAddLayer"
            @select-layer="onSelectLayer"
          />
        </div>
      </div>
      <div class="column">
        <label class="w100 button is-primary is-large">
          画像を追加する
          <input
            class="select-image-button"
            type="file"
            accept="image/*"
            @change="onImageChange"
          >
        </label>
        <div class="mt-1">
          <label class="is-inline-block">文字でかさ(px)</label>
          <input
            class="is-inline-block"
            style="width: 60px"
            type="number"
            v-model.number="addingTextSize"
          />
          <br />
          <label class="is-inline-block">色</label>
          <select
            v-model="addingTextColor"
            style="width: 100px; font-size: 1.2rem"
          >
            <option
              v-for="color in colors"
              :key="color.value"
              :value="color.value"
              v-bind:style="{backgroundColor: '#' + color.value}"
            >{{ color.text }}</option>
          </select>
          <br />
          <label class="is-inline-block">フォント</label>
          <select
            v-model="addingTextFont"
            style="width: 200px; font-size: 1.2rem"
          >
            <option value="arial">Arial</option>
            <option
              style="font-family: arial black"
              value="arial black"
            >Arial Black</option>
            <option style="font-family: Impact">Impact</option>
            <option style="font-family: Century">Century</option>
            <option style="font-family: ＭＳ Ｐゴシック">ＭＳ Ｐゴシック</option>
            <option style="font-family: ＭＳ Ｐ明朝">ＭＳ Ｐ明朝</option>
            <option
              value="Hannari"
              style="font-family: Hannari"
            >はんなり</option>
            <option
              value="Nikukyu"
              style="font-family: Nikukyu"
            >ニクキュウ</option>
            <option
              value="Nico Moji"
              style="font-family: Nico Moji"
            >にこもじ</option>
          </select>
          <div class="mt-1 field has-addons">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder=""
                v-model="addingText"
              >
            </div>
            <div class="control">
              <a
                class="button is-info"
                @click="onAddText"
              >
                文字を追加する
              </a>
            </div>
          </div>
        </div>

        <hr />
        <label class="label">スタンプ</label>
        <div>
          <ul class="stamps">
            <li
              v-for="(stamp, i) in stamps"
              :key="i"
            ><a @click="addStamp">{{stamp}}</a></li>
          </ul>
        </div>
        <hr />
        <div>
          <label class="label">レイヤー</label>
          <ul class="layers">
            <li v-if="layers.length < 1">なし</li>
            <li
              v-for="layer in rLayers"
              :key="layer.name"
              draggable="true"
              :class="layerClass(layer)"
            >
              <p>{{ layer.name }}</p>
              <div>
                <span
                  class="mdi mdi-plus-circle"
                  @click="onZoom(layer, zoomScale)"
                ></span>
                <span
                  class="mdi mdi-minus-circle"
                  @click="onZoom(layer, -zoomScale)"
                ></span>
                <span
                  class="mdi mdi-rotate-left"
                  @click="onRotate(layer, -rotateAmount)"
                ></span>
                <span
                  class="mdi mdi-rotate-right"
                  @click="onRotate(layer, rotateAmount)"
                ></span>
                <span
                  class="mdi mdi-close-circle"
                  @click="onDelete(layer)"
                ></span>
              </div>
            </li>
          </ul>
          <div class="mt-1">
            <label>ズーム量(%)</label>
            <input
              class="is-inline-block"
              style="width: 60px"
              type="number"
              v-model.number="zoomAmount"
            />
            <label>回転量(°)</label>
            <input
              class="is-inline-block"
              style="width: 60px"
              type="number"
              v-model.number="rotateAmount"
            />
            <label>表情</label>
            <select
              v-model="face"
              style="width: 80px"
              @change="changeFace"
            >
              <option value="0">🙂</option>
              <option value="1">😄</option>
              <option value="2">😧</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="columns column">
      <a
        ref="download"
        download="dasa-t.png"
      >
        <button
          class="button is-primary is-large"
          @click="download"
        >＞＞＞画像をダウンロード＜＜＜</button></a>

      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"
      ></script>
    </div>
    <hr />
    <div class="columns ">
      <div class="column">

        <p
          class="is-block"
          style="margin-right: 1rem"
        >更新履歴</p>
        <ul>
          <li>2019/09/03 v0.2 表情変更機能追加</li>
          <li>2019/09/03 v0.0.1 つくった</li>
        </ul>
      </div>

      <div class="column">
        企画サンキュー <a href="https://twitter.com/ononon/">@ononon</a><br />
        バグ報告ここ <a href="https://twitter.com/nyallpo/">@nyallpo</a>
      </div>

    </div>
  </div>
</template>

<script>
import MainCanvas from "~/components/MainCanvas";

export default {
  data() {
    return {
      face: 0,
      selectedLayer: null,
      addingText: "",
      addingTextSize: 100,
      addingTextColor: "000000",
      addingTextFont: "arial",
      layers: [],
      zoomAmount: 10,
      rotateAmount: 30,
      colors: [
        { text: "black", value: "000000" },
        { text: "aqua", value: "00ffff" },
        { text: "mediumturquoise", value: "48d1cc" },

        { text: "lightsteelblue", value: "b0c4de" },
        { text: "steelblue", value: "4682b4" },
        { text: "royalblue", value: "4169e1" },
        { text: "midnightblue", value: "191970" },
        { text: "lightsteelblue", value: "b0c4de" },
        { text: "white", value: "ffffff" },
        { text: "dimgray", value: "696969" },
        { text: "darkgray", value: "a9a9a9" },
        { text: "gainsboro", value: "dcdcdc" },
        { text: "papayawhip", value: "ffefd5" },
        { text: "hotpink", value: "ff69b4" },
        { text: "orchid", value: "da70d6" },
        { text: "darkmagenta", value: "8b008b" },
        { text: "darkslateblue", value: "483d8b" },
        { text: "darkorange", value: "ffa500" },
        { text: "coral", value: "ff7f50" },
        { text: "tomato", value: "ff6347" },
        { text: "saddlebrown", value: "8b4513" },
        { text: "darkslategray", value: "2f4f4f" },
        { text: "teal", value: "008080" }
      ],
      stamps: [
        "⚓",
        "🍣",
        "🎮",
        "🎼",
        "🎶",
        "❤",
        "💓",
        "💖",
        "💕",
        "💋",
        "🐰",
        "✌",
        "💪",
        "🙏",
        "🙌",
        "❗",
        "❓",
        "✨",
        "🌟",
        "🎉",
        "😉",
        "😍",
        "😎",
        "😣",
        "💯",
        "🉐",
        "㊗",
        "㊙",
        "🍗",
        "🍜",
        "🌸",
        "🌻",
        "💦",
        "👺",
        "📛"
      ]
    };
  },
  computed: {
    zoomScale() {
      return this.zoomAmount / 100.0;
    },
    rLayers() {
      return this.layers.reverse();
    }
  },

  methods: {
    onImageChange(e) {
      const fileObj = e.target.files[0];
      if (!fileObj || !fileObj.type.match("image.*")) {
        return;
      }
      this.readAsBase64Image(fileObj);
    },
    readAsBase64Image(fileObj) {
      const reader = new FileReader();
      reader.onload = e => {
        this.$refs.main.addImage(e.target.result);
      };
      reader.readAsDataURL(fileObj);
    },
    onAddLayer(sprite) {
      this.layers.push(sprite);
      this.selectedLayer = sprite.name;
    },
    onZoom(sprite, amount) {
      sprite.scale.x += amount;
      sprite.scale.y += amount;
    },
    onRotate(sprite, amount) {
      sprite.angle += amount;
    },
    onDelete(sprite) {
      this.$refs.main.remove(sprite);
      this.layers.splice(this.layers.indexOf(sprite), 1);
    },
    onAddText() {
      if (this.addingText.length > 0) {
        this.$refs.main.addText(
          this.addingText,
          this.addingTextSize,
          parseInt(this.addingTextColor, 16),
          this.addingTextFont
        );
        this.addingText = "";
      }
    },
    addStamp(e) {
      this.$refs.main.addImage(e.target.src);
    },
    download() {
      var data = this.$refs.main.$el
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      this.$refs.download.setAttribute("href", data);
    },
    onSelectLayer(sprite) {
      console.log(sprite);
      this.selectedLayer = sprite.name;
    },
    layerClass(layer) {
      return {
        selected: layer.name == this.selectedLayer
      };
    },
    changeFace(event) {
      console.log(event);
      this.$refs.main.changeFace(event.target.value);
    }
  },
  components: {
    MainCanvas
  },
  mounted() {
    window.twemoji.parse(document.body);
  }
};
</script>

<style>
input[type="file"] {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
.input-zoom {
  width: 50px;
}
.main {
  border: 1px solid #ccc;
}
.layers {
  border: 1px solid #ccc;
  padding: 5px;
}
.layers:empty {
  padding: 10px;
}
.layers li {
  border: 1px dotted #ccc;
  padding: 5px;
  font-size: 1.2rem;
}
.layers li + li {
  margin-top: 5px;
}
.mdi-plus-circle {
  color: blue;
}
.mdi-minus-circle {
  color: green;
}
.mdi-close-circle {
  margin-left: 1rem;
  color: red;
}
.w100 {
  width: 100%;
}
.mt-1 {
  margin-top: 10px;
}
.stamps {
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.stamps li {
  padding: 2px;
}
.stamps a {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  display: inline-block;
  width: 40px;
}
.selected {
  background: #eef;
}
</style>
