import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';
// import Match from './Match';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(30),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

// Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'homeTeam' });
// Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'awayTeam' });

// Team.hasMany(Match);

export default Team;
