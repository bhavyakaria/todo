import React, { Component } from 'react';
import Todos from './components/Todos';
import './App.css';

class App extends Component {
  state = {
    todods: [
      {
        id: 1,
        title: 'Take out trash',
        completed: false,
      },
      {
        id: 2,
        title: 'Meeting with boss',
        completed: true,
      },
      {
        id: 3,
        title: 'Call Joe',
        completed: false,
      }
    ]
  };

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

  delTodo = id => {
    this.setState({
      todos: this.state.todods.filter(todo => todo.id !== id)
    });
  }

  render() {
    return (
      <div className="App">
        <h1>App</h1>
        <Todos todos={this.state.todods} delTodo={this.delTodo} markComplete={this.markComplete} />
      </div>
    );
  }
}

export default App;
