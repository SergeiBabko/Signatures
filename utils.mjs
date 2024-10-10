export const randomInRange = (min, max, multiple = 1) => {
  min = Math.ceil(min / multiple) * multiple;
  max = Math.floor(max / multiple) * multiple;
  return (
    Math.floor(Math.random() * ((max - min) / multiple + 1)) * multiple + min
  );
};

export const appendChild = (root, child) => {
  if (child) root.appendChild(child);
};
