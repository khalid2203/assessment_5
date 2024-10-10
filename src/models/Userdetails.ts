import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Userdetails extends Model {
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public gender!: string;
    public contact!: string;
    public role!: number;
    public resume!:string | null;
    public profileImg!:string | null;
    public agencyId!: number | null;
}

Userdetails.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        resume: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profileImg: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        agencyId: {
            type: DataTypes.INTEGER,
            allowNull: true, // Nullable for job seekers
        },
        
    },
    {
        sequelize,
        modelName: 'Userdetails',
    }
);

Userdetails.hasMany(Userdetails, { foreignKey: 'agencyId', as: 'JobSeekers' }); // Agency has many Job Seekers
Userdetails.belongsTo(Userdetails, { foreignKey: 'agencyId', as: 'Agency' }); // Job Seeker belongs to Agency
export default Userdetails;