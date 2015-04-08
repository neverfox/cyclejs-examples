// IMPORTS =========================================================================================
require("../../common/scripts/polyfills");
let {Rx, h, createStream, render} = require("cyclejs");

// INTERACTIONS ====================================================================================
let interactions$ = createStream(vtree$ => {
  return render(vtree$, "main").interactions$;
});

// [INTERACTIONS] <- INTENT ========================================================================
let changeName$ = createStream(interactions$ => {
  return interactions$.choose("[name=name]", "input").map(event => event.target.value);
});

// [INTENT] <- MODEL ===============================================================================
let name$ = createStream(changeName$ => {
  return changeName$.startWith("");
});

// [MODEL] <- VIEW =================================================================================
let vtree$ = createStream(name$ => {
  return name$.map(name => {
    return (
      <div>
        <div class="form-group">
          <label>Name:</label>
          <input name="name" class="form-control" type="text"/>
        </div>
        <hr/>
        <h1>Hello {name}!</h1>
      </div>
    );
  });
});

// CYCLE ===========================================================================================
interactions$.inject(vtree$);
vtree$.inject(name$);
name$.inject(changeName$);
changeName$.inject(interactions$);
