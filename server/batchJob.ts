import shell from 'shelljs';

const checkRepoUpTodate = (): boolean => {
  if (
    !shell
      .pwd()
      .toString()
      .includes('gwent-data-release')
  )
    shell.cd('./gwent-data-release');
  const gitPullStatus = shell.exec('git pull', { silent: true }).stdout;
  if (gitPullStatus.toString().includes('Already up to date.')) {
    return true;
  }
  return false;
};

export default checkRepoUpTodate;
