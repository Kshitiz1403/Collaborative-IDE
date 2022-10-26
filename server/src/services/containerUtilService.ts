import { Service } from 'typedi';

@Service()
export default class ContainerUtilService {
  public getLanguageCompile = language => {
    switch (language) {
      case 'c++':
        return 'g++ main.cpp -o main && ./main && rm main';
      case 'java':
        return 'javac Main.java && java Main && rm Main.class';
      case 'python':
        return 'python main.py';
      case 'nodejs':
        return 'node index.js';
      default:
        return null;
    }
  };
}
