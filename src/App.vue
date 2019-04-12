<template>
  <div class="root">
    <div class="input">
        ホスト
        <label>横解像度(pixel)</label>
        <input v-model="host.pixel.width" v-on:change="simulateContentPixel">
        <label>縦解像度(pixel)</label>
        <input v-model="host.pixel.height" v-on:change="simulateContentPixel">
        <label>対角線長(inch)</label>
        <input v-model="host.DiagonalLength" v-on:change="simulateContentPixel">
        <label>ppi</label>
        <input v-model="host.ppi" disabled>
        <hr>
        コンテンツ
        <label>横解像度</label>
        <input v-model="content.pixel.width" v-on:change="simulateContentPixel">
        <label>縦解像度</label>
        <input v-model="content.pixel.height" v-on:change="simulateContentPixel">
        <label>対角線長(inch)</label>
        <input v-model="content.DiagonalLength" v-on:change="simulateContentPixel">
        <label>ppi</label>
        <input v-model="content.ppi" disabled>
    </div>
    <div class="preview">
        <div v-bind:style="boxStyle">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      // ホストの画面サイズ情報
      host:{
        // 解像度
        pixel: {
          width:1920,
          height:1080
        },
        // 対角線長
        DiagonalLength: 21.5,
        ppi: 93,
      },
      // コンテンツの画面サイズ情報
      content:{
        pixel: {
          width:1900,
          height:1200
        },
        DiagonalLength: 10.0,
        ppi: 217,
      },
      // 仮想上のピクセル
      simulatedContentPixel:{
        width:0,
        height:0
      },
    }
  },
  // 算出プロパティ
  computed: {
    /** ボックスのスタイル */
    boxStyle() {
      return  {
          width: this.simulatedContentPixel.width + 'px',
          height:this.simulatedContentPixel.height + 'px',
          margin:'50px auto',
          border:'solid 1px'
      };
    }
  },
  // Vueマウント前イベント
  beforeMount(){
    // ディスプレイの解像度をセット
    this.host.pixel.width = window.parent.screen.width;
    this.host.pixel.height = window.parent.screen.height;

    // 一応初期値でシミュレートしとく
    this.simulateContentPixel();
  },
  methods: {
    /** コンテンツのサイズをシミュレートする */
    simulateContentPixel() {

      // ホストppi
      this.host.ppi = this.CalcWitdhPpi(
        this.host.pixel.width,
        this.host.pixel.height,
        this.host.DiagonalLength);

      // コンテンツppi
      this.content.ppi = this.CalcWitdhPpi(
        this.content.pixel.width,
        this.content.pixel.height,
        this.content.DiagonalLength);

      // ppiの比を算出(縦ppiも同じ値なので、横ppiの比=縦ppiとする)
      const ppiRate = this.host.ppi/this.content.ppi;

      // ppiの比をコンテンツの解像度に掛けて、実サイズをシミュレート
      this.simulatedContentPixel.width =this.content.pixel.width*ppiRate;
      this.simulatedContentPixel.height =this.content.pixel.height*ppiRate;
    },
    /** 横のppiを算出 */
    CalcWitdhPpi(widthPixel,heightPixel,diagonalLength) {
      // 縦横の比から、角度を出す
      const angle = Math.atan(heightPixel / widthPixel);

      // 角度から横の長さ(inch)を取得
      const widthLenght = diagonalLength * Math.cos(angle);
      const heightLenght = diagonalLength * Math.sin(angle);

      // ppiを算出
      return　widthPixel / widthLenght;
    }
  }
}
</script>