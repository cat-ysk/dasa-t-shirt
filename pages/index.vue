<template>
  <div class="columns is-centered">
    <div class="column">
      <MainCanvas ref="main" />
    </div>
    <div class="column">
      <input
        type="file"
        accept="image/*"
        @change="onImageChange"
      >
    </div>
  </div>
</template>

<script>
import MainCanvas from "~/components/MainCanvas";

export default {
  methods: {
    onImageChange(e) {
      var fileObj = e.target.files[0];
      if (!fileObj || !fileObj.type.match("image.*")) {
        return;
      }
      this.readAsBase64Image(fileObj);
    },
    readAsBase64Image(fileObj) {
      var reader = new FileReader();
      reader.onload = e => {
        this.$refs.main.loadImage(e.target.result);
      };
      reader.readAsDataURL(fileObj);
    }
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
