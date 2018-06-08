<template>
    <div class="md-card">
        <div class="md-card-toolbar" v-if="$slots.header || header">
            <div class="md-card-toolbar-actions">
                <slot name="actions"></slot>
            </div>
            <div class="md-card-toolbar-heading-text">
                <slot name="header">{{ header }}</slot>
            </div>
        </div>
        <div class="md-card-content" :style="bodyStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import cardOper from "./cardOper.js";

export default {
  name: "Common-Card",
  props: ["header", "bodyStyle", "resizeEvent"],
  mounted() {
    let that = this;

    cardOper.card_fullscreen({
      fullElement: this.$el.querySelector(".md-card-fullscreen-activate"),
      callback: () => {
        that.resizeEvent && that.$bus.$emit(that.resizeEvent);
      }
    });
  }
};
</script>

<style>
@import url("./card.css");
</style>