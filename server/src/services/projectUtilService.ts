import { Service } from 'typedi';

@Service()
export default class ProjectUtilService {
  public fileLanguageMapping = language => {
    switch (language) {
      case 'java':
        return 'Main.java';
      case 'c++':
        return 'main.cpp';
      case 'python':
        return 'main.py';
      case 'nodejs':
        return 'index.js';
      default:
        return null;
    }
  };
}
