import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleUsernameChange(event) {
        console.log("onChange Handler function INCOKED");
        this.setState({
            username: event.target.value
        })
    }


    handleFormSubmit(event) {
        event.preventDefault();

        const newUser = {
            username: this.state.username,
        }
        console.log("New USER => ", newUser);

        // CREATING POST REQUESTto backend  
        axios.post('http://localhost:5000/users/add', newUser)
            .then((res) => {
                console.log("res => ", res);
                console.log(res.data);
            });
        // NOTE : 
        // Now, After someone has added a user,
        // we will set the state to null again if someone eants to add more users
        this.setState({
            username: '',
        })
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }

}

export default CreateUser;