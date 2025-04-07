// generateFileList.js
const fs = require('fs');
const path = require('path');

const recodesDir = path.join(__dirname, 'public', 'recodes');
const outputPath = path.join(recodesDir, 'fileList.json');

fs.readdir(recodesDir, (err, files) => {
  if (err) {
    console.error('Error reading recodes directory:', err);
    return;
  }
  // fileList.json 파일 자체는 제외하고, .json 파일만 필터링
  const jsonFiles = files.filter(
    file => file.endsWith('.json') && file !== 'fileList.json'
  );

  let fileList = [];
  let pending = jsonFiles.length;
  
  // json 파일이 하나도 없으면 바로 출력
  if (pending === 0) {
    fs.writeFile(outputPath, JSON.stringify(fileList, null, 2), err => {
      if (err) console.error('Error writing fileList.json:', err);
      else console.log('File list generated successfully.');
    });
    return;
  }
  
  jsonFiles.forEach(file => {
    const filePath = path.join(recodesDir, file);
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        console.error(`Error reading file ${file}:`, err);
      } else {
        try {
          const jsonData = JSON.parse(content);
          // 앞서 언급한 필드 추출: uuid, created, description
          const { uuid, created, description } = jsonData;
          // 필요에 따라 filename 도 포함할 수 있습니다.
          fileList.push({ filename: file, uuid, created, description });
        } catch (e) {
          console.error(`Error parsing JSON in file ${file}:`, e);
        }
      }
      pending--;
      if (pending === 0) {
        fs.writeFile(outputPath, JSON.stringify(fileList, null, 2), err => {
          if (err) console.error('Error writing fileList.json:', err);
          else console.log('File list generated successfully.');
        });
      }
    });
  });
});
