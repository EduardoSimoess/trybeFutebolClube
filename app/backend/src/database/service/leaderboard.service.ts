import Team from '../models/Team';
import MatchService from './matches.service';
import ITeam from '../Interfaces/ITeam';
import IMatch from '../Interfaces/IMatch';
import IObj from '../Interfaces/IObj';
import ILeaderboards from '../Interfaces/ILeaderboards';

const matchesService = new MatchService();
export default class LeaderboardService {
  calcuate = (obj: IObj, team: ITeam, homeMatches: IMatch[]) => ({ ...obj,
    totalGames: obj.totalDraws + obj.totalLosses + obj.totalVictories,
    efficiency: Number(((obj.totalPoints / (homeMatches.length * 3)) * 100).toFixed(2)),
    goalsBalance: obj.goalsFavor - obj.goalsOwn,
    name: team.teamName });

  objBilder = (team: ITeam, homeMatches: IMatch[]) => {
    const obj = { points: 0, victories: 0, draws: 0, losses: 0, goalsFavor: 0, goalsOwn: 0 };
    for (let i = 0; i < homeMatches.length; i += 1) {
      obj.goalsFavor += homeMatches[i].homeTeamGoals;
      obj.goalsOwn += homeMatches[i].awayTeamGoals;
      if (homeMatches[i].homeTeamGoals > homeMatches[i].awayTeamGoals) {
        obj.points += 3;
        obj.victories += 1;
      } else if (homeMatches[i]
        .homeTeamGoals === homeMatches[i].awayTeamGoals) {
        obj.points += 1;
        obj.draws += 1;
      } else obj.losses += 1;
    }
    return obj;
  };

  orderByFavor = (a: ILeaderboards, b: ILeaderboards) => {
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor === b.goalsFavor) {
      if (a.goalsOwn > b.goalsOwn) return 1;
      if (a.goalsOwn < b.goalsOwn) return -1;
    }
    return 0;
  };

  orderByBalace = (a: ILeaderboards, b: ILeaderboards) => {
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance === b.goalsBalance) {
      return this.orderByFavor(a, b);
    }
    return 0;
  };

  orderArray = (a: ILeaderboards, b: ILeaderboards) => {
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints === b.totalPoints) {
      return this.orderByBalace(a, b);
    }
    return 0;
  };

  homeClassification = async () => {
    const teams = await Team.findAll();
    const finishedMatches = await matchesService.getMatchesByProgrees('false');
    const classificationUnordered = teams.map((team) => {
      const homeMatches = finishedMatches.filter((match) => match.homeTeam === (team.id));
      const obj = this.objBilder(team, homeMatches);
      const fixed = { totalPoints: obj.points,
        totalVictories: obj.victories,
        totalDraws: obj.draws,
        totalLosses: obj.losses,
        goalsFavor: obj.goalsFavor,
        goalsOwn: obj.goalsOwn };
      const array = this.calcuate(fixed, team, homeMatches);
      return array;
    });

    const ordered = classificationUnordered.sort(this.orderArray);
    // console.log(classificationUnordered.sort(this.orderArray));

    return ordered;
  };
}
