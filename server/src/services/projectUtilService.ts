import { IProject } from '@/interfaces/IProject';
import { Service } from 'typedi';

@Service()
export default class ProjectUtilService {
  public fileLanguageMapping = (language: IProject['language']) => {
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

  public getBoilerplate = (language: IProject['language']) => {
    switch (language) {
      case 'java':
        return 'import java.util.*;\r\n\r\npublic class Main{\r\n    public static void main(String[]args){\r\n    }\r\n}';
      case 'c++':
        return '#include <iostream>\r\nusing namespace std;\r\n  \r\n// Driver Code\r\nint main(){\r\n    return 0;\r\n}';
      case 'python':
        return '';
      case 'nodejs':
        return '';
    }
  };
}
