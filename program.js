document.writeln('Hello World');

Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
        return this;    
    }
};

var obj = {};

for (myvar in obj) {
    if (obj.hasOwnProperty(myvar)) {

    }
}

if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    }
}

var MYAPP = {};

var myObject = {
    value: 0,
    increment: function(inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    }
};

var add = function(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
        throw {
            name: 'TypeError',
            message: 'add needs numbers'
        };
    }
    return x + y;
};

myObject.double = function () {
    var that = this;
    
    var helper = function () {
        that.value = add(that.value, that.value);
    };

    helper();
};

var sum = function () {
    var i, sum = 0;
    for (i = 0; i < arguments.length; i += 1) {
        sum += arguments[i];
    }
    return sum;
}

Number.method('integer', function () {
    return Math[this < 0 ? 'ceil' : 'floor'](this)
});

String.method('trim', function () {
    return this.replace(/^\s+|\s+$/g, '');
});

var walk_the_DOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk (node, func);
        node = node.nextSibling;
    }
};

var getElementsByAttribute = function (att,value) {
    var results = [];

    walk_the_DOM(document.body, function (node) {
        var actual = node.nodeType === 1 && node.getAttribute(att);
        if (typeof actual === 'string' && (actual == value || typeof value !== 'string')) {
            results.push(node);
        }
    })

    return results;
};

var dougsObject = (function() {
    var value = 0;

    return {
        increment: function (inc) {
            value += typeof inc === 'number' ? inc : 1
        },
        getValue: function () {
            return value;
        }
    };
}());

//callback
//request = prepare_the_request();
//send_request_asynchronously(request, function(response) {
//    display(response);
//});

Function.method('curry', function() {
    var slice = Array.prototype.slice,
    args = slice.apply(arguments),
    that = this;
    //var args = arguments, that = this;
    return function() {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});

var globalMemo; 

var fibonacci_1 = function (n) {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

//memoization
var fibonacci_2 = (function () {
    var memo = [0, 1];
    var fib = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    };
    globalMemo = memo;
    return fib;
}());

var memoizer = function (memo, formula) {
    var recur = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = formula(recur, n);
            memo[n] = result;
        }
        return result;
    };
    return recur;
};

var fibonacci_3 = memoizer([0, 1], function (recur, n){
    return recur(n - 1) + recur(n - 2);
});

var factorial = memoizer([1, 1], function (recur, n) {
    return n * recur(n-1);
});

