(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

// IMPORTS =========================================================================================
require("../../common/scripts/shims");
var Cycle = require("cyclejs");
var Rx = Cycle.Rx;
var h = Cycle.h;

var Menu = require("./menu");

// APP =============================================================================================
var data = ["Home", "Services", "About", "Contact us"];

var active = "Services";

var View = Cycle.createView(function () {
  return {
    vtree$: Rx.Observable["return"](h("div", null, [h("Menu", { items: data, active: active })])) };
});

Cycle.createDOMUser("main").inject(View);

},{"../../common/scripts/shims":3,"./menu":2,"cyclejs":"cyclejs"}],2:[function(require,module,exports){
"use strict";

// IMPORTS =========================================================================================
var Cycle = require("cyclejs");
var Rx = Cycle.Rx;
var h = Cycle.h;

var makeClass = require("classnames");

// COMPONENTS ======================================================================================
Cycle.registerCustomElement("Menu", function (User, Props) {
  var Model = Cycle.createModel(function (Intent, Props) {
    return {
      items$: Props.get("items$").startWith([]),
      active$: Props.get("active$").merge(Intent.get("selectActive$")).startWith([]) };
  });

  var View = Cycle.createView(function (Model) {
    var items$ = Model.get("items$");
    var active$ = Model.get("active$");
    return {
      vtree$: items$.combineLatest(active$, function (items, active) {
        return h("div", null, [h("nav", null, [items.map(function (item) {
          return h("div", { attributes: { "data-name": item }, key: item,
            className: makeClass({ item: true, active: item == active }) }, [item]);
        })]), h("p", null, ["Selected: ", h("b", null, [active])])]);
      }) };
  });

  var Intent = Cycle.createIntent(function (User) {
    return {
      selectActive$: User.event$("nav .item", "click").map(function (event) {
        return event.currentTarget.dataset.name;
      }) };
  });

  User.inject(View).inject(Model).inject(Intent, Props)[0].inject(User);
});

// TODO https://github.com/alexmingoia/jsx-transform/issues/15

},{"classnames":"classnames","cyclejs":"cyclejs"}],3:[function(require,module,exports){
"use strict";

// IMPORTS =========================================================================================
require("babel/polyfill");

// SHIMS ===========================================================================================
var Cycle = require("cyclejs");
var Rx = Cycle.Rx;

Cycle.latest = function (DataNode, keys, resultSelector) {
  var observables = keys.map(function (key) {
    return DataNode.get(key);
  });
  var args = observables.concat([function selector() {
    for (var _len = arguments.length, list = Array(_len), _key = 0; _key < _len; _key++) {
      list[_key] = arguments[_key];
    }

    var item = keys.reduce(function (item, key) {
      item[key.slice(0, -1)] = list[keys.indexOf(key)];
      return item;
    }, {});
    return resultSelector(item);
  }]);
  return Rx.Observable.combineLatest.apply(null, args);
};

console.spy = function spy() {
  var _console$log;

  for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
    params[_key] = arguments[_key];
  }

  return (_console$log = console.log).bind.apply(_console$log, [console].concat(params));
};

},{"babel/polyfill":"babel/polyfill","cyclejs":"cyclejs"}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC80LjEtbWVudS1iYXNpYy9zY3JpcHRzL2FwcC5qcyIsImJ1aWxkLzQuMS1tZW51LWJhc2ljL3NjcmlwdHMvbWVudS5qcyIsImJ1aWxkL2NvbW1vbi9zY3JpcHRzL3NoaW1zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFDdEMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFCLEVBQUUsR0FBTyxLQUFLLENBQWQsRUFBRTtJQUFFLENBQUMsR0FBSSxLQUFLLENBQVYsQ0FBQzs7QUFDVixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7OztBQUc3QixJQUFJLElBQUksR0FBRyxDQUNULE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FDMUMsQ0FBQzs7QUFFRixJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUM7O0FBRXhCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7U0FBTztBQUNqQyxVQUFNLEVBQUUsRUFBRSxDQUFDLFVBQVUsVUFBTyxDQUMxQixDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUNiLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUN6QyxDQUFDLENBQ0gsRUFDRjtDQUFDLENBQUMsQ0FBQzs7QUFFSixLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7O0FDcEJ6QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUIsRUFBRSxHQUFPLEtBQUssQ0FBZCxFQUFFO0lB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QUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztHQUFBLENBQUMsQ0FBQztBQUNyRCxNQUFJLElBQUksR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQzVCLFNBQVMsUUFBUSxHQUFVO3NDQUFOLElBQUk7QUFBSixVQUFJOzs7QUFDdkIsUUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksRUFBRSxHQUFHLEVBQUs7QUFDcEMsVUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2pELGFBQU8sSUFBSSxDQUFDO0tBQ2IsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNQLFdBQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQzdCLENBQ0YsQ0FBQyxDQUFDO0FBQ0gsU0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ3RELENBQUM7O0FBRUYsT0FBTyxDQUFDLEdBQUcsR0FBRyxTQUFTLEdBQUcsR0FBWTs7O29DQUFSLE1BQU07QUFBTixVQUFNOzs7QUFDbEMsU0FBTyxnQkFBQSxPQUFPLENBQUMsR0FBRyxFQUFDLElBQUksTUFBQSxnQkFBQyxPQUFPLFNBQUssTUFBTSxFQUFDLENBQUM7Q0FDN0MsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBJTVBPUlRTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5yZXF1aXJlKFwiLi4vLi4vY29tbW9uL3NjcmlwdHMvc2hpbXNcIik7XG5sZXQgQ3ljbGUgPSByZXF1aXJlKFwiY3ljbGVqc1wiKTtcbmxldCB7UngsIGh9ID0gQ3ljbGU7XG5sZXQgTWVudSA9IHJlcXVpcmUoXCIuL21lbnVcIik7XG5cbi8vIEFQUCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBkYXRhID0gW1xuICBcIkhvbWVcIiwgXCJTZXJ2aWNlc1wiLCBcIkFib3V0XCIsIFwiQ29udGFjdCB1c1wiXG5dO1xuXG5sZXQgYWN0aXZlID0gXCJTZXJ2aWNlc1wiO1xuXG5sZXQgVmlldyA9IEN5Y2xlLmNyZWF0ZVZpZXcoKCkgPT4gKHtcbiAgdnRyZWUkOiBSeC5PYnNlcnZhYmxlLnJldHVybihcbiAgICBoKCdkaXYnLCBudWxsLCBbXG4gICAgICBoKCdNZW51Jywge2l0ZW1zOiBkYXRhLCBhY3RpdmU6IGFjdGl2ZX0pXG4gICAgXSlcbiAgKSxcbn0pKTtcblxuQ3ljbGUuY3JlYXRlRE9NVXNlcihcIm1haW5cIikuaW5qZWN0KFZpZXcpOyIsIi8vIElNUE9SVFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBDeWNsZSA9IHJlcXVpcmUoXCJjeWNsZWpzXCIpO1xubGV0IHtSeCwgaH0gPSBDeWNsZTtcbmxldCBtYWtlQ2xhc3MgPSByZXF1aXJlKFwiY2xhc3NuYW1lc1wiKTtcblxuLy8gQ09NUE9ORU5UUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuQ3ljbGUucmVnaXN0ZXJDdXN0b21FbGVtZW50KFwiTWVudVwiLCAoVXNlciwgUHJvcHMpID0+IHtcbiAgbGV0IE1vZGVsID0gQ3ljbGUuY3JlYXRlTW9kZWwoKEludGVudCwgUHJvcHMpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXMkOiBQcm9wcy5nZXQoXCJpdGVtcyRcIikuc3RhcnRXaXRoKFtdKSxcbiAgICAgIGFjdGl2ZSQ6IFByb3BzLmdldChcImFjdGl2ZSRcIilcbiAgICAgICAgLm1lcmdlKEludGVudC5nZXQoXCJzZWxlY3RBY3RpdmUkXCIpKVxuICAgICAgICAuc3RhcnRXaXRoKFtdKSxcbiAgICB9XG4gIH0pO1xuXG4gIGxldCBWaWV3ID0gQ3ljbGUuY3JlYXRlVmlldyhNb2RlbCA9PiB7XG4gICAgbGV0IGl0ZW1zJCA9IE1vZGVsLmdldChcIml0ZW1zJFwiKTtcbiAgICBsZXQgYWN0aXZlJCA9IE1vZGVsLmdldChcImFjdGl2ZSRcIik7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZ0cmVlJDogaXRlbXMkLmNvbWJpbmVMYXRlc3QoYWN0aXZlJCwgKGl0ZW1zLCBhY3RpdmUpID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBoKCdkaXYnLCBudWxsLCBbXG4gICAgICAgICAgICBoKCduYXYnLCBudWxsLCBbXG4gICAgICAgICAgICAgIGl0ZW1zLm1hcChpdGVtID0+XG4gICAgICAgICAgICAgICAgaCgnZGl2Jywge2F0dHJpYnV0ZXM6IHtcImRhdGEtbmFtZVwiOiBpdGVtfSwga2V5OiBpdGVtLFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBtYWtlQ2xhc3Moe1wiaXRlbVwiOiB0cnVlLCBhY3RpdmU6IGl0ZW0gPT0gYWN0aXZlfSl9LCBbXG4gICAgICAgICAgICAgICAgICBpdGVtXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBoKCdwJywgbnVsbCwgW1xuICAgICAgICAgICAgICBcIlNlbGVjdGVkOiBcIiwgaCgnYicsIG51bGwsIFthY3RpdmVdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKVxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgICAvLyBUT0RPIGh0dHBzOi8vZ2l0aHViLmNvbS9hbGV4bWluZ29pYS9qc3gtdHJhbnNmb3JtL2lzc3Vlcy8xNVxuICAgIH07XG4gIH0pO1xuXG4gIGxldCBJbnRlbnQgPSBDeWNsZS5jcmVhdGVJbnRlbnQoVXNlciA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNlbGVjdEFjdGl2ZSQ6IFVzZXIuZXZlbnQkKFwibmF2IC5pdGVtXCIsIFwiY2xpY2tcIilcbiAgICAgICAgLm1hcChldmVudCA9PiBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZSksXG4gICAgfTtcbiAgfSk7XG5cbiAgVXNlci5pbmplY3QoVmlldykuaW5qZWN0KE1vZGVsKS5pbmplY3QoSW50ZW50LCBQcm9wcylbMF0uaW5qZWN0KFVzZXIpO1xufSk7XG4iLCIvLyBJTVBPUlRTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5yZXF1aXJlKFwiYmFiZWwvcG9seWZpbGxcIik7XG5cbi8vIFNISU1TID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBDeWNsZSA9IHJlcXVpcmUoXCJjeWNsZWpzXCIpO1xubGV0IHtSeH0gPSBDeWNsZTtcblxuQ3ljbGUubGF0ZXN0ID0gZnVuY3Rpb24gKERhdGFOb2RlLCBrZXlzLCByZXN1bHRTZWxlY3Rvcikge1xuICBsZXQgb2JzZXJ2YWJsZXMgPSBrZXlzLm1hcChrZXkgPT4gRGF0YU5vZGUuZ2V0KGtleSkpO1xuICBsZXQgYXJncyA9IG9ic2VydmFibGVzLmNvbmNhdChbXG4gICAgZnVuY3Rpb24gc2VsZWN0b3IoLi4ubGlzdCkge1xuICAgICAgbGV0IGl0ZW0gPSBrZXlzLnJlZHVjZSgoaXRlbSwga2V5KSA9PiB7XG4gICAgICAgIGl0ZW1ba2V5LnNsaWNlKDAsIC0xKV0gPSBsaXN0W2tleXMuaW5kZXhPZihrZXkpXTtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9LCB7fSk7XG4gICAgICByZXR1cm4gcmVzdWx0U2VsZWN0b3IoaXRlbSk7XG4gICAgfVxuICBdKTtcbiAgcmV0dXJuIFJ4Lk9ic2VydmFibGUuY29tYmluZUxhdGVzdC5hcHBseShudWxsLCBhcmdzKTtcbn07XG5cbmNvbnNvbGUuc3B5ID0gZnVuY3Rpb24gc3B5KC4uLnBhcmFtcykge1xuICByZXR1cm4gY29uc29sZS5sb2cuYmluZChjb25zb2xlLCAuLi5wYXJhbXMpO1xufTsiXX0=
