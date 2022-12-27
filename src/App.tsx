import React from 'react';
import { Button, Navbar, Alignment, Card, Dialog } from "@blueprintjs/core";
import logo from './logo.svg';
import './App.css';

class AppState {
  constructor() {
    this.currentPane = "Home";
    this.workoutStarted = false;
    this.showStartWorkoutDialog = false;
  }

  currentPane: string;
  workoutStarted: boolean;
  showStartWorkoutDialog: boolean;

}

function get_copy<T>(rhs: T) : any {
  return JSON.parse(JSON.stringify(rhs)) as any;
}

class AppProps {

}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = new AppState();
  }

  selectHome() {
    let copy = get_copy(this.state);
    copy.currentPane = "Home";
    this.setState(copy);
  }

  selectWorkout() {
    let copy = get_copy(this.state);
    copy.currentPane = "Workout";
    this.setState(copy);
  }

  selectProgress() {
    let copy = get_copy(this.state);
    copy.currentPane = "Progress";
    this.setState(copy);
  }

  showStartWorkout() {
    let copy = get_copy(this.state);
    copy.showStartWorkoutDialog = true;
    this.setState(copy);
  }

  hideStartWorkout() {
    let copy = get_copy(this.state);
    copy.showStartWorkoutDialog = false;
    this.setState(copy);
  }

  render() {
  return (
    <div className="App">
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Weight-Mate</Navbar.Heading>
          <Navbar.Divider/>
         <Button text="Home" minimal={true} icon="home" intent={this.state.currentPane === "Home" ? "primary" : "none"} onClick={() => this.selectHome()} />
         <Button text="Workout" minimal={true} icon="walk" intent={this.state.currentPane === "Workout" ? "primary" : "none"} onClick={() => this.selectWorkout()}/>
         <Button text="Progress" minimal={true} icon="timeline-line-chart" intent={this.state.currentPane === "Progress" ? "primary" : "none"} onClick={() => this.selectProgress()}/>
         
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Button minimal={true} icon="user"/>
          <Button minimal={true} icon="notifications"/>
          <Button minimal={true} icon="cog"/>
        </Navbar.Group>
      </Navbar>
      
      <Card id="home_card" style={{display: this.state.currentPane === "Home" ? "inline-block" : "none"}}>
        <Button text="Home button"/>
      </Card>
      <Card id="workout_card" style={{display: this.state.currentPane === "Workout" ? "inline-block" : "none"}}>
        <Button text="Start Workout" intent="primary" onClick={() => this.showStartWorkout()} />
        <Dialog icon="walk" title="Start Workout" isOpen={this.state.showStartWorkoutDialog} onClose={() => this.hideStartWorkout()}>
        </Dialog>
        <Button text="End Workout"/>
      </Card>
      <Card id="progress_card" style={{display: this.state.currentPane === "Progress" ? "inline-block" : "none"}}>
        <Button text="progress button"/>
      </Card>
    </div>
  );
}
}

export default App;
