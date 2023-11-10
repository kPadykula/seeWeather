import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Response,
} from '@nestjs/common';
import { Model, Schema } from 'mongoose';
import { DatabaseConstants } from 'src/core/constants';
import { Localization } from 'src/core/database/localization/localization.schema';
import {
  Credentials,
  LocalizationAssign,
  User,
} from 'src/core/database/user/user.schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(DatabaseConstants.USER_MODEL) private userModel: Model<User>,
    @Inject(DatabaseConstants.LOCALIZATION_MODEL)
    private localizationModel: Model<Localization>,
  ) {}

  async create(createUserDTO: User): Promise<User> {
    const createdUser = new this.userModel(createUserDTO);
    return this.userModel.findOne({ email: createdUser.email }).then((user) => {
      if (user)
        throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
      else return createdUser.save();
    });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async login(credentials: Credentials): Promise<User | null> {
    return this.userModel.findOne({
      email: credentials.email,
      password: credentials.password,
    });
  }

  async getUserLocalizations(id: Schema.Types.ObjectId) {
    return this.userModel.findById(id).then((user) => {
      if (user) {
        //@ts-ignore
        const userLocalizations = user.localizations;
        return this.localizationModel
          .find()
          .then((localizations) =>
            localizations.filter((localization) =>
              userLocalizations.includes(localization._id),
            ),
          );
      } else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    });
  }

  async removeUserLocalization(body: {
    userId: string;
    localizationId: string;
  }) {
    return this.userModel
      .findById(body.userId)
      .then((user) => {
        if (user) {
          const userLocalizations = user.localizations
            .map((localization) => localization.toString())
            .filter((localization) => localization !== body.localizationId);
          return user
            .updateOne({
              localizations: userLocalizations,
            })
            .catch(() => {
              throw new HttpException(
                'Cannot remove localization',
                HttpStatus.METHOD_NOT_ALLOWED,
              );
            });
        } else
          throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      })
      .catch(() => {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      });
  }

  async assignLocalizationToAccount(body: LocalizationAssign): Promise<User> {
    return this.userModel
      .findById(body.user)
      .then((user) => {
        if (user) {
          return this.localizationModel
            .findById(body.localization)
            .then((localization) => {
              if (localization) {
                const actualLocalizations = user.localizations;
                if (actualLocalizations.includes(localization._id)) {
                  throw new HttpException(
                    'This localization already is assigned into user account',
                    HttpStatus.CONFLICT,
                  );
                } else {
                  actualLocalizations.push(localization._id);
                  return user.updateOne({ localizations: actualLocalizations });
                }
              } else {
                throw new HttpException(
                  "Localization with this id don't exists",
                  HttpStatus.BAD_REQUEST,
                );
              }
            })
            .catch(() => {
              throw new HttpException(
                "Localization with this id don't exists",
                HttpStatus.BAD_REQUEST,
              );
            });
        } else
          throw new HttpException(
            "User with this id don't exists",
            HttpStatus.BAD_REQUEST,
          );
      })
      .catch(() => {
        throw new HttpException(
          "User with this id don't exists",
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
