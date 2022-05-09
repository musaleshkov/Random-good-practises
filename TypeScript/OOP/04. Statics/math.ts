class MyMath {
	/**
    Returns the squared number of num
	  @param  {number} num
	 **/
	public static pow(num: number): number {
		return num ** 2;
	}

	/**
    Returns the absolute value of num
    @param  {number} num
   */
	public static abs(num: number): number {
		return num < 0 ? -num : num;
	}
}

console.log(MyMath.pow(4));
console.log(MyMath.abs(-2));
