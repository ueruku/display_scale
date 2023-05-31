/** モニター解像度とかを持つクラス */
export default class Monitor {
    /** 横解像度(pixel) */
    width: number;
    /** 縦解像度(pixel) */
    height: number;
    /** 対角線長(inch) */
    diagonalLength: number;

    /** 画素密度(pixel/inch) */
    get ppi(): number {
      return this.width / this.widthLenght;
    }
    /** 対角線角度(inch) */
    get angle(): number {
      return Math.atan(this.height / this.width);
    }
    /** 横幅(inch) */
    get widthLenght(): number {
      return this.diagonalLength * Math.cos(this.angle);
    }
    /** 縦幅(inch) */
    get heightLenght(): number {
      return this.diagonalLength * Math.sin(this.angle);
    }
  
    /** コンストラクタ */
    constructor(width: number, height: number, diagonalLength: number) {
      this.width = width;
      this.height = height;
      this.diagonalLength = diagonalLength;
    }
  }
  