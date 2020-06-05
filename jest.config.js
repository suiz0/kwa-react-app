module.exports = {
    "roots": [
        "<rootDir>/src/"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "json",
        "js",
        "jsx",
        "node"
    ],
    "snapshotSerializers": ["enzyme-to-json/serializer"]
}