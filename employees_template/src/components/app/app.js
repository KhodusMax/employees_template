import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empls: [
        {name: 'first emp', salary: 800, increase: false, like: true, id: 1},
        {name: 'second emp', salary: 3000, increase: true, like: false, id: 2},
        {name: 'third emp', salary: 51000, increase: false, like: false, id: 3}
      ],
      term: '',
      filter: 'all'
    }
    this.id = 4;
  }

  deleteItem = (id) => {
    this.setState(({empls})=> {
      return {empls: empls.filter(elem => elem.id !== id)}
    })
  }

  onAdd = (newEmpl) => {
    newEmpl.id = this.id;
    newEmpl.increase = false;
    newEmpl.like = false;
    this.id++;
    let newArr = [newEmpl];
    this.setState(({empls}) => {
      return {empls: [...empls, ...newArr]};
    })
  }

  onToggleProp = (id, prop) => {
    this.setState(({empls}) => ({
      empls: empls.map(elem => {
        if (elem.id === id) {
          return {...elem, [prop]: !elem[prop]};
        }
        return elem;
      })
    }))
  }

  onSearch = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter(items => {
      return items.name.indexOf(term) > -1;
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term})
  }

  filterPost = (items, filter) => {
    switch (filter) {
      case 'like':
        return items.filter(item => item.like);
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000);
      default:
        return items;
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter});
  }

  render() {
    const {empls, term, filter} = this.state;
    const employees = this.state.empls.length;
    const increased = this.state.empls.filter(elem => elem.increase).length;
    const visibleData = this.filterPost(this.onSearch(empls, term), filter);

    return (
      <div className="app">
          <AppInfo 
            employees={employees}
            increased={increased}/>
  
          <div className="search-panel">
              <SearchPanel
                onUpdateSearch={this.onUpdateSearch}/>
              <AppFilter
                filter={filter}
                onFilterSelect={this.onFilterSelect}/>
          </div>
          
          <EmployeesList 
            data={visibleData} 
            onDelete={this.deleteItem}
            onToggleProp={this.onToggleProp}/>
          <EmployeesAddForm 
            onAddEmployee={this.onAdd}/>
      </div>
    );
  }
}

export default App;
