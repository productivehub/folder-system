module.exports = {
    // setupTestFrameworkScriptFile: './jest.setup.js',
    // setupFilesAfterEnv: ['./jest.setup.js'],
    testEnvironment: 'node',

    "roots": [
        "<rootDir>/test",
        "<rootDir>/src",
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
}
