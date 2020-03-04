export const convertToUnit = (size: number) => {
    let converted = size / 1024;
    let symbol = " KB";
    if (converted > 1000) {
      converted = converted / 1024;
      symbol = " MB";
      if (converted > 1000) {
        converted = converted / 1024;
        symbol = " GB";
      }
    }
  
    return {
        value: parseFloat(converted.toFixed(2)), 
        symbol: symbol
    }
  };