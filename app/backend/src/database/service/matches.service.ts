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
}
