<template>
  <div>
    <div class="float">
      <div>
        ホスト
        <label>横解像度(pixel)</label>
        <input v-model="host.width" @change="simulateContentPixel" />
        <label>縦解像度(pixel)</label>
        <input v-model="host.height" @change="simulateContentPixel" />
        <label>対角線長(inch)</label>
        <input v-model="host.diagonalLength" @change="simulateContentPixel" />
        <label>ppi</label>
        <input :value="host.ppi.toFixed(2)" disabled />
        <label>横幅(cm)</label>
        <input :value="(host.widthLenght * 2.54).toFixed(2)" disabled />
        <label>縦幅(cm)</label>
        <input :value="(host.heightLenght * 2.54).toFixed(2)" disabled />
      </div>
      <div>
        コンテンツ
        <label>横解像度</label>
        <input v-model="content.width" @change="simulateContentPixel" />
        <label>縦解像度</label>
        <input v-model="content.height" @change="simulateContentPixel" />
        <label>対角線長(inch)</label>
        <input v-model="content.diagonalLength" @change="simulateContentPixel" />
        <label>ppi</label>
        <input :value="content.ppi.toFixed(2)" disabled>
        <label>横幅(cm)</label>
        <input :value="(content.widthLenght * 2.54).toFixed(2)" disabled />
        <label>縦幅(cm)</label>
        <input :value="(content.heightLenght * 2.54).toFixed(2)" disabled />
      </div>
    </div>
    <div class="center">
      <div :style="boxStyle"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed, onBeforeMount } from 'vue'
import Monitor from './classes/Monitor.js'

// ホストの画面サイズ情報
const host = reactive(new Monitor(1920, 1080, 21.4));
// コンテンツの画面サイズ情報
const content = reactive(new Monitor(1920, 1080, 7.0));

// 仮想上のピクセル
const simulatedContentPixel = reactive({
  width: 0,
  height: 0,
});

const boxStyle = computed(() => {
  return {
    width: simulatedContentPixel.width + 'px',
    height: simulatedContentPixel.height + 'px',
    border: 'solid 1px',
  };
});

// Vueマウント前イベント
onBeforeMount(() => {
  // ディスプレイの解像度をセット
  host.width = window.parent.screen.width;
  host.height = window.parent.screen.height;

  // 一応初期値でシミュレートしとく
  simulateContentPixel();
});

/** コンテンツのサイズをシミュレートする */
const simulateContentPixel = () => {
  // ppiの比を算出(縦ppiも同じ値なので、横ppiの比=縦ppiとする)
  const ppiRate = host.ppi / content.ppi;

  // ppiの比をコンテンツの解像度に掛けて、実サイズをシミュレート
  simulatedContentPixel.width = content.width * ppiRate;
  simulatedContentPixel.height = content.height * ppiRate;
}
</script>
<style scoped>

input {
  width: 4rem;
}

.float {
  position: fixed;
  top: 0px;
  background-color: #00000011;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.center {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>