<template>
  <div class="mt-1">
    <label class="is-inline-block">文字でかさ(px)</label>
    <input
      class="is-inline-block"
      style="width: 60px"
      type="number"
      v-model.number="addingTextSize"
    />
    <br/>
    <label class="is-inline-block">色</label>
    <select
      v-model="addingTextColor"
      style="width: 100px; font-size: 1.2rem"
    >
      <option
        v-for="color in colors"
        :key="color.value"
        :value="color.value"
        v-bind:style="{backgroundColor: '#' + color.value}"
      >{{ color.text }}
      </option>
    </select>
    <br/>
    <label class="is-inline-block">フォント</label>
    <select
      v-model="addingTextFont"
      style="width: 200px; font-size: 1.2rem"
    >
      <option v-for="font in fonts" :key="font.value" :value="font.value"
              :style="{fontFamily: font.value}">
        {{ font.text }}
      </option>
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
          @click="onClickAddButton"
        >
          文字を追加する
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import colorsJson from "~/store/colors.json";
  import fontsJson from "~/store/fonts.json";

  export default {
    data() {
      return {
        addingText: "",
        addingTextSize: 100,
        addingTextColor: "000000",
        addingTextFont: "arial",
        colors: colorsJson,
        fonts: fontsJson
      }
    },
    methods: {
      onClickAddButton() {
        if (this.addingText.length > 0) {
          this.$emit('change', {
            text: this.addingText,
            size: this.addingTextSize,
            color: parseInt(this.addingTextColor, 16),
            font: this.addingTextFont
          });
          this.addingText = "";
        }
      }
    }
  }

</script>