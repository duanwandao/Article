 var x = 1,
      y = 2;
  function fn(x) {
    this.x *= (++x);
    fn = function (y) {
      this.y *= (--y);
      console.log(x + y);
    }
    console.log(x + y);
    return fn;
  }

  fn(3)(4)
  console.log(x + y);