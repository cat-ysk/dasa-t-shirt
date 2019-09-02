<template>
  <canvas class="main-canvas" />
</template>

<script>
let LAYER_ID = 0;
const WIDTH = 600;
const HEIGHT = 777;

export default {
  data() {
    return {
      layerMask: null,
      layerContainer: null
    };
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
    this.layerContainer = new PIXI.Container();
    this.app.stage.addChild(this.layerContainer);
    this.loadCharaImage();
    this.loadOverlay();

    // TEST
    // this.addImage("buddha.jpg");
  },
  methods: {
    // 服のしわとか
    loadOverlay() {
      let sprite = new PIXI.Sprite.from("001_overlay.png");
      sprite.width = this.app.renderer.width;
      sprite.height = this.app.renderer.height;
      sprite.blendMode = PIXI.BLEND_MODES.MULTIPLY;
      this.app.stage.addChild(sprite);
    },

    // ベースレイヤー
    loadCharaImage() {
      let tex = PIXI.Texture.from("001_mask.png");
      let sprite = new PIXI.Sprite.from(tex);
      sprite.width = this.app.renderer.width;
      sprite.height = this.app.renderer.height;
      this.app.stage.addChild(sprite);
    },

    // 追加画像レイヤー
    addImage(path) {
      let sprite = PIXI.Sprite.from(path, { crossOrigin: true });
      // sprite.parentLayer = this.imgLayer;
      sprite.x = this.app.renderer.width / 2;
      sprite.y = this.app.renderer.height / 2;
      sprite.anchor.x = sprite.anchor.y = 0.5;
      sprite.name = "画像" + LAYER_ID++;
      // sprite.mask = this.layerMask;
      this.subscribe(sprite);
      this.layerContainer.addChild(sprite);
      this.$emit("add-layer", sprite);
    },

    addText(body, size, color, font) {
      let sprite = new PIXI.Text(body, {
        fontSize: size,
        fill: color,
        fontFamily: font
      });
      sprite.x = this.app.renderer.width / 2;
      sprite.y = this.app.renderer.height / 2;
      sprite.anchor.x = sprite.anchor.y = 0.5;
      sprite.name = body;
      this.subscribe(sprite);
      this.layerContainer.addChild(sprite);
      this.$emit("add-layer", sprite);
    },

    remove(sprite) {
      this.layerContainer.removeChild(sprite);
    },

    subscribe(obj) {
      obj.interactive = true;
      obj
        .on("pointerdown", this.onDragStart)
        .on("pointerup", this.onDragEnd)
        .on("pointerupoutside", this.onDragEnd)
        .on("pointermove", this.onDragMove);
    },
    onDragStart(event) {
      if (!event.target.dragging) {
        event.target.data = event.data;
        event.target.dragging = true;
        event.target.alpha = 0.7;
        event.target.dragPoint = event.data.getLocalPosition(
          event.target.parent
        );
        event.target.dragPoint.x -= event.target.x;
        event.target.dragPoint.y -= event.target.y;
        this.$emit("select-layer", event.target);
      }
    },
    onDragEnd(event) {
      if (event.target.dragging) {
        event.target.dragging = false;
        event.target.alpha = 1;
        // set the interaction data to null
        event.target.data = null;
      }
    },
    onDragMove(event) {
      if (event.target && event.target.dragging) {
        const newPosition = event.target.data.getLocalPosition(
          event.target.parent
        );
        event.target.x = newPosition.x - event.target.dragPoint.x;
        event.target.y = newPosition.y - event.target.dragPoint.y;
      }
    }
  }
};
</script>

<style>
.main-canvas {
  border: 1px solid #ccc;
}
</style>
