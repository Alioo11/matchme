import RankApp from "../../models/Rank";
import { httpHandler } from "../../types";
import PaginationHelper from "../../helpers/pagination";

class RankController {
  private static ranking = new RankApp();
  static getBest: httpHandler = async (req, res) => {
    try {
      const [page, pageSize] = PaginationHelper.getPagination(req.query);
      if (req.method !== "GET") return res.status(400).send("bad request");
      const rankingTotalCount = await this.ranking.objects.countDocuments();
      const rankingResult = await this.ranking.getRanking(page, pageSize);

      const response = {
        data: rankingResult,
        page: page,
        page_size: pageSize,
        total: rankingTotalCount
      }
      return res.status(200).json(response);
    } catch (error) {
      console.log(error)
      res.send(500);
    }
  };

  static trigger: httpHandler = async (req, res) => {
    try {
      await this.ranking.updateRankings(3000)
      await this.ranking.rankUnRankedJobAdverts(1000)
      return res.send(200).json({message:"doing it "})
    } catch (error) {
      console.log(error)
      return res.status(500).json(error);
    }
  };

}

export default RankController;
