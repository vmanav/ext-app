import React, { Component } from 'react';
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
        this.setState({
            users: ['test user'],
            username: 'test user'
        })
    }

    handleUsernameChange(event) {
        console.log("onChange Handler function INCOKED");
        this.setState({
            username: event.target.value
        })
    }

    handleDescriptionChange(event) {
        console.log("onChange Handler function INCOKED");
        this.setState({
            description: event.target.value
        })
    }

    handlDurationChange(event) {
        console.log("onChange Handler function INCOKED");
        this.setState({
            duration: event.target.value
        })
    }

    handleDateChange(newDate) {
        console.log("onChange Handler function INCOKED");
        this.setState({
            date: newDate,
        })
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        }
        console.log("New Exercise => ", exercise);

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