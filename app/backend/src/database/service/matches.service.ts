// import IMatch from '../Interfaces/IMatch';
import Match from '../models/Match';
import Team from '../models/Team';

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
}
