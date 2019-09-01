<template>
  <canvas class="main-canvas" />
</template>

<script>
const WIDTH = 600;
const HEIGHT = 800;

let layers = [];

export default {
  mounted() {
    this.app = new PIXI.Application({
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: 0xffffff,
      view: this.$el
    });
    // this.imgLayer = new PIXI.display.Group(0, true);
    // this.app.stage.addChild(new PIXI.display.Layer(this.imgLayer));

    this.overlaySprite = new PIXI.Sprite.from("overlay.png");
    this.overlaySprite.parentLayer = this.imgLayer;
    this.overlaySprite.x = 0;
    this.overlaySprite.y = 0;
    this.overlaySprite.zOrder = 1;
    this.app.stage.addChild(this.overlaySprite);
  },
  methods: {
    loadImage(path) {
      let sprite = PIXI.Sprite.from(path);
      sprite.parentLayer = this.imgLayer;
      sprite.x = 0;
      sprite.y = 0;
      sprite.zOrder = 2;
      this.app.stage.addChild(sprite);
      this.app.stage.setChildIndex(this.overlaySprite, 1);
      debugger;
    }
  }
};
</script>

<style>
</style>
