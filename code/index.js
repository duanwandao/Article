var x=1,
y=2;
function fn (x){
 y+=x;
 return function (z){
  console.log(z+(++x)+(--y))
 }
}
var f=fn(3);
f(4);
fn(5)(6)
f(7)