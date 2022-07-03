export const languageDefaultFile = (language) => {
    switch (language) {
        case 'python':
            return "main.py"
        case 'java':
            return "Main.java"
        case 'c++':
            return "main.cpp"
        case 'javascript':
            return "main.js"
    }
}