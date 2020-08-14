import React, { Component } from 'react';
import Todos from './components/Todos';
import './App.css';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Axios from 'axios';

class App extends Component {
  state = {
    todods: [
    ]
  };

  componentDidMount() {
    Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => {
        this.setState({ todods: res.data })
      })
  }

  // Toggle Complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todods.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    });
  }

  // Delete Todos
  delTodo = (id) => {
    const remainder = this.state.todods.filter((todo) => {
      if (todo.id !== id) return todo;
    });
    this.setState({ todods: remainder });
  }

  addTodo = (title) => {
    Axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    }).then(res => this.setState({ todods: [...this.state.todods, res.data] }));

  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <h1>App</h1>
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todods} delTodo={this.delTodo} markComplete={this.markComplete} />
              </React.Fragment>
            )}>
            </Route>
            <Route exact path="/about" component={About}></Route>

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
