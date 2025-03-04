export function formatBytes(bytes: string) {
  const byteValue = parseFloat(bytes);

  if (isNaN(byteValue) || byteValue < 0) {
    return "Invalid input";
  }

  const KB = 1000;
  const MB = KB * 1000;
  const GB = MB * 1000;

  if (byteValue >= GB) {
    return (byteValue / GB).toFixed(2) + " GB";
  } else if (byteValue >= MB) {
    return (byteValue / MB).toFixed(2) + " MB";
  } else if (byteValue >= KB) {
    return (byteValue / KB).toFixed(2) + " KB";
  } else {
    return byteValue + " bytes";
  }
}
