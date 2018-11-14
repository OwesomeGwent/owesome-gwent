const randomPicker = (arr: any[]): any => {
  const a = arr[Math.floor(Math.random() * arr.length)];
  return a;
};

export default randomPicker;
