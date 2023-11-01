import React from 'react';
import { Button, Navbar, Alignment, Card, Dialog, DialogProps, FormGroup, InputGroup, NumericInput, Icon } from "@blueprintjs/core";
import { Cell, Column, Table2 } from "@blueprintjs/table";
import { DatePicker, TimePrecision } from "@blueprintjs/datetime";
import logo from './logo.svg';
import './App.css';
import "@blueprintjs/table/lib/css/table.css";
import { DIALOG_FOOTER, INTENT_PRIMARY } from '@blueprintjs/core/lib/esm/common/classes';
import { get_copy } from './common';

class WorkoutSet {
  constructor() {
    this.reps = 0;
    this.weight = 0;
  }
  reps: number;
  weight: number;
}

class AddWorkoutState {
  constructor() {
    this.name = "";
    this.sets = new Array<WorkoutSet>();
    this.sets.push(new WorkoutSet());
  }
  name: string;
  sets: Array<WorkoutSet>;
}

class AppState {
  constructor() {
    this.currentPane = "Home";
    this.workoutStarted = false;
    this.showStartWorkoutDialog = false;
    this.showAddWorkoutDialog = false;
    this.addWorkoutState = new AddWorkoutState();
    this.workouts = new Array<AddWorkoutState>();
  }

  currentPane: string;
  workoutStarted: boolean;
  showStartWorkoutDialog: boolean;
  showAddWorkoutDialog: boolean;
  addWorkoutState: AddWorkoutState;
  workouts: Array<AddWorkoutState>;

}

class AppProps {

}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = new AppState();
  }

  selectHome() {
    let copy = get_copy<AppState>(this.state);
    copy.currentPane = "Home";
    this.setState(copy);
  }

  selectWorkout() {
    let copy = get_copy<AppState>(this.state);
    copy.currentPane = "Workout";
    this.setState(copy);
  }

  selectProgress() {
    let copy = get_copy<AppState>(this.state);
    copy.currentPane = "Progress";
    this.setState(copy);
  }

  showStartWorkout() {
    let copy = get_copy<AppState>(this.state);
    copy.showStartWorkoutDialog = true;
    this.setState(copy);
  }

  hideStartWorkout() {
    let copy = get_copy<AppState>(this.state);
    copy.showStartWorkoutDialog = false;
    this.setState(copy);
  }

  showAddWorkout() {
    let copy = get_copy<AppState>(this.state);
    copy.showAddWorkoutDialog = true;
    this.setState(copy);
  }

  hideAddWorkout() {
    let copy = get_copy<AppState>(this.state);
    copy.showAddWorkoutDialog = false;
    this.setState(copy);
  }

  handleAddWorkout() {
    let copy: AppState = get_copy<AppState>(this.state);
    copy.showAddWorkoutDialog = false;
    copy.workouts.push(copy.addWorkoutState);
    copy.addWorkoutState = new AddWorkoutState();
    this.setState(copy);
  }

  handleWorkoutStarted() {
    let copy = get_copy<AppState>(this.state);
    copy.showStartWorkoutDialog = false;
    copy.workoutStarted = true;
    this.setState(copy);
  }

  handleRepsChange(_valueAsNumber: number, valueAsString: string, index: number) {
    let copy = get_copy(this.state);
    copy.addWorkoutState.sets[index].reps = Number(valueAsString);
    this.setState(copy);
  }

  handleWeightChange(_valueAsNumber: number, valueAsString: string, index: number) {
    let copy = get_copy(this.state);
    copy.addWorkoutState.sets[index].weight = Number(valueAsString);
    this.setState(copy);
  }

  handleNameChange(newValue: string) {
    let copy = get_copy(this.state);
    copy.addWorkoutState.name = newValue;
    this.setState(copy);
  }

  nameCellRenderer(rowIndex: number, colIndex: number) { 
    return <Cell>{this.state.workouts[rowIndex].name}</Cell>;
  }

  setsCellRenderer(rowIndex: number, colIndex: number) { 
    return <Cell>{this.state.workouts[rowIndex].sets.length}</Cell>;
  }

  render_workout_sets():  Array<JSX.Element>  {
    let sets_ar = new Array<JSX.Element>();
    for (let i = 0; i < this.state.addWorkoutState.sets.length; i++) {
      sets_ar.push(
        <Card elevation={2} style={{alignSelf: "center"}} >
            <FormGroup label="Reps" style={{alignItems: "center"}}>
              <NumericInput value={this.state.addWorkoutState.sets[i].reps} onValueChange={(n, t) => this.handleRepsChange(n, t, i)}/>
            </FormGroup>
            <FormGroup label="Weight" style={{alignItems: "center"}} >
              <NumericInput value={this.state.addWorkoutState.sets[i].weight} onValueChange={(n, t) => this.handleWeightChange(n, t, i)}/>
            </FormGroup>
          </Card>
      );
    }
    return sets_ar;
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
      
      <div id="home_section" style={{display: this.state.currentPane === "Home" ? "inline-block" : "none"}}>
        <Button text="Home button"/>
      </div>

      <div id="workout_section" style={{display: this.state.currentPane === "Workout" ? "inline-block" : "none"}}>

        <div id="start_workout_section">
          <Button text="Start Workout" intent="success" onClick={() => this.showStartWorkout()} style={{display: this.state.workoutStarted ? "none" : "inline-block"}}/>
          <Dialog icon="walk" title="Start Workout" isOpen={this.state.showStartWorkoutDialog} onClose={() => this.hideStartWorkout()}>
            <FormGroup label="Set the starting time for workout" > 
              <DatePicker timePrecision={TimePrecision.MINUTE} timePickerProps={{showArrowButtons: true, useAmPm: true}} />
            </FormGroup>
            <div className={DIALOG_FOOTER} >
              <Button text="Start Workout" intent="primary" onClick={ () => this.handleWorkoutStarted() } />
            </div>
          
          </Dialog>
        </div>

       
        
        <div id="current_workout_section" style={{display: !this.state.workoutStarted ? "none" : "inline-grid"}}>

          <div id="workout_table">
            <Table2 numRows={this.state.workouts.length} enableGhostCells={true} enableFocusedCell={true}>
              <Column name="Name" cellRenderer={(r,c) => this.nameCellRenderer(r,c)}></Column>
              <Column name="Sets" cellRenderer={(r,c) => this.setsCellRenderer(r,c)}></Column>
            </Table2>
          </div>

          <div id="add_workout_section">
            <Button minimal={true} intent="primary" onClick={() => this.showAddWorkout()}>
              <Icon icon="add" size={128} intent="primary"/>
            </Button>

            <Dialog icon="plus" title="Add Workout" isOpen={this.state.showAddWorkoutDialog} onClose={() => this.hideAddWorkout()}>
                <FormGroup label="Workout Name" style={{alignItems: "center"}}>
                  <InputGroup value={this.state.addWorkoutState.name} onChange={(t) => this.handleNameChange(t.target.value)} />
                </FormGroup>
                <div style={{alignSelf: "center"}} >
                  {this.render_workout_sets()}
                </div>
                <div className={DIALOG_FOOTER} >
                  <Button text="Add Set" intent="success"/>
                  <Button text="Finish Exercise" intent="primary" onClick={() => this.handleAddWorkout() } style={{margin: "0 0 0 280px"}} />
                </div>
            
            </Dialog>

          </div>

          <Button text="End Workout" intent="danger"/>
        </div>
      </div>

      <div id="progress_section" style={{display: this.state.currentPane === "Progress" ? "inline-block" : "none"}}>
        <Button text="progress button"/>
      </div>

    </div>
  );
}
}

export default App;
