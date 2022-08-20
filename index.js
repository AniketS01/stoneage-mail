#!/usr/bin/env node
import inquirer from "inquirer";
import nodemailer from "nodemailer";

inquirer
  .prompt([
    {
      type: "list",
      message: "Do you have any attachments?",
      name: "decision",
      choices: ["Yes", "No"],
    },
  ])
  .then((answers) => {
    if (answers.decision === "Yes") {
      inquirer
        .prompt([
          {
            type: String,
            name: "email",
            message: "What is your email?",
          },
          {
            type: "password",
            name: "pass",
            message: "Enter your google app password",
          },
          {
            type: String,
            name: "toemail",
            message: "To: ",
          },
          {
            type: String,
            name: "subject",
            message: "Subject: ",
          },
          {
            type: String,
            name: "text",
            message: "Text: ",
          },
          {
            type: String,
            name: "attachment",
            message: "Attachment path:",
          },
        ])
        .then((answers) => {
          let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: answers.email,
              pass: answers.pass,
            },
          });

          const info = {
            to: answers.toemail,
            subject: answers.subject,
            text: answers.text,
            attachments: [
              {
                path: answers.attachment,
              },
            ],
          };

          transporter.sendMail(info, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Success!!".green + " " + info.response.yellow);
            }
          });
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    } else {
      inquirer
        .prompt([
          {
            type: String,
            name: "email",
            message: "what is your email?",
          },
          {
            type: "password",
            name: "pass",
            message: "enter your password",
          },
          {
            type: String,
            name: "toemail",
            message: "to: ",
          },
          {
            type: String,
            name: "subject",
            message: "subject: ",
          },
          {
            type: String,
            name: "text",
            message: "text: ",
          },
        ])
        .then((answers) => {
          let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: answers.email,
              pass: answers.pass,
            },
          });

          const info = {
            to: answers.toemail,
            subject: answers.subject,
            text: answers.text,
          };

          transporter.sendMail(info, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Success!!".green + " " + info.response.yellow);
            }
          });
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    }
  });
