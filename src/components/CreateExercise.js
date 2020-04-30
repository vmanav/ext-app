import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class CreateExercise extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            description: '',
            duration: '',
            date: new Date(),
            users: []
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handlDurationChange = this.handlDurationChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

    }

    componentDidMount() {

        axios.get('http://localhost:5000/users')
            .then((res) => {
                console.log("res => ", res);
                console.log("res => ", res.data);
                if (res.data.length > 0) {
                    // Atleast 1 user in db
                    const usernamesList = res.data.map((userObj) => userObj.username);
                    console.log("List of Usernames available : ", usernamesList);
                    this.setState({
                        users: usernamesList,
                        username: usernamesList[0]
                    })

                }
            })


    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handleDescriptionChange(event) {
        this.setState({
            description: event.target.value
        })
    }

    handlDurationChange(event) {
        this.setState({
            duration: event.target.value
        })
    }

    handleDateChange(newDate) {
        this.setState({
            date: newDate,
        })
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const newExercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        }
        console.log("New Exercise => ", newExercise);

        // making POST REQUEST to backend  
        axios.post('http://localhost:5000/exercises/add', newExercise)
            .then((res) => {
                console.log("res => ", res);
                console.log(res.data);
            });

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.handleUsernameChange}>
                            {
                                this.state.users.map((user) => {
                                    return (
                                        <option
                                            key={user}
                                            value={user}
                                        >
                                            {user}
                                        </option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.handleDescriptionChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.handlDurationChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.handleDateChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateExercise;