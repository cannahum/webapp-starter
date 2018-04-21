module.exports = {
  "roots": [
    "<rootDir>"
  ],
  "transform": {
    "^.+\\.jsx?$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.tsx?$": "ts-jest"
  },
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|scss|sass)$": "<rootDir>/__mocks__/styleMock.js"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
};
