import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Exercise Component
const Exercise = (props) => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>edit</Link>
            |
            <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
)

class ExercisesList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            exercises: []
        }

        this.deleteExercise = this.deleteExercise.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises')
            .then((res) => {
                console.log("res => ", res);
                this.setState({
                    exercises: res.data,
                })

                console.log("Updated STATE : ", this.state.exercises);
            })
            .catch((error) => {
                console.log("Error : ", error);
            })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises' + id)
            .then((res) => {
                console.log(res.data);
            })

        this.setState({
            exercises: this.state.exercises.filter(element => element._id !== id)
        })
    }

    ExerciseListFunction() {
        return (
            this.state.exercises.map((exercise) => {
                return (
                    <Exercise
                        exercise={exercise}
                        deleteExercise={this.deleteExercise}
                        key={exercise._id}
                    />
                )
            })
        )
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.ExerciseListFunction()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ExercisesList;