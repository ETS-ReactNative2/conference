import React from 'react';
import App from '../App';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'

Enzyme.configure({ adapter: new Adapter()})

const initialState = {
  loaded: true
}
const middlewares = [thunk]
const mockStore = configureStore(middlewares);
let store;

describe('App Component', () => {

  beforeEach(() => {
    store = mockStore({
        startup: initialState
    })
  })

  it('renders without crashing', () => { 
    const wrapper = shallow(<App store={store} />).dive();
    expect(wrapper).not.toBe(null)
  });
})