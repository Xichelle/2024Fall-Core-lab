// Create a class
class Appliance {
    constructor(brand, model, cycle) {
      this.brand = brand;
      this.model = model;
      this.cycle = cycle;
      this.isRunning = false;
    }
  
    // Method to start the appliance
    start() {
      if (!this.isRunning) {
        this.isRunning = true;
        console.log(`${this.brand} ${this.model} has started on ${this.cycle} cycle.`);
      } else {
        console.log(`${this.brand} ${this.model} is already running.`);
      }
    }
  
    // Method to change the cycle
    changeCycle(newCycle) {
      if (this.isRunning) {
        console.log(`Cannot change the cycle while the machine is running.`);
      } else {
        this.cycle = newCycle;
        console.log(`${this.brand} ${this.model} cycle has been changed to ${this.cycle}.`);
      }
    }
  
    // Method to stop the appliance
    stop() {
      if (this.isRunning) {
        this.isRunning = false;
        console.log(`${this.brand} ${this.model} has stopped.`);
      } else {
        console.log(`${this.brand} ${this.model} is not running.`);
      }
    }
  }
  
  // Instantiate objects
  const washingMachine = new Appliance('Samsung', 'EcoBubble', 'Normal');
  const dishwasher = new Appliance('Bosch', 'Series 6', 'Eco');
  
  // Interact with the objects
  washingMachine.start(); 
  washingMachine.changeCycle('Delicate'); 
  washingMachine.stop(); 
  washingMachine.changeCycle('Delicate'); 
  
  dishwasher.start(); 
  dishwasher.stop(); 
  