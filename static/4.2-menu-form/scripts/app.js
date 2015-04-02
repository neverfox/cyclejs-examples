(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

// IMPORTS =========================================================================================
require("../../common/scripts/shims");
var Cycle = require("cyclejs");
var Rx = Cycle.Rx;
var h = Cycle.h;

var Menu = require("./menu");

// APP =============================================================================================
var data = [{ name: "Web Development", price: 300 }, { name: "Design", price: 400 }, { name: "Integration", price: 250 }, { name: "Training", price: 220 }];

var active = ["Web Development", "Integration"];

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
module.exports = Cycle.registerCustomElement("Menu", function (User, Props) {
  var Model = Cycle.createModel(function (Intent, Props) {
    return {
      items$: Props.get("items$").startWith([]),
      active$: Props.get("active$").merge(Intent.get("selectOrUnselect$")).startWith([]).scan(function (state, name) {
        if (name) {
          if (state.indexOf(name) == -1) {
            // Select
            return state.concat([name]);
          } else {
            // Unselect
            return state.filter(function (n) {
              return n != name;
            });
          }
        } else {
          // Keep current
          return state;
        }
      }) };
  });

  var View = Cycle.createView(function (Model) {
    var items$ = Model.get("items$");
    var active$ = Model.get("active$");
    return {
      vtree$: items$.combineLatest(active$, function (items, active) {
        var totalPrice = items.filter(function (item) {
          return active.indexOf(item.name) != -1;
        }).reduce(function (sum, item) {
          return sum + item.price;
        }, 0);
        return h("div", null, [h("nav", null, [items.map(function (item) {
          return h("div", { attributes: { "data-name": item.name }, key: item.name,
            className: makeClass({ item: true, active: active.indexOf(item.name) != -1 }) }, [item.name, " ", h("b", null, ["$", item.price.toFixed(2)])]);
        }), h("div", null, ["Total: ", h("b", null, ["$", totalPrice.toFixed(2)])])])]);
      }) };
  });

  var Intent = Cycle.createIntent(function (User) {
    return {
      selectOrUnselect$: User.event$("nav .item", "click").map(function (event) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC80LjItbWVudS1mb3JtL3NjcmlwdHMvYXBwLmpzIiwiYnVpbGQvNC4yLW1lbnUtZm9ybS9zY3JpcHRzL21lbnUuanMiLCJidWlsZC9jb21tb24vc2NyaXB0cy9zaGltcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0NBLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBQ3RDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxQixFQUFFLEdBQU8sS0FBSyxDQUFkLEVBQUU7SUFBRSxDQUFDLEdBQUksS0FBSyxDQUFWLENBQUM7O0FBQ1YsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7QUFHN0IsSUFBSSxJQUFJLEdBQUcsQ0FDVCxFQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFDLEVBQ3JDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFDLEVBQzVCLEVBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFDLEVBQ2pDLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFDLENBQy9CLENBQUM7O0FBRUYsSUFBSSxNQUFNLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxhQUFhLENBQUMsQ0FBQzs7QUFFaEQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztTQUFPO0FBQ2pDLFVBQU0sRUFBRSxFQUFFLENBQUMsVUFBVSxVQUFPLENBQzFCLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQ2IsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDLENB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QUMsR0FBRyxDQUFDLFVBQUEsR0FBRztXQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0dBQUEsQ0FBQyxDQUFDO0FBQ3JELE1BQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FDNUIsU0FBUyxRQUFRLEdBQVU7c0NBQU4sSUFBSTtBQUFKLFVBQUk7OztBQUN2QixRQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBSztBQUNwQyxVQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDakQsYUFBTyxJQUFJLENBQUM7S0FDYixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1AsV0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDN0IsQ0FDRixDQUFDLENBQUM7QUFDSCxTQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDdEQsQ0FBQzs7QUFFRixPQUFPLENBQUMsR0FBRyxHQUFHLFNBQVMsR0FBRyxHQUFZOzs7b0NBQVIsTUFBTTtBQUFOLFVBQU07OztBQUNsQyxTQUFPLGdCQUFBLE9BQU8sQ0FBQyxHQUFHLEVBQUMsSUFBSSxNQUFBLGdCQUFDLE9BQU8sU0FBSyxNQUFNLEVBQUMsQ0FBQztDQUM3QyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIElNUE9SVFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbnJlcXVpcmUoXCIuLi8uLi9jb21tb24vc2NyaXB0cy9zaGltc1wiKTtcbmxldCBDeWNsZSA9IHJlcXVpcmUoXCJjeWNsZWpzXCIpO1xubGV0IHtSeCwgaH0gPSBDeWNsZTtcbmxldCBNZW51ID0gcmVxdWlyZShcIi4vbWVudVwiKTtcblxuLy8gQVBQID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IGRhdGEgPSBbXG4gIHtuYW1lOiBcIldlYiBEZXZlbG9wbWVudFwiLCBwcmljZTogMzAwfSxcbiAge25hbWU6IFwiRGVzaWduXCIsIHByaWNlOiA0MDB9LFxuICB7bmFtZTogXCJJbnRlZ3JhdGlvblwiLCBwcmljZTogMjUwfSxcbiAge25hbWU6IFwiVHJhaW5pbmdcIiwgcHJpY2U6IDIyMH1cbl07XG5cbmxldCBhY3RpdmUgPSBbXCJXZWIgRGV2ZWxvcG1lbnRcIiwgXCJJbnRlZ3JhdGlvblwiXTtcblxubGV0IFZpZXcgPSBDeWNsZS5jcmVhdGVWaWV3KCgpID0+ICh7XG4gIHZ0cmVlJDogUnguT2JzZXJ2YWJsZS5yZXR1cm4oXG4gICAgaCgnZGl2JywgbnVsbCwgW1xuICAgICAgaCgnTWVudScsIHtpdGVtczogZGF0YSwgYWN0aXZlOiBhY3RpdmV9KVxuICAgIF0pXG4gICksXG59KSk7XG5cbkN5Y2xlLmNyZWF0ZURPTVVzZXIoXCJtYWluXCIpLmluamVjdChWaWV3KTsiLCIvLyBJTVBPUlRTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5sZXQgQ3ljbGUgPSByZXF1aXJlKFwiY3ljbGVqc1wiKTtcbmxldCB7UngsIGh9ID0gQ3ljbGU7XG5sZXQgbWFrZUNsYXNzID0gcmVxdWlyZShcImNsYXNzbmFtZXNcIik7XG5cbi8vIENPTVBPTkVOVFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmV4cG9ydCBkZWZhdWx0IEN5Y2xlLnJlZ2lzdGVyQ3VzdG9tRWxlbWVudChcIk1lbnVcIiwgKFVzZXIsIFByb3BzKSA9PiB7XG4gIGxldCBNb2RlbCA9IEN5Y2xlLmNyZWF0ZU1vZGVsKChJbnRlbnQsIFByb3BzKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zJDogUHJvcHMuZ2V0KFwiaXRlbXMkXCIpLnN0YXJ0V2l0aChbXSksXG4gICAgICBhY3RpdmUkOiBQcm9wcy5nZXQoXCJhY3RpdmUkXCIpXG4gICAgICAgIC5tZXJnZShJbnRlbnQuZ2V0KFwic2VsZWN0T3JVbnNlbGVjdCRcIikpXG4gICAgICAgIC5zdGFydFdpdGgoW10pXG4gICAgICAgIC5zY2FuKChzdGF0ZSwgbmFtZSkgPT4ge1xuICAgICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUuaW5kZXhPZihuYW1lKSA9PSAtMSkge1xuICAgICAgICAgICAgICAvLyBTZWxlY3RcbiAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlLmNvbmNhdChbbmFtZV0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gVW5zZWxlY3RcbiAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlLmZpbHRlcihuID0+IG4gIT0gbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEtlZXAgY3VycmVudFxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgfTtcbiAgfSk7XG5cbiAgbGV0IFZpZXcgPSBDeWNsZS5jcmVhdGVWaWV3KE1vZGVsID0+IHtcbiAgICBsZXQgaXRlbXMkID0gTW9kZWwuZ2V0KFwiaXRlbXMkXCIpO1xuICAgIGxldCBhY3RpdmUkID0gTW9kZWwuZ2V0KFwiYWN0aXZlJFwiKTtcbiAgICByZXR1cm4ge1xuICAgICAgdnRyZWUkOiBpdGVtcyQuY29tYmluZUxhdGVzdChhY3RpdmUkLCAoaXRlbXMsIGFjdGl2ZSkgPT4ge1xuICAgICAgICBsZXQgdG90YWxQcmljZSA9IGl0ZW1zXG4gICAgICAgICAgLmZpbHRlcihpdGVtID0+IGFjdGl2ZS5pbmRleE9mKGl0ZW0ubmFtZSkgIT0gLTEpXG4gICAgICAgICAgLnJlZHVjZSgoc3VtLCBpdGVtKSA9PiAoc3VtICsgaXRlbS5wcmljZSksIDApO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIGgoJ2RpdicsIG51bGwsIFtcbiAgICAgICAgICAgIGgoJ25hdicsIG51bGwsIFtcbiAgICAgICAgICAgICAgaXRlbXMubWFwKGl0ZW0gPT5cbiAgICAgICAgICAgICAgICBoKCdkaXYnLCB7YXR0cmlidXRlczoge1wiZGF0YS1uYW1lXCI6IGl0ZW0ubmFtZX0sIGtleTogaXRlbS5uYW1lLFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBtYWtlQ2xhc3Moe1wiaXRlbVwiOiB0cnVlLCBhY3RpdmU6IGFjdGl2ZS5pbmRleE9mKGl0ZW0ubmFtZSkgIT0gLTF9KX0sIFtcbiAgICAgICAgICAgICAgICAgIGl0ZW0ubmFtZSwgXCIgXCIsIGgoJ2InLCBudWxsLCBbXCIkXCIsIGl0ZW0ucHJpY2UudG9GaXhlZCgyKV0pXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgaCgnZGl2JywgbnVsbCwgW1xuICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiLCBoKCdiJywgbnVsbCwgW1wiJFwiLCB0b3RhbFByaWNlLnRvRml4ZWQoMildKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKVxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgICAvLyBUT0RPIGh0dHBzOi8vZ2l0aHViLmNvbS9hbGV4bWluZ29pYS9qc3gtdHJhbnNmb3JtL2lzc3Vlcy8xNVxuICAgIH07XG4gIH0pO1xuXG4gIGxldCBJbnRlbnQgPSBDeWNsZS5jcmVhdGVJbnRlbnQoVXNlciA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNlbGVjdE9yVW5zZWxlY3QkOiBVc2VyLmV2ZW50JChcIm5hdiAuaXRlbVwiLCBcImNsaWNrXCIpXG4gICAgICAgIC5tYXAoZXZlbnQgPT4gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWUpLFxuICAgIH07XG4gIH0pO1xuXG4gIFVzZXIuaW5qZWN0KFZpZXcpLmluamVjdChNb2RlbCkuaW5qZWN0KEludGVudCwgUHJvcHMpWzBdLmluamVjdChVc2VyKTtcbn0pO1xuIiwiLy8gSU1QT1JUUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxucmVxdWlyZShcImJhYmVsL3BvbHlmaWxsXCIpO1xuXG4vLyBTSElNUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5sZXQgQ3ljbGUgPSByZXF1aXJlKFwiY3ljbGVqc1wiKTtcbmxldCB7Unh9ID0gQ3ljbGU7XG5cbkN5Y2xlLmxhdGVzdCA9IGZ1bmN0aW9uIChEYXRhTm9kZSwga2V5cywgcmVzdWx0U2VsZWN0b3IpIHtcbiAgbGV0IG9ic2VydmFibGVzID0ga2V5cy5tYXAoa2V5ID0+IERhdGFOb2RlLmdldChrZXkpKTtcbiAgbGV0IGFyZ3MgPSBvYnNlcnZhYmxlcy5jb25jYXQoW1xuICAgIGZ1bmN0aW9uIHNlbGVjdG9yKC4uLmxpc3QpIHtcbiAgICAgIGxldCBpdGVtID0ga2V5cy5yZWR1Y2UoKGl0ZW0sIGtleSkgPT4ge1xuICAgICAgICBpdGVtW2tleS5zbGljZSgwLCAtMSldID0gbGlzdFtrZXlzLmluZGV4T2Yoa2V5KV07XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfSwge30pO1xuICAgICAgcmV0dXJuIHJlc3VsdFNlbGVjdG9yKGl0ZW0pO1xuICAgIH1cbiAgXSk7XG4gIHJldHVybiBSeC5PYnNlcnZhYmxlLmNvbWJpbmVMYXRlc3QuYXBwbHkobnVsbCwgYXJncyk7XG59O1xuXG5jb25zb2xlLnNweSA9IGZ1bmN0aW9uIHNweSguLi5wYXJhbXMpIHtcbiAgcmV0dXJuIGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSwgLi4ucGFyYW1zKTtcbn07Il19
