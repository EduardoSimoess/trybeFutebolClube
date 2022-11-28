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
}
