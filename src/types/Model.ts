import { Model } from "mongoose";

abstract class AppModel<T> {
  abstract objects: Model<T>;
}

export default AppModel;
