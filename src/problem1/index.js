const inputForN = document.getElementById('inputForN');

inputForN.addEventListener('input', function() {
  const n = parseInt(inputForN.value); // Convert the input value to an integer
  if (isNaN(n) || n <= 0) {
    console.log('please, integer only!');
    return;
  }
  console.log(sum_to_n_a(n),'this is solution a');
  console.log(sum_to_n_b(n),'this is solution b');
  console.log(sum_to_n_c(n),'this is solution c');
});

//my idea from: https://www.wikihow.com/Sum-the-Integers-from-1-to-N  

var sum_to_n_a = function(n) {
  //define variable 'sum'
  var sum = 0;
  //use a for loop that run from 1 and limit to the param n
  //index increase by 1 unit per loop run.
  // 1.. 2..3 will sum up until it reach n.
  for (var index = 1; index <= n; index++) {
    sum += index;
  }
  return sum;
};
  
// base case: If n is 1, return 1, as it's the sum of itself.
var sum_to_n_b = function(n) {
  if (n === 1) {
    return 1;
  }else {
    // recursive case: Return n added to the sum of integers from 1 to (n-1).
    return n + sum_to_n_b(n - 1);
  }
};

//The formula for the sum of integers from 1 to n is (n * (n + 1)) / 2.
  //basically math: https://www.cuemath.com/sum-of-integers-formula/#:~:text=Sum%20of%20first%20n%20positive,the%20total%20number%20of%20integers.
var sum_to_n_c = function(n) {
  return (n * (n + 1)) / 2;
};
  
  