export const bytesTypeConversion = (
  bytes: number,
  [maxSize, sizeType]: [number, string],
  numericCalc: number = 1024
) => {
  const allSizeTypes =
    numericCalc === 1024
      ? ["Bytes", "KiB", "MiB", "GiB", "TiB"]
      : ["Bytes", "KB", "MB", "GB", "TB"];
  const i = parseInt(
    String(Math.floor(Math.log(bytes) / Math.log(numericCalc)))
  );
  const size = bytes / Math.pow(numericCalc, i);
  const maxI = allSizeTypes.indexOf(sizeType);
  const hasExceeded = i > maxI || (i == maxI && size > maxSize);
  return {
    sizeType: allSizeTypes[i],
    size,
    hasExceeded,
  };
};
