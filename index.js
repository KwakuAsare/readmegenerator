const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
let badgeIcon = '';

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the title of your project?"
          },
          {
            type: "input",
            name: "description",
            message: "Enter a description of your project"
          },
          {
            type: "input",
            name: "installation",
            message: "Enter installation instructions:"
        },
        {
            type: "input",
            name: "usage",
            message: "Enter usage information:"
        },
        {
            type: "input",
            name: "contribution",
            message: "Enter contribution guidelines:"
        },
        {
            type: "input",
            name: "test",
            message: "Enter test instructions:"
        },
        {
            type: "list",
            name: "license",
            message: "Select a license:",
            choices: ["Apache License 2.0", "MIT", "GNU General Public License v3"]
        },
        {
            type: "input",
            name: "url",
            message: "Enter the URL for your deployed page:"
        },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub Username"
          },
          {
            type: "input",
            name: "email",
            message: "Enter your email address:"
        }
    ]);
}

function formattedFile(answers) {
  switch (`${answers.license}`){
      case "Apache License 2.0":
          badgeIcon = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
          break;
      case "GNU General Public License v3":
          badgeIcon = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
          break;
      case "MIT":
          badgeIcon = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
          break;
  }
}


function generateReadme(answers) {
    return `
    # ${answers.name}
    ${badgeIcon}  
    URL: ${answers.url}
    ## Description:
    ${answers.description}
    ## Table of Contents:
    * Installation
    * Usage
    * Test Instructions
    * Contribution Guidelines
    * License
    * Contact
    ## Installation Instructions:
    ${answers.installation}
    ## Usage Information:
    ${answers.usage}
    ## Test Instructions:
    ${answers.test}
    ## Contribution Guidelines:
    ${answers.contribution}
    ## License: ${answers.license}
    ## Contact: 
    GitHub: [${answers.github}](https://github.com/${answers.github})
    For additional questions please contact: ${answers.email}`
     
}



promptUser()
  .then(function(answers) {
    const read = generateReadme(answers);

    return writeFileAsync("Readme.md", read);
  })
  .then(function() {
    console.log("Successfully wrote to Readme.md");
  })
  .catch(function(err) {
    console.log("Not authorized to write to Readme");
  });
















  
// array of questions for user
// const questions = [

// ];

// function to write README file
// function writeToFile(fileName, data) {
// }

// function to initialize program
// function init() {

// }

// function call to initialize program
//init();
