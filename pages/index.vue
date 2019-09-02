<template>
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
      <label class="button is-primary">
        画像を追加する
        <input
          class="select-image-button"
          type="file"
          accept="image/*"
          @change="onImageChange"
        >
      </label>
      <hr />
      <div>
        <label class="label">レイヤー</label>
        <ul class="layers">
          <li v-if="layers.length < 1">なし</li>
          <li
            v-for="layer in layers"
            :key="layer.name"
            draggable="true"
          >
            {{ layer.name }}
            <span>
              <span
                class="mdi mdi-plus-circle"
                @click="onZoom(layer, zoomScale)"
              ></span>
              <span
                class="mdi mdi-minus-circle"
                @click="onZoom(layer, -zoomScale)"
              ></span>
              <span
                class="mdi mdi-close-circle"
                @click="onDelete(layer)"
              ></span>
            </span>
          </li>
        </ul>
        <hr />
        <label class="label">ズーム量(%)</label>
        <input
          class="input"
          type="number"
          v-model.number="zoomAmount"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MainCanvas from "~/components/MainCanvas";

export default {
  data() {
    return {
      layers: [],
      zoomAmount: 10
    };
  },
  computed: {
    zoomScale() {
      return this.zoomAmount / 100.0;
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
        this.$refs.main.loadImage(e.target.result);
      };
      reader.readAsDataURL(fileObj);
    },
    onAddLayer(sprite) {
      console.log(sprite);
      this.layers.push(sprite);
    },
    onZoom(sprite, amount) {
      sprite.scale.x += amount;
      sprite.scale.y += amount;
    },
    onDelete(sprite) {
      this.$refs.main.remove(sprite);
      this.layers.splice(this.layers.indexOf(sprite), 1);
    }
  },
  components: {
    MainCanvas
  }
};
</script>

<style>
input[type="file"] {
  position: absolute;
  opacity: 0;
  z-index: -1;
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
</style>
