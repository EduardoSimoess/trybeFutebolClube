import Match from '../models/Match';
import Team from '../models/Team';
import UserService from './user.service';

const userService = new UserService();
export default class MatchService {
  getMatches = async () => {
    const matches = await Match.findAll(
      {
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ] },
    );
    return matches;
  };

  getMatchesByProgrees = async (inProgress: string) => {
    let inProgressBoll = true;
    if (inProgress === 'false') {
      inProgressBoll = false;
    }
    const matches = await Match.findAll({ where: { inProgress: inProgressBoll },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };

  createMatchInPogress = async (
    newObj: object,
    authorization: string,
  ) => {
    const role = await userService.getUser(authorization);
    if (role) {
      const obj = { ...newObj, inProgress: true };
      const newMatch = await Match.create(obj);
      return newMatch;
    }
  };

  updateTofinished = async (strinId: string) => {
    const id = Number(strinId);
    await Match.update({ inProgress: false }, { where: { id } });
    return 'Finished';
  };

  updateScore = async (stringId: string, homeTeamGoals: number, awayTeamGoals: number) => {
    const id = Number(stringId);
    const newScore = await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    if (newScore) {
      return 200;
    }
  };
}
