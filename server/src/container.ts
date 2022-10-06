import { Container } from "../node_modules/inversify";
import LoggerInstance from "./loaders/logger";

var DIContainer = new Container();

LoggerInstance.info("✌️Injections accomplished.")

export default DIContainer;