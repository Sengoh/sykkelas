import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { studentService } from './services';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <div>
        <NavLink to="/students">Students</NavLink>
      </div>
    );
  }
}

class StudentList extends Component {
  students = [];

  render() {
    return (
      <ul>
        {this.students.map(student => (
          <li key={student.id}>
            <NavLink to={'/students/' + student.id + '/edit'}>{student.name}</NavLink>
          </li>
        ))}
      </ul>
    );
  }

  mounted() {
    studentService.getStudents(students => {
      this.students = students;
    });
  }
}

class StudentEdit extends Component {
  name = '';
  email = '';

  render() {
    return (
      <form>
        Name: <input type="text" value={this.name} onChange={event => (this.name = event.target.value)} />
        Email: <input type="text" value={this.email} onChange={event => (this.email = event.target.value)} />
        <button type="button" onClick={this.save}>
          Save
        </button>
      </form>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, student => {
      this.name = student.name;
      this.email = student.email;
    });
  }

  save() {
    studentService.updateStudent(this.props.match.params.id, this.name, this.email, () => {
      history.push('/students');
    });
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/students" component={StudentList} />
      <Route path="/students/:id/edit" component={StudentEdit} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
