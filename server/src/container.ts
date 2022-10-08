import { Container } from "../node_modules/inversify";
import LoggerInstance from "./loaders/logger"

import { UserRepository } from "./repositories/userRepository";
import { ProjectRepository } from "./repositories/projectRepository";

import AuthService from "./services/authService";
import ProjectService from "./services/projectService";
import MailerService from "./services/mailService";

var DIContainer = new Container();


DIContainer.bind<UserRepository>(UserRepository).toSelf();
DIContainer.bind<ProjectRepository>(ProjectRepository).toSelf();

DIContainer.bind<AuthService>(AuthService).toSelf().inSingletonScope();
DIContainer.bind<ProjectService>(ProjectService).toSelf().inSingletonScope();
DIContainer.bind<MailerService>(MailerService).toSelf().inSingletonScope();

LoggerInstance.info("✌️Injections accomplished.")

export default DIContainer;
