class Person {
  constructor (name, age) {
    this.name = name;
    this.age =  age;
  }

  greeting() {
    console.log(this.name + " says hello!");
  }
}

module.exports = Person;
