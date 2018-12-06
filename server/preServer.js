const shell = require('shelljs');

console.log('Checking Gwent Data git repos');
if (
  !shell
    .exec('ls', { silent: true })
    .stdout.toString()
    .includes('gwent-data-release')
) {
  console.log('Fetching Gwent Data git repos');
  if (
    shell.exec('git clone https://github.com/OwesomeGwent/gwent-data-release', {
      silent: true,
    }).code === 0
  ) {
    console.log('SUCCESS!');
    return;
  }
  console.log('FAIL!');
  return;
}
console.log('Gwend Data Exists!');
