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
        };
        img.src = e.target.result;
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
        preload: () => {}
      }
    };
    var game = new Phaser.Game(config);
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
