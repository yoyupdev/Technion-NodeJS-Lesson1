const fs = require("fs");
const path = require("path");

// O(n^3) because we have three-levels loop with unknown count of iterations, because it depends on file's lines count

// Declaring pathes of files to read and file to write to
const file1Path = path.join(__dirname, "txt", "text1.txt");
const file2Path = path.join(__dirname, "txt", "text2.txt");
const file3Path = path.join(__dirname, "txt", "text3.txt");
const outputFile = path.join(__dirname, "txt", "output.txt");

// Declaring array for next operations using loop
const filePathsArr = [file1Path, file2Path, file3Path];
const filesLines = [];

// Declaring variable to save max file's lines count
let maxCountOfLines = -1;
// Loop for finding max file's lines count
for (let i = 0; i < filePathsArr.length; i++) {
  // Reading file
  const content = fs.readFileSync(filePathsArr[i], "utf-8");
  //   Converting string to array
  filesLines[i] = content.split("\n");
  //   Getting lines count
  const linesCount = content.split("\n").length;
  //   Check block if previously saved less than current
  if (maxCountOfLines < linesCount) maxCountOfLines = linesCount;
}

// Declaring fileLines variable to make it more effective and not creating each iteration new variable
// Declaring k and step variables to modify according to iteration and to write correct count of lines each iteration
let fileLines, step, k;
// We are running first-level loop so that count of iterations is equal to max count of lines of one of the files
for (let i = 0; i < maxCountOfLines; i++) {
  // We are running on each file
  for (let j = 0; j < filesLines.length; j++) {
    // Saving lines to fileLines that match to current file
    fileLines = filesLines[j];
    // Writing into file only if the file really has line number - i
    if (fileLines[i]) {
      // In the first iteration change the step to 1 to take only one line
      if (i == 0) step = 1;
      // In the second iteration change the step to 3 to take only two lines
      else if (i == 1) step = 3;
      // In the other iterations change the step to i * 2 + 1 to take appropriate count of lines and change the k to k + 1 to take neccessary current line
      else {
        k++;
        step = i + i + 1;
      }
      //   We are running unknown but appropriate lines and write them into the output file if the line is existing in the file
      for (k = i; k < step; k++) {
        if (fileLines[k])
          fs.appendFileSync(outputFile, `${fileLines[k]}\n`, "utf-8");
      }
    }
  }
}
