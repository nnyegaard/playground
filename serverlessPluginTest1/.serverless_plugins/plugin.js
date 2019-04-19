"use strict";

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.commands = {
      test1: {
        usage: "Helps you start your first Serverless plugin",
        lifecycleEvents: ["hello", "world"],
        options: {
          message: {
            usage:
              "Specify the message you want to deploy " +
              "(e.g. \"--message 'My Message'\" or \"-m 'My Message'\")",
            required: false,
            shortcut: "m"
          }
        }
      }
    };

    this.hooks = {
      "before:test1:hello": this.beforeWelcome.bind(this),
      "test1:hello": this.welcomeUser.bind(this),
      "test1:world": this.displayHelloMessage.bind(this),
      "after:test1:world": this.afterHelloWorld.bind(this)
    };
  }

  beforeWelcome() {
    this.serverless.cli.log("Hello from Serverless!");
  }

  welcomeUser() {
    this.serverless.cli.log("Your message:");
  }

  displayHelloMessage() {
    this.serverless.cli.log(`${this.options.message}`);
  }

  afterHelloWorld() {
    this.serverless.cli.log("Please come again!");
  }
}

module.exports = ServerlessPlugin;
