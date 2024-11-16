import { Logger } from "@sunami/logger";
import { namespace } from "../middlewares/context.middleware";

const logger = new Logger(namespace);

export default logger;
