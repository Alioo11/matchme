import consoleColors from "../constants/console";

class Console {
  static cons = console;
  static log = (message: any) => this.cons.log(message);
  static table = (message: any) => this.cons.table(message);
  static error = (message: any) => this.cons.error(message);
  static red = (message: any) => this.cons.log(`${consoleColors.red}${message}`);
  static green = (message: any) => this.cons.log(`${consoleColors.green}${message}`);
  static yellow = (message: any) => this.cons.log(`${consoleColors.yellow}${message}`);
  static blue = (message: any) => this.cons.log(`${consoleColors.blue}${message}`);
  static magenta = (message: any) => this.cons.log(`${consoleColors.magenta}${message}`);
  static cyan = (message: any) => this.cons.log(`${consoleColors.cyan}${message}`);
}


export default Console;