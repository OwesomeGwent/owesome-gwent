import shelljs from 'shelljs';

const checkRepoUpToDate = (): boolean => {
  if (
    !shelljs
      .pwd()
      .toString()
      .includes('gwent-data-release')
  ) {
    shelljs.cd('./gwent-data-release');
  }
  const gitPullStatus = shelljs.exec('git pull', { silent: true }).stdout;
  if (gitPullStatus.toString().includes('Already up to date.')) {
    return true;
  }
  return false;
};

export default checkRepoUpToDate;
