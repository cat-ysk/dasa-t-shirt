<template>
  <canvas class="main-canvas" />
</template>

<script>
let LAYER_ID = 0;
const WIDTH = 600;
const HEIGHT = 777;

export default {
  data() {
    return {};
  },

  mounted() {
    this.app = new PIXI.Application({
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: 0xffffff,
      view: this.$el
    });
    // console.log(this.app.renderer.width);
    // this.imgLayer = new PIXI.display.Group(0, true);
    // this.app.stage.addChild(new PIXI.display.Layer(this.imgLayer));
    this.loadCharaImage();

    // TEST
    this.loadImage("buddha.jpg");
  },
  methods: {
    // あくあちゃん固定レイヤー
    loadCharaImage() {
      let tex = PIXI.Texture.from("001.png");
      let sprite = new PIXI.Sprite.from(tex);
      sprite.parentLayer = this.imgLayer;
      sprite.width = this.app.renderer.width;
      sprite.height = this.app.renderer.height;
      this.app.stage.addChild(sprite);
      // this.$emit("add-layer", sprite);
    },

    // 追加画像レイヤー
    loadImage(path) {
      let sprite = PIXI.Sprite.from(path);
      sprite.parentLayer = this.imgLayer;
      sprite.x = this.app.renderer.width / 2;
      sprite.y = this.app.renderer.height / 2;
      sprite.anchor.x = sprite.anchor.y = 0.5;
      sprite.name = "レイヤー" + LAYER_ID++;
      subscribe(sprite);
      this.app.stage.addChild(sprite);
      this.$emit("add-layer", sprite);
    },

    remove(sprite) {
      this.app.stage.removeChild(sprite);
    }
  }
};

function subscribe(obj) {
  obj.interactive = true;
  obj.selected = false;
  obj
    .on("pointerdown", onDragStart)
    .on("pointerup", onDragEnd)
    .on("pointerupoutside", onDragEnd)
    .on("pointermove", onDragMove);
}

function onDragStart(event) {
  if (!this.dragging) {
    this.data = event.data;
    this.dragging = true;
    this.alpha = 0.8;
    this.dragPoint = event.data.getLocalPosition(this.parent);
    this.dragPoint.x -= this.x;
    this.dragPoint.y -= this.y;
  }
}

function onDragEnd() {
  if (this.dragging) {
    this.dragging = false;
    this.alpha = 1;
    // set the interaction data to null
    this.data = null;
  }
}

function onDragMove() {
  if (this.dragging) {
    const newPosition = this.data.getLocalPosition(this.parent);
    this.x = newPosition.x - this.dragPoint.x;
    this.y = newPosition.y - this.dragPoint.y;
  }
}
</script>

<style>
.main-canvas {
  border: 1px solid #ccc;
}
</style>
