import Team from '../models/Team';
import MatchService from './matches.service';
import ITeam from '../Interfaces/ITeam';
import IMatch from '../Interfaces/IMatch';
import IObj from '../Interfaces/IObj';

const matchesService = new MatchService();
export default class LeaderboardService {
  calcuate = (obj: IObj, team: ITeam, homeMatches: IMatch[]) => ({ ...obj,
    efficiency: (obj.totalPoints / (homeMatches.length * 3)) * 100,
    goalsBalance: obj.goalsFavor - obj.goalsOwn,
    name: team.teamName });

  homeClassification = async () => {
    const teams = await Team.findAll();
    const finishedMatches = await matchesService.getMatchesByProgrees('false');

    // console.log(finishedMatches[1].homeTeam);
    const classificationUnordered = teams.map((team) => {
      const homeMatches = finishedMatches.filter((match) => match.homeTeam === (team.id));
      const obj = { totalPoints: 0, totalVictories: 0, totalLosses: 0, goalsFavor: 0, goalsOwn: 0 };
      for (let i = 0; i < homeMatches.length; i += 1) {
        obj.goalsFavor += homeMatches[i].homeTeamGoals;
        obj.goalsOwn += homeMatches[i].awayTeamGoals;
        if (homeMatches[i].homeTeamGoals > homeMatches[i].awayTeamGoals) {
          obj.totalPoints += 3;
          obj.totalVictories += 1;
        } else if (homeMatches[i]
          .homeTeamGoals === homeMatches[i].awayTeamGoals) obj.totalPoints += 1;
        else obj.totalLosses += 1;
      }
      return this.calcuate(obj, team, homeMatches);
    });
    return classificationUnordered;
    // return finishedMatches;
  };
}
