
 const chalk = require('chalk');

/*
* Export named fuction to connect with DB
*/
exports.getEnvironmentInfo = function () {
  var os = require("os");

  // OS type
  console.log(chalk.magentaBright('Type : ' + os.type()));
  // OS platform
  console.log(chalk.magentaBright('Platform : ' + os.platform()));
  //OS uptime
  console.log(chalk.magentaBright('Up Time : ' + os.uptime()));
  //CPU Info
  console.log(chalk.magentaBright('CPU Info : ' + os.cpus()));
  //CPU architecture
  console.log(chalk.magentaBright('CPU Arch : ' + os.arch()));
  // Endianness
  console.log(chalk.magentaBright('endianness : ' + os.endianness()));
  // Total system memory
  console.log(chalk.magentaBright('Total memory : ' + os.totalmem() + " bytes."));
  // Total free memory
  console.log(chalk.magentaBright('Free memory : ' + os.freemem() + " bytes."));

}
