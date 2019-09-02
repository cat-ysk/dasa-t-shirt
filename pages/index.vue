<template>
  <div>
    <div class="columns is-centered">
      <div class="column">
        <div class="canvas-wrapper">
          <MainCanvas
            ref="main"
            @add-layer="onAddLayer"
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
            style="width: 80px"
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
            style="width: 200px"
          >
            <option>Arial</option>
            <option>Impact</option>
            <option>Century</option>
            <option>ＭＳ Ｐゴシック</option>
            <option>ＭＳ Ｐ明朝</option>
            <option>メイリオ</option>
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
    <div class="columns column">
      <p>更新履歴</p>
      <ul>
        <li>2019/09/03 v0.01</li>
      </ul>
    </div>
  </div>
</template>

<script>
import MainCanvas from "~/components/MainCanvas";

export default {
  data() {
    return {
      addingText: "",
      addingTextSize: 100,
      addingTextColor: "000000",
      addingTextFont: "Arial",
      layers: [],
      zoomAmount: 10,
      rotateAmount: 30,
      colors: [
        { text: "黒", value: "000000" },
        { text: "赤", value: "ff0000" },
        { text: "青", value: "0000ff" },
        { text: "白", value: "ffffff" },
        { text: "グレー", value: "808080" },
        { text: "お肌", value: "fff5ee" },
        { text: "紫", value: "800080" },
        { text: "オレンジ", value: "ffa500" },
        { text: "茶", value: "a0522d" },
        { text: "青緑", value: "40e0d0" }
      ],
      stamps: [
        "⚓",
        "🍣",
        "🎮",
        "🎼",
        "🎶",
        "❤",
        "💓",
        "💕",
        "💋",
        "🐰",
        "💪",
        "🙏",
        "🙌",
        "❗",
        "❓",
        "✨",
        "🌟",
        "🎉",
        "😍",
        "😣",
        "💯",
        "🉐",
        "㊗",
        "㊙",
        "👺",
        "💩"
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
      console.log(this.$refs.main.$el);
      var data = this.$refs.main.$el
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      this.$refs.download.setAttribute("href", data);
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
</style>
