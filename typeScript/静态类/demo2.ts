

class Student {
    fullName: string;
    constructor(public firstName:string, public middleInitial:string, public lastName:string,public a : number) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
    a:number;
}

function greeter(person : Person) {
    return person
}

let user = new Student("Jane", "M.", "User",2);

console.log(greeter(user))