import RankApp from ".";

class RankTask {
  static updateRanking = async (limit: number) => {
    const rank = new RankApp();
    rank.updateRankings(limit);
  };

  static createRanking = async (limit: number) => {
    const rank = new RankApp();
    rank.rankUnRankedJobAdverts(limit);
  };
}

export default RankTask;
