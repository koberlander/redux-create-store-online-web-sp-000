//in order to abstract the reducer method so that it may handle more action.type's than just increaseCount, we pass in the  reducwer to our createStore method
// function createStore(){ updated to code below
function createStore(reducer){
  let state;
  //state is now accessible to dispatch

  //update changeCount to a generic reducer so it can handle multiple action.types
  // function dispatch(action){
  //   state = changeCount(state, action);
  //   render();
  // };

  //code replaces above block to abstract our reducer method (changeCount)
  function dispatch(action){
    state = reducer(state, action)
    render()
  }

  //include this method in createStore so that we can access state
  function getState(){
    return state
  }

  //return a js obj that has access to the dispatch method
  return {
    dispatch,
    getState
  }
}

//call createStore() and set the returned store to a var. Call dispatch on store to 'set' initial state (by using @@INIT)
//abstract reducer later so that createStore can be passed an action.type, not just changeCount
// let store = createStore() ##code updated to comply with above action
let store = createStore(changeCount)
store.dispatch({type: '@@INIT'})



//this is where we set our state's actual default key/value and use a switch statement to do whatever case statement we wish. Here, we only have an INCREASE_COUNT case but others could go here as well
function changeCount(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };

    default:
      return state;
  }
};


function render() {
  let container = document.getElementById('container');

  //replace 'state' with 'store' here since store now holds our state. call getState() and use dot notation to access the state's key. in this case, 'count' which updates a number each time we click a btn
  container.textContent = store.getState().count;
};

dispatch({ type: '@@INIT' })
let button = document.getElementById('button');

button.addEventListener('click', function() {
  //call the dispatch method on store and pass in the action of type INCREASE_COUNT
    store.dispatch({ type: 'INCREASE_COUNT' });
})
