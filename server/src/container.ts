import { Container } from "../node_modules/inversify";

import { UserRepository } from "./repositories/userRepository";

import AuthService from "./services/auth";
import LoggerInstance from "./loaders/logger"

var DIContainer = new Container();


DIContainer.bind<UserRepository>(UserRepository).toSelf();

DIContainer.bind<AuthService>(AuthService).toSelf().inSingletonScope();

LoggerInstance.info("✌️Injections accomplished.")

export default DIContainer;
