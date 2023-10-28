import { IProject } from '@/interfaces/IProject';
import { Service } from 'typedi';

@Service()
export default class ContainerUtilService {
  public getDefaultFile = (language:IProject["language"]) =>{
    switch (language){
      case 'c++':
        return "main.cpp"
      case 'java':
        return "Main.java"
      case "python":
        return "main.py"
      case "nodejs":
        return "index.js"
      default:
        return null
    }
  }
  public getLanguageCompile = (language:IProject["language"]) => {
    const defaultFile = this.getDefaultFile(language)
    switch (language) {
      case 'c++':
        return `g++ ${defaultFile} -o main && ./main && rm main`;
      case 'java':
        return `javac ${defaultFile} && java Main && rm Main.class`;
      case 'python':
        return `python ${defaultFile}`;
      case 'nodejs':
        return `node ${defaultFile}`;
      default:
        return null;
    }
  };
}
