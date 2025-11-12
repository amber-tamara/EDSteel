// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        // Explicitly set JSX handling to match Next.js
        tsconfig: {
          jsx: "react-jsx", // Use Next.js's modern JSX transform
        },
      },
    ],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["./jest.setup.js"], // Add setup file
};
