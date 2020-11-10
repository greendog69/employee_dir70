import React, { Component } from "react";

export default class DataArea extends Component {
    state = {
    employees: [],
    allEmployees: [],
    sortConfig:"age",
    direction:"ascending"
    };
    headings = ["name..."];

    componentDidMount() {
    fetch("/employees.json")
        .then(function (response) {
            return response.json();
        })
        .then((response) => {
        this.setState({
            employees: response,
            allEmployees: response,
            isLoading: false,
        });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handlePositionChange = (event) => {
    const position = event.target.value;
    if (position === "All") {
            this.setState({ employees: this.state.allEmployees });
        } else {
            this.setState({
            employees: this.state.allEmployees.filter(function (employee) {
                if (employee.position === position) {
                return true;
                }
                return false;
            }),
        });
    }
    };

    setSortConfig(){
        const {direction} = this.state;
        
        this.setState(prevState => ({
            employees: prevState.employees.sort(function(a, b){
                
                return (direction === "descending" ? a.age-b.age : b.age-a.age);
            })
        }));
    }
    requestSort = key => {
        this.setState(prevState => ({
            sortConfig: key,
            direction: prevState.direction === "ascending"?"descending":"ascending"
        }));
        this.setSortConfig();
        
    };

  render() {
      console.log("test", this.state.sortConfig, this.state.direction,this.state.employees);
    return (
      <div>
        <div>
          <label htmlFor="position">Filter by position:</label>
          <select onChange={this.handlePositionChange} id="position">
            <option value="All">All</option>
            <option value="Sound Engineer">Sound Engineer</option>
            <option value="Producer">Producer</option>
            <option value="Music Engineer">Music Engineer</option>
            <option value="Tech Support">Tech Support</option>
          </select>
        </div>
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Profile Pic</th>
              <th>Name</th>
              <th>Position</th>
              <th onClick={() => this.requestSort('age')} className={this.state.direction === "descending" ? "descending":"ascending"}>Age</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map(function (employee) {
              return (
                <tr key={employee.id}>
                  <td>
                    <img alt="pic" src={employee.pic}></img>
                  </td>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>{employee.age}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
