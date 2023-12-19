import prompt from "prompt";
import chalk from "chalk";
import { createObjectCsvWriter } from "csv-writer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";

prompt.start()
prompt.message = "";

class Person {
  constructor(name = "", number = "", email = "") {
    (this.name = name), (this.number = number), (this.email = email)
  }
  saveToCsv() {
    try {
      const { name, number, email } = this;
      csvWriter.writeRecords([{ name, number, email }]);
      console.log(chalk.greenBright(`${name} Saved!`))
    } catch (err) {
      console.error(chalk.redBright(err))
    }
  }
}

const csvWriter = createObjectCsvWriter({
  path: "./contacts.csv",
  append: true,
  header: [
    { id: "name", title: "NAME" },
    { id: "number", title: "NUMBER" },
    { id: "email", title: "EMAIL" }
  ]
});

const startApp = async () => {
  const person = new Person();
  const responses = await prompt.get([
    {
      name: "name",
      description: chalk.blueBright("Contact Name"),
    },
    {
      name: "number",
      description: chalk.blueBright("Contact Number"),
    },
    {
      name: "email",
      description: chalk.blueBright("Contact Email"),
    },
  ]);
  Object.assign(person, responses);
  person.saveToCsv();
  const { again } = await prompt.get([
    {
      name: "again",
      description: chalk.yellowBright("Continue? [y to continue] ")
    }
  ]);
  if (again === "y") await startApp()
};

process.on("SIGINT", () => {
  console.log(chalk.magenta("\nThanks for using the app!"));
  csvWriter.close().then(() => {
    process.exit(0)
  })
});


chalkAnimation.pulse("Welcome to my contact saver app!!");

console.log(gradient.rainbow("This app will help you to create and save contacts.", 2))

startApp();
