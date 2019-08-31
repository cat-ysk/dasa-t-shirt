<template>
  <div>
    <div>
      <canvas
        class="main"
        width="600"
        height="600"
        ref="ctx"
      />
    </div>
    <input
      type="file"
      accept="image/*"
      multiple
      @change="onImageChange"
    >
    <MainCanvas />
    <div id="game">
    </div>
  </div>
</template>

<script>
import * as PIXI from "pixi.js";

import Phaser from "phaser";
import MainCanvas from "~/components/MainCanvas";

export default {
  methods: {
    drawCanvas() {
      ctx.clearRect(0, 0, 500, 500);
    },
    onImageChange(e) {
      var fileData = e.target.files[0];
      if (!fileData.type.match("image.*")) {
        return;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let img = new Image();
        img.onload = e => {
          this.ctx.drawImage(img, 0, 0, 500, 500);
          console.log("load image tag");
          this.game.textures.addBase64("hoge", e.target.result);
          // this.game.scene.scenes[0].load.image("hoge", img.src);
          // this.game.scene.scenes[0].load.start();
          // this.game.textures.addBase64("hoge", e.target.result);
          // this.game.scene.scenes[0].add.image(100, 100, "hoge");
        };
        img.src = e.target.result;
        // console.log(e.target.result);
        // this.game.textures.addBase64("hoge", e.target.result);
        // this.game.scene.scenes[0].add.image(100, 100, "hoge");
        //this.game.add.image(100, 100, "hoge");
      };
      reader.readAsDataURL(fileData);
    }
  },
  mounted() {
    this.ctx = this.$refs.ctx.getContext("2d");
    var config = {
      type: Phaser.AUTO,
      width: 600,
      height: 600,
      backgroundColor: "#2d2d2d",
      parent: "game",
      scene: {
        create: function() {
          console.log("create");
          this.textures.once("addtexture", e => {
            this.add.image(100, 100, "hoge");
          });
        },
        update: () => {}
      }
    };
    this.game = new Phaser.Game(config);
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
