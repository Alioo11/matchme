import Pagination from "../../helpers/pagination";
import { httpHandler } from "../../types";
import UserApp from "../../models/User";

class UserController {
  private static user = new UserApp();
  static getUnCheckedUsers: httpHandler = async (req, res) => {
    const pagination = new Pagination(req.query);
    const [page, pageSize] = pagination.state;
    const totalUsers = await this.user.objects
      .find({ viewed: false })
      .countDocuments();
    const users = await this.user.objects
      .find({ viewed: false })
      .skip(page * pageSize)
      .limit(pageSize)
      .populate("company");
    const response = pagination.wrapIn(users, totalUsers);
    res.status(200).json(response);
    try {
    } catch (error) {
      console.log(error);
      res.send(500);
    }
  };

  static markAsViewed: httpHandler = async (req, res) => {
    try {
      const userId = req.params.id as string;
      const seekedUser = await this.user.objects
        .findById(userId)
        .populate("company");
      await seekedUser?.update({$set:{viewed:true}});
      if (seekedUser === null) return res.status(404);
      return res.status(200).json(seekedUser);
    } catch (error) {
      console.log(error);
      res.send(500);
    }
  };
}

export default UserController;
