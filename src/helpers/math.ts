class MathHelper {
  static mapTo01 = (x: number) => {
    if (x === Infinity || isNaN(x)) return 1; // special case for Infinity or NaN
    return Math.atan(x) / (Math.PI / 2);
  };
}
export default MathHelper