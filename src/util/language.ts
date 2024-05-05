export function convertToVietnamese(num: number) {
  const units = [
    "",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];
  const tens = [
    "",
    "mười",
    "hai mươi",
    "ba mươi",
    "bốn mươi",
    "năm mươi",
    "sáu mươi",
    "bảy mươi",
    "tám mươi",
    "chín mươi",
  ];
  const hundreds = [
    "",
    "một trăm",
    "hai trăm",
    "ba trăm",
    "bốn trăm",
    "năm trăm",
    "sáu trăm",
    "bảy trăm",
    "tám trăm",
    "chín trăm",
  ];

  let result = "";
  let numStr = num.toString();

  if (numStr.length === 6) {
    result += hundreds[parseInt(numStr[0])] + " ";
    numStr = numStr.slice(1);
  }

  if (numStr.length === 5) {
    if (
      num.toString()?.length === 6 &&
      num.toString()[1] === "0" &&
      num.toString()[2] !== "0"
    ) {
      result += "linh" + " ";
      numStr = numStr.slice(1);
    } else {
      result += tens[parseInt(numStr[0])] + " ";
      numStr = numStr.slice(1);
    }
  }

  if (numStr.length === 4) {
    if (num.toString()?.length > 4 && numStr[0] === "5") {
      result += "lăm" + " ";
    } else {
      result += units[parseInt(numStr[0])];
    }
    result += " nghìn ";
    numStr = numStr.slice(1);
  }

  if (numStr.length === 3) {
    result += hundreds[parseInt(numStr[0])] + " ";
    numStr = numStr.slice(1);
  }

  if (numStr.length === 2) {
    result += tens[parseInt(numStr[0])] + " ";
    numStr = numStr.slice(1);
  }

  if (numStr.length === 1) {
    result += units[parseInt(numStr[0])];
  }

  // data letter to uppercase
  result = result.charAt(0).toUpperCase() + result.slice(1);
  return result.trim() + " đồng";
}
