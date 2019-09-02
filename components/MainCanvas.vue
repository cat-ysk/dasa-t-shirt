<template>
  <canvas class="main-canvas" />
</template>

<script>
let selectedSprite = null;
let LAYER_ID = 0;
const WIDTH = 600;
const HEIGHT = 777;

export default {
  data() {
    return {
      layerMask: null,
      layerContainer: null,
      selected: selectedSprite
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
      subscribe(sprite);
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
      subscribe(sprite);
      this.layerContainer.addChild(sprite);
      this.$emit("add-layer", sprite);
    },

    remove(sprite) {
      this.layerContainer.removeChild(sprite);
    }
  }
};

function subscribe(obj) {
  obj.interactive = true;
  obj
    .on("pointerdown", onDragStart)
    .on("pointerup", onDragEnd)
    .on("pointerupoutside", onDragEnd)
    .on("pointermove", onDragMove);
}

function onDragStart(event) {
  selectedSprite = this;
  console.log(this);
  if (!this.dragging) {
    this.data = event.data;
    this.dragging = true;
    this.alpha = 0.7;
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
