import RankApp from "../../models/Rank";
import { httpHandler } from "../../types";
import PaginationHelper from "../../helpers/pagination";

class RankController {
  private static ranking = new RankApp();
  static getBest: httpHandler = async (req, res) => {
    try {
      const [page, pageSize] = PaginationHelper.getPagination(req.query);
      if (req.method !== "GET") return res.status(400).send("bad request");
      const result = await this.ranking.getRanking(page, pageSize);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error)
      res.send(500);
    }
  };

  static trigger: httpHandler = async (req, res) => {
    try {
      if (req.method !== "POST") return res.status(400).send("bad request");
      await this.ranking.updateRankings(10000)
      await this.ranking.rankUnRankedJobAdverts(500)
      return res.send(200).json({message:"doing it "})
    } catch (error) {
      return res.send(500);
    }
  };

}

export default RankController;
