<template>
  <div class="columns is-centered">
    <div class="column">
      <canvas ref="game" />
    </div>
    <div class="column">
      <input
        type="file"
        accept="image/*"
        @change="onImageChange"
      >
      <MainCanvas />
    </div>
  </div>
</template>

<script>
import * as PIXI from "pixi.js-legacy";

import MainCanvas from "~/components/MainCanvas";

export default {
  methods: {
    onImageChange(e) {
      var fileData = e.target.files[0];
      if (!fileData.type.match("image.*")) {
        return;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let sprite = PIXI.Sprite.from(e.target.result);
        sprite.x = 0;
        sprite.y = 0;
        this.app.stage.addChild(sprite);
      };
      reader.readAsDataURL(fileData);
    }
  },
  mounted() {
    this.app = new PIXI.Application({
      view: this.$refs.game
    });
  },
  components: {
    MainCanvas
  }
};
</script>

<style>
.main {
  border: 1px solid #ccc;
}
</style>
