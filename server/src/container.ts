import { Container } from "../node_modules/inversify";

import { UserRepository } from "./repositories/userRepository";

import AuthService from "./services/authService";
import LoggerInstance from "./loaders/logger"
import { ProjectRepository } from "./repositories/projectRepository";
import ProjectService from "./services/projectService";

var DIContainer = new Container();


DIContainer.bind<UserRepository>(UserRepository).toSelf();
DIContainer.bind<ProjectRepository>(ProjectRepository).toSelf();

DIContainer.bind<AuthService>(AuthService).toSelf().inSingletonScope();
DIContainer.bind<ProjectService>(ProjectService).toSelf().inSingletonScope();

LoggerInstance.info("✌️Injections accomplished.")

export default DIContainer;
