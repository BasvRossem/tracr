export class Ticket {
  constructor(public title: string, public name: string, public tooltip: string) {
  }

  toString() {
    return `${this.title} ${this.name} ${this.tooltip}`;
  }
}